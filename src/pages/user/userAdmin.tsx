import { useGetUsers, useDisableUsers , useDeleteUser} from "@/hooks/api";
import { FirebaseUserResponse } from "@/types/type";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  List,
  MenuProps,
  message,
  Modal,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  StopOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TableActions } from "@/components/ui/tableAction";
import { BaseLayout } from "@/components/layout/BaseLayout";
 import { useQueryClient } from '@tanstack/react-query';
const { Text } = Typography;
const { confirm } = Modal;

const UserAdmin = () => {
  const { data, isLoading } = useGetUsers();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [formData, setFormData] = useState<Partial<FirebaseUserResponse>>({});
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<FirebaseUserResponse | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<FirebaseUserResponse[]>([]);
  const queryClient = useQueryClient();
   
  const { mutate: disableUser} = useDisableUsers({ 
    onSuccess: (data: any) => {
      const successMessage = data.message;
      message.success(successMessage);
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.invalidateQueries('users');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Falha ao criar site';
      message.error(errorMessage);
    }
  });

  const { mutate: deleteUser} = useDeleteUser({ 
    onSuccess: (data: any) => {
      const successMessage = data.message;
      message.success(successMessage);
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.invalidateQueries('users');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Falha ao criar site';
      message.error(errorMessage);
    }
  });

  const users: FirebaseUserResponse[] = useMemo(() => {
    const list = Array.isArray(data?.result?.users) ? data.result.users : [];

    //@ts-ignore
    return list.filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEdit = (user: FirebaseUserResponse) => {
    setSelectedUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };


  const handleDelete=(uid: string)=>{
    deleteUser({uid})
  }

  const renderActions = (user: FirebaseUserResponse) => {
    const items: MenuProps["items"] = [
      {
        key: "edit",
        label: "Editar",
        icon: <EditOutlined />,
        onClick: () => handleEdit(user), // no botão editar,
      },
      {
        key: "delete",
        label: "Excluir",
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => console.log(user.uid,user.email),
      },
      {
        key: "disable",
        label: (
          <label>
            <input type="checkbox" style={{ marginRight: 6 }} /> Desabilitar
          </label>
        ),
        icon: <StopOutlined />,
      },
    ];

    if (isMobile) {
      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button icon={<MoreOutlined />} size="middle" />
        </Dropdown>
      );
    }
    

    return (
      <Space wrap>
        <TableActions
         onCheck={() => disableUser({uid: user.uid, disabled: user.disabled})}
          onSwitch={() => disableUser({uid: user.uid, disabled: user.disabled})}
          onDelete={ () => handleDelete(user.uid)}
          onEdit={() => handleEdit(user)}
         
          checkedCheck={user.disabled}
          onSwitchDisbled={user.disabled}
          onJoinStatus={false}
        />
      </Space>
    );
  };
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space style={{ margin: 4 }}>
      {/* {React.createElement(icon)} */}
       /
      {text}
    </Space>
  );

  return ( 
      <BaseLayout 
      childrenHeader={
          <Input
          placeholder="Buscar usuário por email"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{
            borderRadius: 8,
            padding: "6px 12px",
          }}
        />
      } 
      childrenContent={
     <>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={users}
            pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total) => `Total: ${total}`,
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
          renderItem={(item) => (
            <List.Item actions={[1]} extra={[[ renderActions(item)]]}>
              <Skeleton avatar title={true} loading={isLoading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.photoURL} />}
                  title={
                    <>
                      <Row>
                        <Col>
                          <Typography.Title
                            level={5}
                            style={{ color: "#2a9d8f", margin: 0 }}
                          >
                            {item.email}
                          </Typography.Title>
                          <Row>
                            <Typography.Text type="secondary">
                              UID: {item.uid}
                            </Typography.Text>
                          </Row>
                        </Col>
                      </Row>
                    </>
                  }
                  description={
                    <>
                      {""}
                      {item.customClaims?.role.map((e, index) => (
                        <IconText icon={LikeOutlined} text={e} key={index} />
                      ))}
                    </>
                  }
                />

              </Skeleton>
            </List.Item>
          )}
        />
   

      <Modal
        title="Editar Usuário"
        open={isModalOpen}
        onCancel={handleCloseModal}
        // onOk={() => updateUser(formData)}
        okText="Salvar"
        // confirmLoading={isSaving}
        width={isMobile ? "90%" : 600}
        centered
      >
        {selectedUser && (
          <Form layout="vertical">
            <Form.Item label="Email">
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Form.Item>

            {/* <Form.Item label="Display Name">
        <Input
          value={formData.displayName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, displayName: e.target.value }))
          }
        />
      </Form.Item> */}

            <Form.Item label="Foto (URL)">
              <Input
                value={formData.photoURL}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, photoURL: e.target.value }))
                }
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
  </>}      
      
      />
  );
};

export default UserAdmin;
