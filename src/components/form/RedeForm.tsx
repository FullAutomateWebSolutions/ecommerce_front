import { Button, Divider, Form, Input, Space } from "antd";
import {
  StandardDescriptions,
  StandardDescriptionsForm,
} from "../ui/StandardDescriptions";
import { PageActions } from "../layout/PageActions";
import {
  BarcodeOutlined,
  CloseOutlined,
  SaveOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { IRede } from "@/types/Rede";

// const { Option } = Select;

export interface IRedeFormValues {
  idRede: string;
  descricao: string;
  listBandeira: IListBandeiraFormValues[];
}

export interface IListBandeiraFormValues {
  idBandeira: string;
  descricaoBandeira: string;
  date_create?: string;
  date_update?: string;
}

interface RedeFormProps {
  initialValues?: IRede | null;
  onSubmit: (values: IRede) => void;
  title: string;
  loading?: boolean;
}

export const RedeForm = ({
  title,
  initialValues,
  onSubmit,
  loading,
}: RedeFormProps) => {
  const [form] = Form.useForm<IRede>();
  const handleFinish = (values: IRede) => {
    onSubmit({
      ...values,
      date_create: initialValues?.date_update,
      date_update: initialValues?.date_update,
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
      <Divider orientation="left">Cadastro de rede</Divider>

      <StandardDescriptionsForm
        data={[
          {
            label: (
              <>
                <BarcodeOutlined style={{ marginRight: 8 }} />
                Código de rede
              </>
            ),
            children: (
              <Form.Item
                name="idRede"
                rules={[
                  { required: true, message: "Informe o código do rede" },
                  {
                    pattern: /^\d{3}$/,
                    message: "O código deve conter exatamente 3 números",
                  },
                ]}
              >
                <Input allowClear  disabled={initialValues?.idRede ? true : false}/>
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <TagsOutlined style={{ marginRight: 8 }} />
                Descrição
              </>
            ),
            children: (
              <Form.Item name="descricao" rules={[{ required: true }]}>
                <Input allowClear />
              </Form.Item>
            ),
          },
        ]}
        column={1}
      />
      <Form.Item style={{ width: "100%" }}>
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            // disabled={!isSalvarHabilitado}
          >
            Salvar
          </Button>
         {!initialValues?.idRede && <Button onClick={() => form.resetFields()}>Limpar</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
};
