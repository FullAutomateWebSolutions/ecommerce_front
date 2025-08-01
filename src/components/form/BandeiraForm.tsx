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
import { IBandeira } from "@/types/Bandeira";


// const { Option } = Select;

export interface IBandeiraFormValues {
  idBandeira: string;
  descricao: string;
  listBandeira: IListBandeiraFormValues[];
}

export interface IListBandeiraFormValues {
  idBandeira: string;
  descricaoBandeira: string;
  date_create?: string;
  date_update?: string;
}

interface BandeiraFormProps {
  initialValues?: IBandeira | null;
  onSubmit: (values: IBandeira) => void;
  title: string;
  loading?: boolean;
}

export const BandeiraForm = ({
  title,
  initialValues,
  onSubmit,
  loading,
}: BandeiraFormProps) => {
  const [form] = Form.useForm<IBandeira>();
  const handleFinish = (values: IBandeira) => {
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
      <Divider orientation="left">Cadastro de Bandeira</Divider>

      <StandardDescriptionsForm
        data={[
          {
            label: (
              <>
                <BarcodeOutlined style={{ marginRight: 8 }} />
                Código de Bandeira
              </>
            ),
            children: (
              <Form.Item
                name="idBandeira"
                rules={[
                  { required: true, message: "Informe o código do Bandeira" },
                  {
                    pattern: /^\d{3}$/,
                    message: "O código deve conter exatamente 3 números",
                  },
                ]}
              >
                <Input allowClear  disabled={initialValues?.idBandeira ? true : false}/>
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
         {!initialValues?.idBandeira && <Button onClick={() => form.resetFields()}>Limpar</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
};
