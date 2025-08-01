import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import axios from "axios";

type Attribute = {
  id: string;
  name: string;
  value_type: string;
  values?: { id: string; name: string }[];
  tags?: {
    required?: boolean;
  };
};

type ProductFormProps = {
  categoryId: string;
  onSubmit: (data: any) => void;
};

export function ProductFormDinamicoObrigatorioMercadoLivre({ categoryId, onSubmit }: ProductFormProps) {
  const [form] = Form.useForm();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);

  // Buscar atributos obrigatórios da categoria
  useEffect(() => {
    async function fetchAttributes() {
      const res = await axios.get(
        `https://atf-m1.vercel.app/api/mercadolivre/categories/${categoryId}/attributes`
      );
      const required = res.data.filter((attr: Attribute) => attr.tags?.required);
      setAttributes(required);
    }
    fetchAttributes();
  }, [categoryId]);

  const renderInput = (attribute: Attribute) => {
    if (attribute.values && attribute.values.length > 0) {
      return (
        <Select>
          {attribute.values.map((opt) => (
            <Select.Option key={opt.id} value={opt.id}>
              {opt.name}
            </Select.Option>
          ))}
        </Select>
      );
    }
    return <Input />;
  };

  const onFinish = (values: Record<string, any>) => {
    // Separar campos do formulário principal e atributos dinâmicos
    const {
      title,
      price,
      available_quantity,
      buying_mode,
      condition,
      listing_type_id,
      description,
      pictures,
      ...attributeValues
    } = values;

    const attributes = Object.entries(attributeValues).map(([key, value]) => ({
      id: key,
      value_id: typeof value === "string" && value.startsWith("MLB") ? value : undefined,
      value_name: typeof value === "string" && !value.startsWith("MLB") ? value : undefined,
    }));

    const payload = {
      title,
      price,
      available_quantity,
      buying_mode,
      condition,
      listing_type_id,
      description: {
        plain_text: description,
      },
      pictures: pictures
        .split(",")
        .map((url: string) => ({ source: url.trim() })),
      category_id: categoryId,
      attributes,
    };

    onSubmit(payload);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} disabled={loading}>
      <Form.Item name="title" label="Título" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="price" label="Preço (R$)" rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="available_quantity" label="Quantidade" rules={[{ required: true }]}>
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="buying_mode" label="Modo de compra" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="buy_it_now">Compra Imediata</Select.Option>
          <Select.Option value="auction">Leilão</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="condition" label="Condição" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="new">Novo</Select.Option>
          <Select.Option value="used">Usado</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="listing_type_id" label="Tipo de anúncio" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="gold_pro">Profissional</Select.Option>
          <Select.Option value="gold_special">Especial</Select.Option>
          <Select.Option value="free">Grátis</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="description" label="Descrição" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="pictures"
        label="URLs das imagens (separadas por vírgula)"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {/* Campos dinâmicos obrigatórios */}
      {attributes.map((attr) => (
        <Form.Item
          key={attr.id}
          label={attr.name}
          name={attr.id}
          rules={[{ required: true, message: `Preencha o campo ${attr.name}` }]}
        >
          {renderInput(attr)}
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Publicar Produto
        </Button>
      </Form.Item>
    </Form>
  );
}
