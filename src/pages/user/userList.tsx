import { FirebaseUserForm } from "@/components/form/userForm";
import { StandardTable } from "@/components/table/StandardTable";
import { CollapseSection } from "@/components/ui/CollapseSection";
import ModalBase from "@/components/ui/ModalBase";
import { TableActions } from "@/components/ui/tableAction";
import { useDeleteUser, useDisableUsers, useGetUsers, useSendResetLink, useValidateEmail } from "@/hooks/api";
import { FirebaseUserResponse } from "@/types/type";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Tag, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { UnlockOutlined , FileProtectOutlined } from '@ant-design/icons';
import { converterParaFormatoBR } from "@/utils/dataSistem";
import { Switch, Typography } from 'antd';

const { Paragraph, Text } = Typography;
const UserList = () => {
  const { data, isLoading } = useGetUsers();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [formData, setFormData] = useState<Partial<FirebaseUserResponse>>({});
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<FirebaseUserResponse | null>(null );
  const [pageSize, setPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<FirebaseUserResponse[]>([]);
  const queryClient = useQueryClient();

useEffect(()=>{
queryClient.invalidateQueries();
},[isModalOpen])

  const { mutate: disableUser } = useDisableUsers({
    onSuccess: (data: any) => {
      const successMessage = data.message;
      message.success(successMessage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      queryClient.invalidateQueries("users");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Falha ao criar site";
      message.error(errorMessage);
    },
  });
   const { mutate: ResetLink } = useSendResetLink({
    onSuccess: (data: any) => {
      const successMessage = data.message;
      message.success(successMessage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      queryClient.invalidateQueries("users");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Falha";
      message.error(errorMessage);
    },
  });
   const { mutate: ValidateEmail } = useValidateEmail({
    onSuccess: (data: any) => {
      const successMessage = data.message;
      message.success(successMessage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      queryClient.invalidateQueries("users");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Falha";
      message.error(errorMessage);
    },
  });
  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: (data: any) => {
      const successMessage = data.message;
      message.success(successMessage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      queryClient.invalidateQueries("users");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Falha ao criar site";
      message.error(errorMessage);
    },
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEdit = (user: FirebaseUserResponse) => {
    setSelectedUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleDelete = (uid: string) => {
    deleteUser({ uid });
  };

  const users: FirebaseUserResponse[] = useMemo(() => {
    const list = Array.isArray(data?.result?.users) ? data.result.users : [];
    //@ts-ignore
    return list.filter((u) =>u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);
  const columns: ColumnsType<FirebaseUserResponse> = [
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      align: "justify",
      width: 180,
      sorter: (a, b) => a.email.localeCompare(b.email),
        render: (_: any, grupo: FirebaseUserResponse) => (
        <div>
             <Paragraph ellipsis={true}>  
                <span>{[grupo.email]}</span>
               </Paragraph>
        </div>
      ),
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "tokensValidAfterTime",
      dataIndex: "tokensValidAfterTime",
      key: "tokensValidAfterTime",
      align: "center",
      width: 180,
      sortDirections: ["ascend", "descend"],
      render: (_: any, grupo: FirebaseUserResponse) => (
        <div>
          <span>{converterParaFormatoBR([grupo.tokensValidAfterTime])}</span>
        </div>
      ),
    },
      {
      title: "creationTime",
      dataIndex: "tokensValidAfterTime",
      key: "creationTime",
      align: "center",
      width: 180,
      sortDirections: ["ascend", "descend"],
      render: (_: any, grupo: FirebaseUserResponse) => (
        <div>
          <span>{converterParaFormatoBR([grupo.metadata.creationTime])}</span>
        </div>
      ),
    },
      {
      title: "lastRefreshTime",
      dataIndex: "tokensValidAfterTime",
      key: "lastRefreshTime",
      align: "center",
      width: 180,
      sortDirections: ["ascend", "descend"],
      render: (_: any, grupo: FirebaseUserResponse) => (
        <div>
          <span>{converterParaFormatoBR([grupo.metadata.lastRefreshTime])}</span>
        </div>
      ),
    },
      {
      title: "lastSignInTime",
      dataIndex: "tokensValidAfterTime",
      key: "lastSignInTime",
      align: "center",
      width: 180,
      sortDirections: ["ascend", "descend"],
      render: (_: any, grupo: FirebaseUserResponse) => (
        <div>
          <span>{converterParaFormatoBR([grupo.metadata.lastSignInTime])}</span>
        </div>
      ),
    },

    {
      title: "Role",
      key: "Role",
      width: 180,
      // dataIndex: ["customClaims", "role"],
      render: (_: any, grupo: FirebaseUserResponse) => (
        <div>
          <span>{grupo.customClaims?.role.join(" /") || "Sem role"}</span>
        </div>
      ),
    },
    {
      title: "emailVerified",
      dataIndex: "emailVerified",
      key: "emailVerified",
      align: "center",
      width: 180,
      sortDirections: ["ascend", "descend"],
      render: (_: any, grupo: FirebaseUserResponse) => (
        <Tag color={grupo.emailVerified ? "green" : "red"}>
          {grupo.emailVerified ? "Sim" : "Não"}
        </Tag>
      ),
    },
    {
      title: "disabled",
      dataIndex: "disabled",
      key: "disabled",
      align: "center",
      width: 180,
      sortDirections: ["ascend", "descend"],
      render: (_: any, grupo: FirebaseUserResponse) => (
        <Tag color={grupo.disabled ? "green" : "red"}>
          {grupo.disabled ? "Sim" : "Não"}
        </Tag>
      ),
    },
    {
      title: "Ações",
      key: "acoes",
      align: "center",
      fixed: "right",
      width: 180,
      render: (_: any, user: FirebaseUserResponse) => (
         <TableActions
                  onSwitch={() => disableUser({uid: user.uid, disabled: user.disabled})}
                  onDelete={ () => handleDelete(user.uid)}
                  onEdit={() => handleEdit(user)}
                  customButtons={<>
                    <Button type="text" variant="solid" icon={<Tooltip title="Reenviar senha"><UnlockOutlined   style={{color: '#005bac'}}/></Tooltip>} onClick={()=>ResetLink({email:user.email})}></Button>
                    <Button type="text" variant="solid" icon={<Tooltip title="Reenviar confirmação de email"><FileProtectOutlined    style={{color: '#005bac'}}/></Tooltip>} onClick={()=>ValidateEmail({email:user.email})}></Button>
                  </>}
                  onSwitchDisbled={user.disabled}
                  onJoinStatus={false}
                />
      ),
    },
  ];
  const renderDetalhesFalha = (grupo: FirebaseUserResponse) => (
    <Table
      columns={[
        { title: "Cód email", dataIndex: "email", key: "email" },
        { title: "Cód photoURL", dataIndex: "photoURL", key: "photoURL" },
        { title: "Cód providerId", dataIndex: "providerId", key: "providerId" },
      ]}
      dataSource={grupo.providerData}
      // scroll={{ x: 1500, y: 300 }}
      pagination={false}
      rowKey="email"
      size="small"
    />
  );

  return (
    <div>
      <CollapseSection
        defaultActiveKeys={["1", "2"]}
        sections={[
          {
            key: "2",
            title: "Administração de usuários",
            extra: (
              <>
                <Input
                  placeholder="Buscar usuário por email"
                  // prefix={<SearchOutlined />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  allowClear
                  style={{
                    borderRadius: 8,
                    padding: "6px 12px",
                  }}
                />
              </>
            ),
            showArrow: true,
            content: (
              <>
                <StandardTable
                  bordered
                  expandable={{ expandedRowRender: renderDetalhesFalha }}
                  style={{ paddingTop: 4, paddingBottom: 4 }}
                  columns={columns}
                  dataSource={users}
                  loading={isLoading}
                  scroll={{ x: 1500, y: 300 }}
                   size="small"
                  pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    showTotal: (total) => `Total de registros: ${total}`,
                    onShowSizeChange: (_, size) => setPageSize(size),
                  }}
                />
              </>
            ),
          },
        ]}
      />

      <ModalBase
        // title="Editar Usuário"
        open={isModalOpen}
        onCancel={handleCloseModal}
        // onOk={() => updateUser(formData)}
        // okText="Salvar"
        // confirmLoading={isSaving}
        // width={isMobile ? "90%" : 600}
        // centered
      >
        {selectedUser && (
           <FirebaseUserForm
          initialValues={selectedUser}
          onSubmit={(e)=>console.log(e)}
          loading={loading}
        />
        )}
      </ModalBase>
    </div>
  );
};

export default UserList;
