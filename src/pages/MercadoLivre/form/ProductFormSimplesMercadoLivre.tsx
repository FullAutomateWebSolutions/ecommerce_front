import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Switch } from "antd";
import axios from "axios";

type Attribute = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  values?: { id: string; name: string }[];
};

type ProductFormProps = {
  categoryId: string;
  onSubmit: (data: any) => void;
};

export function ProductFormMercadoLivreSimples({ categoryId, onSubmit }: ProductFormProps) {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAttributes() {
      setLoading(true);
      try {
        const response = await axios.get(`https://atf-m1.vercel.app/api/mercadolivre/categories/${categoryId}/attributes`);
        const filtered = response.data.filter(
          (attr: any) => attr.tags 
        );
        setAttributes(filtered);
        console.log(filtered)
      } catch (error) {
        console.error("Erro ao buscar atributos", error);
      } finally {
        setLoading(false);
      }
    }
    if (categoryId) fetchAttributes();
  }, [categoryId]);

  // Gera o input conforme o tipo do atributo
  function renderFormItem(attr: Attribute) {
    switch (attr.type) {
      case "boolean":
        return (
          <Form.Item
            key={attr.id}
            name={attr.id}
            label={attr.name}
            valuePropName="checked"
            rules={[{ required: attr.required }]}
          >
            <Switch />
          </Form.Item>
        );
      case "list":
      case "enum":
        return (
          <Form.Item
            key={attr.id}
            name={attr.id}
            label={attr.name}
            rules={[{ required: attr.required, message: `Preencha o campo ${attr.name}` }]}
          >
            <Select placeholder={`Selecione ${attr.name}`}>
              {attr.values?.map((v) => (
                <Select.Option key={v.id} value={v.name}>
                  {v.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item
            key={attr.id}
            name={attr.id}
            label={attr.name}
            rules={[{ required: attr.required, message: `Preencha o campo ${attr.name}` }]}
          >
            <Input type="number" />
          </Form.Item>
        );
      default:
        return (
          <Form.Item
            key={attr.id}
            name={attr.id}
            label={attr.name}
            rules={[{ required: attr.required, message: `Preencha o campo ${attr.name}` }]}
          >
            <Input />
          </Form.Item>
        );
    }
  }

  return (
    <Form
      layout="vertical"
      onFinish={(values) => {
        onSubmit(values);
      }}
      disabled={loading}
    >
      {attributes.map(renderFormItem)}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Publicar Produto
        </Button>
      </Form.Item>
    </Form>
  );
}
