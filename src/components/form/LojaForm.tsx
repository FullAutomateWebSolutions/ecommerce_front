import {
  BarcodeOutlined,
  UserOutlined,
  HomeOutlined,
  LinkOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { StandardDescriptionsForm } from "../ui/StandardDescriptions";

export interface Loja {
  id?: string;
  tipoCadastro: "pessoa" | "empresa";
  nome: string;
  razaoSocial?: string;
  cnpj?: string;
  cpf?: string;
  inscricaoEstadual?: string;
  telefone?: string;
  email?: string;
  responsavel?: string;
  logoIcone?: string;
  logoTema?: string;
  endereco: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  integracoes?: {
    [parceiro: string]: {
      ativo: boolean;
      token: string;
    };
  };
  ativo: boolean;
  dataCadastro: string;
}

interface LojaFormProps {
  initialValues?: Loja | null;
  onSubmit: (values: Loja) => void;
  title: string;
  loading?: boolean;
}

export const LojaForm = ({
  title,
  initialValues,
  onSubmit,
  loading,
}: LojaFormProps) => {
  const [form] = Form.useForm<Loja>();
  const [tipoCadastro, setTipoCadastro] = useState<"pessoa" | "empresa">(
    initialValues?.tipoCadastro || "empresa"
  );

  const handleFinish = (values: Loja) => {
    const dataCadastro = initialValues?.dataCadastro || new Date().toISOString();
    onSubmit({ ...values, dataCadastro });
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleFinish}
      initialValues={initialValues || { tipoCadastro: "empresa", ativo: true }}
      variant="underlined"
    >
      <Divider orientation="left">{title}</Divider>

      <StandardDescriptionsForm
        column={1}
        data={[
          {
            label: "Tipo de Cadastro",
            children: (
              <Form.Item name="tipoCadastro">
                <Select
                  onChange={(value) => setTipoCadastro(value)}
                  options={[
                    { label: "Empresa (CNPJ)", value: "empresa" },
                    { label: "Pessoa Física (CPF)", value: "pessoa" },
                  ]}
                />
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <UserOutlined /> Nome
              </>
            ),
            children: (
              <Form.Item name="nome" rules={[{ required: true }]}>
                <Input allowClear />
              </Form.Item>
            ),
          },
          ...(tipoCadastro === "empresa"
            ? [
                {
                  label: (
                    <>
                      <BarcodeOutlined /> CNPJ
                    </>
                  ),
                  children: (
                    <Form.Item name="cnpj" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  ),
                },
                {
                  label: "Razão Social",
                  children: <Form.Item name="razaoSocial"><Input /></Form.Item>,
                },
                {
                  label: "Inscrição Estadual",
                  children: <Form.Item name="inscricaoEstadual"><Input /></Form.Item>,
                },
              ]
            : [
                {
                  label: (
                    <>
                      <BarcodeOutlined /> CPF
                    </>
                  ),
                  children: (
                    <Form.Item name="cpf" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  ),
                },
              ]),
          {
            label: "Telefone",
            children: <Form.Item name="telefone"><Input /></Form.Item>,
          },
          {
            label: "Email",
            children: <Form.Item name="email"><Input /></Form.Item>,
          },
          {
            label: "Responsável",
            children: <Form.Item name="responsavel"><Input /></Form.Item>,
          },
          {
            label: "Logo Ícone",
            children: (
              <Form.Item name="logoIcone">
                <Input placeholder="URL do ícone" />
              </Form.Item>
            ),
          },
          {
            label: "Logo Tema",
            children: (
              <Form.Item name="logoTema">
                <Input placeholder="URL do logo tema" />
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <HomeOutlined /> Endereço
              </>
            ),
            children: (
              <>
                <Form.Item name={["endereco", "rua"]} label="Rua">
                  <Input />
                </Form.Item>
                <Form.Item name={["endereco", "numero"]} label="Número">
                  <Input />
                </Form.Item>
                <Form.Item name={["endereco", "complemento"]} label="Complemento">
                  <Input />
                </Form.Item>
                <Form.Item name={["endereco", "bairro"]} label="Bairro">
                  <Input />
                </Form.Item>
                <Form.Item name={["endereco", "cidade"]} label="Cidade">
                  <Input />
                </Form.Item>
                <Form.Item name={["endereco", "estado"]} label="Estado">
                  <Input />
                </Form.Item>
                <Form.Item name={["endereco", "cep"]} label="CEP">
                  <Input />
                </Form.Item>
              </>
            ),
          },
          {
            label: (
              <>
                <LinkOutlined /> Integração Bling
              </>
            ),
            children: (
              <>
                <Form.Item name={["integracoes", "bling", "ativo"]} valuePropName="checked">
                  <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" />
                </Form.Item>
                <Form.Item name={["integracoes", "bling", "token"]} label="Token">
                  <Input.Password />
                </Form.Item>
              </>
            ),
          },
          {
            label: "Ativo",
            children: (
              <Form.Item name="ativo" valuePropName="checked">
                <Switch checkedChildren="Sim" unCheckedChildren="Não" />
              </Form.Item>
            ),
          },
        ]}
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
          <Button onClick={() => form.resetFields()}>Limpar</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
