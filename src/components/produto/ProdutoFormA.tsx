import { Form, Input, InputNumber, Select, message } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { Produto } from "@/types/Produto";

interface Props {
  onSubmit: (values: Produto) => void;
  values?: Produto;
}

export const ProdutoFormA = ({ onSubmit, values }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (values) {
      form.setFieldsValue(values);
    }
  }, [values]);

  const buscarProdutoPorGTIN = async (gtin: string) => {
    try {
      const response = await axios.get(
        `https://api.cosmos.bluesoft.com.br/gtins/${gtin}.json`,
        {
          headers: {
            "User-Agent": "Cosmos-API-Request",
            "Content-Type": "application/json",
            "X-Cosmos-Token": "lQ8BFJOXSkBiEIZaLgT_oQ", // Troque por .env se necessário
          },
        }
      );

      const produto = response.data;

      if (produto && produto.description) {
        form.setFieldsValue({
          descricao: produto.description,
          categoria: produto.gpc?.name || "",
          imagem: produto.image || "",
        });
        message.success("Produto encontrado e preenchido automaticamente.");
      } else {
        message.warning("GTIN encontrado, mas sem informações suficientes.");
      }
    } catch (error) {
      console.error(error);
      message.error("Erro ao buscar produto pelo GTIN.");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item name="codigo" label="Código (GTIN)">
        <Input
          placeholder="Digite o código de barras"
          onBlur={(e) => buscarProdutoPorGTIN(e.target.value)}
        />
      </Form.Item>

      <Form.Item name="descricao" label="Descrição">
        <Input placeholder="Descrição do produto" />
      </Form.Item>

      <Form.Item name="preco" label="Preço">
        <InputNumber style={{ width: "100%" }} prefix="R$" />
      </Form.Item>

      <Form.Item name="estoque" label="Estoque">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="categoria" label="Categoria">
        <Select placeholder="Selecione a categoria" allowClear>
          <Select.Option value="Eletrônico">Eletrônico</Select.Option>
          <Select.Option value="Limpeza">Limpeza</Select.Option>
          <Select.Option value="Alimento">Alimento</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="imagem" label="URL da Imagem">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item name="status" label="Status" initialValue={true}>
        <Select>
          <Select.Option value={true}>Ativo</Select.Option>
          <Select.Option value={false}>Inativo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <button className="ant-btn ant-btn-primary" type="submit">
          Salvar
        </button>
      </Form.Item>
    </Form>
  );
};
