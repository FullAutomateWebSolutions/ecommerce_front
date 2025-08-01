import { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Select,
  Space,
  Switch,
} from "antd";
import {
  MailOutlined,
  UserOutlined,
  SafetyOutlined,
  PictureOutlined,
  CheckCircleOutlined,
  StopOutlined,
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { StandardDescriptionsForm } from "../ui/StandardDescriptions";
import { FirebaseUserResponse } from "@/types/type";
import { useSetRoles, useUpdatePhoto } from "@/hooks/api";

interface FirebaseUserFormProps {
  initialValues?: FirebaseUserResponse | null;
  onSubmit: (values: FirebaseUserResponse) => void;
  title?: string;
  loading?: boolean;
}

export const FirebaseUserForm = ({
  initialValues,
  onSubmit,
  title = "Editar Usuário Firebase",
  loading,
}: FirebaseUserFormProps) => {
  const [form] = Form.useForm<FirebaseUserResponse>();

  const { mutate: SetRoles } = useSetRoles({
    onSuccess: (data: any) => {
      const successMessage = data.message;
      message.success(successMessage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      queryClient.invalidateQueries("users");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Falha";
      console.error(errorMessage);
    },
  });
  const { mutate: UpdatePhoto } = useUpdatePhoto({
    onSuccess: (data: any) => {
      const successMessage = data.message;
      message.success(successMessage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      queryClient.invalidateQueries("users");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message;
      console.error(errorMessage);
    },
  });

  const handleFinish = (values: FirebaseUserResponse) => {
    if (initialValues?.photoURL !== values.photoURL) {
      UpdatePhoto({ uid: values.uid, photoURL: values.photoURL });
    }

    if (initialValues?.customClaims.role !== values.customClaims.role) {
      SetRoles({ uid: values.uid, roles: values.customClaims?.role || [] });
    }
    onSubmit({
      ...initialValues,
      ...values,
      customClaims: {
        role: values.customClaims?.role || [],
      },
    });
  };

  return (
    <Form
      form={form}
      layout="inline"
      //@ts-ignore
      initialValues={initialValues}
      onFinish={handleFinish}
      variant="underlined"
    >
      <Divider orientation="left">{title}</Divider>

      <StandardDescriptionsForm
        data={[
          {
            label: (
              <>
                <UserOutlined style={{ marginRight: 8 }} />
                UID
              </>
            ),
            children: (
              <Form.Item name="uid" rules={[{ required: true }]}>
                <Input disabled />
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <MailOutlined style={{ marginRight: 8 }} />
                Email
              </>
            ),
            children: (
              <Form.Item
                name="email"
                rules={[{ type: "email", required: true }]}
              >
                <Input disabled />
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <PictureOutlined style={{ marginRight: 8 }} />
                Foto (URL)
              </>
            ),
            children: (
              <Form.Item name="photoURL">
                <Input allowClear />
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <CheckCircleOutlined style={{ marginRight: 8 }} />
                Email Verificado
              </>
            ),
            children: (
              <Form.Item name="emailVerified" valuePropName="checked">
                <Switch
                  disabled
                  checkedChildren="Sim"
                  unCheckedChildren="Não"
                />
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <StopOutlined style={{ marginRight: 8 }} />
                Conta Desativada
              </>
            ),
            children: (
              <Form.Item name="disabled" valuePropName="checked">
                <Switch
                  disabled
                  checkedChildren="Desativada"
                  unCheckedChildren="Ativa"
                />
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <SafetyOutlined style={{ marginRight: 8 }} />
                Papéis (roles)
              </>
            ),
            children: (
              <Form.Item name={["customClaims", "role"]}>
                <Select
                  mode="tags"
                  placeholder="Digite ou selecione as roles"
                  style={{ width: 300 }}
                />
              </Form.Item>
            ),
          },
        ]}
        column={1}
      />

      <Form.Item style={{ width: "100%" }}>
        <Space
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
          >
            Salvar
          </Button>
          {/* <Button
            icon={<ReloadOutlined />}
            onClick={() => form.resetFields()}
            disabled={!initialValues}
          >
            Resetar
          </Button> */}
        </Space>
      </Form.Item>
    </Form>
  );
};
