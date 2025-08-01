import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Image,
  Space,
  DatePicker,
  Select,
  Typography,
  Divider,
  message,
  Row,
  Col,
} from "antd";
import { Product } from "@/types/type";
import dayjs from "dayjs";
import { useGenericPost } from "@/hooks/useQueryStore";

const { Title } = Typography;
const { Option } = Select;

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (values: Product) => void;
  loading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm<Product>();
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialValues?.thumbnail || ""
  );
  const [data, setData] = useState<Product>();

  const [brandImageUrl, setBrandImageUrl] = useState(
    initialValues?.brand?.picture || ""
  );
  const idForm = Form.useWatch("id", form);
  const gtinForm = Form.useWatch("gtin", form);

  const { mutate, isPending } = useGenericPost({
    endpoint: "/search_byGtin_product",
    queryKey: "product",
    options: {
      retry: 2,
    },
  });

  // search_set_product

 const handleFinish = (values: any) => {
  if (values.release_date) {
    values.release_date = values.release_date.format("YYYY-MM-DD");
  }

  const changedFields: Record<string, any> = {};
  for (const key in values) {
    //@ts-ignore
    if (values[key] !== initialValues[key]) {
      changedFields[key] = values[key];
    }
  }

  onSubmit(changedFields);
};

  const handleGTINBlur = () => {
    const gtin = form.getFieldValue("gtin");
    if (!gtin) return;
    mutate(
      { ean: gtin },
      {
        onSuccess: (data: Product) => {
          if (data) {
            setData(data);

            setThumbnailUrl("");
            form.setFieldsValue({
              ...data,
              //@ts-ignore
              release_date: data.release_date
                ? dayjs(data.release_date)
                : undefined,
            });

            if (data.thumbnail) setThumbnailUrl(data.thumbnail);
            if (data.brand?.picture) setBrandImageUrl(data.brand.picture);
            //@ts-ignore
            if (data?.message) {
              //@ts-ignore
              message.info(data.message);
              form.setFieldValue("id", "");
            }
          }
        },
        onError: () => {},
      }
    );
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      disabled={isPending}
      initialValues={{
        ...initialValues,
        release_date: initialValues?.release_date
          ? dayjs(initialValues.release_date)
          : undefined,
      }}
    >
      <Row gutter={[8, 25]}>
        <Col md={8}>
          <Title level={4}>Informações Básicas</Title>
          {/* loading={loading || isPending} */}
          <Form.Item name="gtin" label="GTIN(Ean)" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} onBlur={handleGTINBlur} />
          </Form.Item>
          {!!data?.id || !!initialValues?.id &&(
          <Form.Item
            name="id"
            label="ID_Produto"
            // rules={[{ required: true, type: "number", min: 10 }]}
          >
            <InputNumber
              disabled={!!data?.id || !!initialValues?.id}
              style={{ width: "100%" }}
            />
          </Form.Item>
          )}
          <Form.Item
            name="description"
            label="Descrição"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="thumbnail" label="URL da Imagem (Thumbnail)">
            <Input
              allowClear
              placeholder="Cole o link da imagem"
              onChange={(e) => setThumbnailUrl(e.target.value)}
            />
          </Form.Item>
          {thumbnailUrl && (
            <Form.Item>
              <Image width={100} src={thumbnailUrl} alt="thumbnail" />
            </Form.Item>
          )}

          <Form.Item name="release_date" label="Data de Lançamento">
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col md={8}>
          <Title level={4}>Dimensões e Peso</Title>
          <Space size="middle" wrap>
            <Form.Item name="width" label="Largura (cm)">
              <InputNumber />
            </Form.Item>
            <Form.Item name="height" label="Altura (cm)">
              <InputNumber />
            </Form.Item>
            <Form.Item name="length" label="Comprimento (cm)">
              <InputNumber />
            </Form.Item>
            <Form.Item name="net_weight" label="Peso Líquido (kg)">
              <InputNumber />
            </Form.Item>
            <Form.Item name="gross_weight" label="Peso Bruto (kg)">
              <InputNumber />
            </Form.Item>
          </Space>
        </Col>
        <Col md={8}>
          <Title level={4}>Marca</Title>
          <Form.Item name={["brand", "name"]} label="Nome da Marca">
            <Input />
          </Form.Item>

          <Form.Item name={["brand", "picture"]} label="Imagem da Marca">
            <Input onChange={(e) => setBrandImageUrl(e.target.value)} />
          </Form.Item>
          {brandImageUrl && (
            <Form.Item>
              <Image width={120} src={brandImageUrl} alt="brand" />
            </Form.Item>
          )}

          <Title level={4}>Categoria</Title>
          <Form.Item name={["category", "description"]} label="Categoria">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Title level={4}>Preços</Title>
      <Space size="middle" wrap>
        <Form.Item name="price" label="Preço">
          <InputNumber prefix="R$" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item name="avg_price" label="Preço Médio">
          <InputNumber prefix="R$" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item name="min_price" label="Preço Mínimo">
          <InputNumber prefix="R$" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item name="max_price" label="Preço Máximo">
          <InputNumber prefix="R$" style={{ width: 120 }} />
        </Form.Item>
      </Space>

      <Divider />

      <Title level={4}>NCM</Title>
      <Space wrap>
        <Form.Item name={["ncm", "code"]} label="Código NCM">
          <Input />
        </Form.Item>
        <Form.Item name={["ncm", "description"]} label="Descrição NCM">
          <Input />
        </Form.Item>
        <Form.Item name={["ncm", "ex"]} label="EX (opcional)">
          <Input />
        </Form.Item>
      </Space>

      <Title level={4}>GPC</Title>
      <Form.Item name={["gpc", "code"]} label="Código GPC">
        <Input />
      </Form.Item>
      <Form.Item name={["gpc", "description"]} label="Descrição GPC">
        <Input />
      </Form.Item>

      <Divider />

      <Title level={4}>GTINs Adicionais</Title>
      <Form.List name="gtins">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Space
                key={key}
                align="baseline"
                style={{ display: "flex", marginBottom: 8 }}
              >
                <Form.Item name={[name, "gtin"]} label="GTIN">
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name={[name, "commercial_unit", "type_packaging"]}
                  label="Embalagem"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[name, "commercial_unit", "quantity_packaging"]}
                  label="Qtde"
                >
                  <InputNumber />
                </Form.Item>
                <Button type="link" danger onClick={() => remove(name)}>
                  Remover
                </Button>
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Adicionar GTIN
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading || isPending}>
          {initialValues ? "Atualizar Produto" : "Cadastrar Produto"}
        </Button>
      </Form.Item>
    </Form>
  );
};
