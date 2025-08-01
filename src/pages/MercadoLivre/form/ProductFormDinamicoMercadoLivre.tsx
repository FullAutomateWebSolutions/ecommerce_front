import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Divider,
  Typography,
  Card,
  Checkbox,
} from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Title } = Typography;

type Attribute = {
  id: string;
  name: string;
  value_type: string;
  values?: { id: string; name: string }[];
  tags?: { required?: boolean };
};

type ProductFormProps = {
  categoryId: string;
  onSubmit?: (data: any) => void; // opcional, pois agora executamos direto
};

type VariationInput = {
  attributes: { id: string; value_name: string }[];
  price: number;
  available_quantity: number;
  picture: File | null;
};


export function ProductFormDinamicoMercadoLivre({ categoryId, onSubmit }: ProductFormProps) {
  const [form] = Form.useForm();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const [variations, setVariations] = useState<VariationInput[]>([]);
  const variationAttributes: any[] = [];

  const addVariation = () => {
  const newVariation: VariationInput = {
    attributes: variationAttributes.map(attr => ({ id: attr.id, value_name: "" })),
    price: 0,
    available_quantity: 0,
    picture: null
  };
  setVariations([...variations, newVariation]);
};


{variations.map((variation, index) => (
  <>
  {/* <Card key={index} title={`Variação ${index + 1}`} style={{ marginBottom: 16 }}> */}
    {variation.attributes.map((attr, i) => (
      <Form.Item label={variationAttributes[i]?.name} key={attr.id}>
        <Input
          value={attr.value_name}
          onChange={(e) => {
            const newVariations = [...variations];
            newVariations[index].attributes[i].value_name = e.target.value;
            setVariations(newVariations);
          }}
        />
      </Form.Item>
    ))}
    <Form.Item label="Preço">
      <InputNumber
        value={variation.price}
        onChange={(value) => {
          const newVariations = [...variations];
          newVariations[index].price = value ?? 0;
          setVariations(newVariations);
        }}
      />
    </Form.Item>
    <Form.Item label="Estoque">
      <InputNumber
        value={variation.available_quantity}
        onChange={(value) => {
          const newVariations = [...variations];
          newVariations[index].available_quantity = value ?? 0;
          setVariations(newVariations);
        }}
      />
    </Form.Item>
    <Form.Item label="Imagem">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          const newVariations = [...variations];
          newVariations[index].picture = file;
          setVariations(newVariations);
        }}
      />
    </Form.Item>
  {/* // </Card> */}
  </>
))}


  // Buscar atributos obrigatórios
  useEffect(() => {
    async function fetchAttributes() {
      const res = await axios.get(
        `http://localhost:3000/api/mercadolivre/categories/${categoryId}/attributes`
      );
      const required = res.data.filter(
        (attr: Attribute) => attr.tags?.required
      );
      setAttributes(required);
    }
    if (categoryId) fetchAttributes();
  }, [categoryId]);

  // Campo de atributo dinâmico
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

  const onFinish = async (values: Record<string, any>) => {
    setLoading(true);


    try {
      // 1. Extrair atributos dinâmicos
      const dynamicAttributes = attributes.map((attr) => {
        const value = values[attr.id];
        return {
          id: attr.id,
          value_id: attr.values?.some((v) => v.id === value)
            ? value
            : undefined,
          value_name: attr.values?.some((v) => v.id === value)
            ? undefined
            : value,
        };
      });

      // 2. Montar payload completo
      const payload = {
        title: values.title,
        price: values.price,
        currency_id: values.currency_id,
        available_quantity: values.available_quantity,
        buying_mode: values.buying_mode,
        listing_type_id: values.listing_type_id,
        condition: values.condition,
        category_id: categoryId,
        attributes: dynamicAttributes,
        description: { plain_text: values.description },
        shipping: {
  mode: "me2",
  local_pick_up: false,
  free_shipping: values.shipping?.free_shipping || false
},
        pictures: values.pictures
          ? values.pictures
              .split(",")
              .map((url: string) => ({ source: url.trim() }))
          : [],
      };

      // 3. Exibir prévia no console e no estado
      console.log("📦 Payload pronto para envio:", payload);
      setPreviewData(payload);

      // 4. Enviar direto para publicação

      // console.log("✅ Produto publicado:", result);

      // if (onSubmit) onSubmit(result);
    } catch (err) {
      console.error("Erro ao publicar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={loading}
      >
        <Title level={4}>Informações básicas</Title>
        <Form.Item label="Título" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Preço" name="price" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Moeda"
          name="currency_id"
          initialValue="BRL"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="BRL">BRL</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Quantidade disponível"
          name="available_quantity"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Modo de compra"
          name="buying_mode"
          initialValue="buy_it_now"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="buy_it_now">Comprar agora</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={["shipping", "free_shipping"]} valuePropName="checked">
  <Checkbox>Frete grátis</Checkbox>
</Form.Item>

        <Form.Item
          label="Tipo de anúncio"
          name="listing_type_id"
          initialValue="gold_pro"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="gold_pro">Gold Pro</Select.Option>
            <Select.Option value="gold_special">Gold Special</Select.Option>
            <Select.Option value="bronze">Bronze</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Condição"
          name="condition"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="new">Novo</Select.Option>
            <Select.Option value="used">Usado</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Descrição do Produto"
          name="description"
          rules={[{ required: true, message: "Digite a descrição do produto" }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item
          label="Links das imagens (separados por vírgula)"
          name="pictures"
          tooltip="Exemplo: https://img1.com, https://img2.com"
        >
          <TextArea
            rows={3}
            placeholder="https://imagem1.jpg, https://imagem2.jpg"
          />
        </Form.Item>

        <Divider />

        <Title level={4}>Atributos obrigatórios da categoria</Title>
        {attributes.map((attr) => (
          <Form.Item
            key={attr.id}
            label={attr.name}
            name={attr.id}
            rules={[
              { required: true, message: `Preencha o campo ${attr.name}` },
            ]}
          >
            {renderInput(attr)}
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Publicar produto
          </Button>
        </Form.Item>
      </Form>

      {previewData && (
        <>
          <Divider />
          <Title level={5}>📄 Prévia do JSON enviado</Title>
          <pre
            style={{
              background: "#f5f5f5",
              padding: 16,
              borderRadius: 8,
              maxHeight: 300,
              overflow: "auto",
            }}
          >
            {JSON.stringify(previewData, null, 2)}
          </pre>
        </>
      )}
    </>
  );
}
