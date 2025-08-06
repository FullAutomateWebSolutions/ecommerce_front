import React, { useEffect, useState } from "react";
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
  Switch,
} from "antd";
import { AttributeML, Product } from "@/types/type";
import dayjs from "dayjs";
import { useGenericPost } from "@/hooks/useQueryStore";
import { categorias } from "@/pages/MercadoLivre/form/AtributosCategoriaMercadoLivreManualForm";
import { useMercadoLivre } from "@/hooks/useMercadoLivre";
import { loginStore } from "@/store/useStore";

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
  const [selectCategoriaML, setSelectCategoriaML] = useState<string>(
    initialValues?.mercadoLivre?.categoria || ""
  );
  const [brandImageUrl, setBrandImageUrl] = useState(
    initialValues?.brand?.picture || ""
  );
  const [desc, setDesc] = useState(
    initialValues?.mercadoLivre?.description || ""
  );
  const [attributes, setAttributes] = useState<AttributeML[]>([]);
  const idForm = Form.useWatch("id", form);
  const gtinForm = Form.useWatch("gtin", form);
  const { AttributeForm } = useMercadoLivre();
  const { userSing } = loginStore();

  const { mutate, isPending } = useGenericPost({
    endpoint: "/search_byGtin_product",
    queryKey: "product",
    options: {
      retry: 2,
    },
  });

  useEffect(() => {
    handleFormML;
  }, [attributes]);

  const handleFinish = (values: any) => {
    if (values.release_date) {
      values.release_date = values.release_date.format("YYYY-MM-DD");
    }

    // const attributes = Object.entries(values).map(([key, value]) => ({
    //   id: key,
    //   value_id:
    //     typeof value === "string" && value.startsWith("MLB")
    //       ? value
    //       : undefined,
    //   value_name:
    //     typeof value === "string" && !value.startsWith("MLB")
    //       ? value
    //       : undefined,
    // }));

    // const payload = {
    //   title,
    //   price,
    //   available_quantity,
    //   buying_mode,
    //   condition,
    //   listing_type_id,
    //   description: {
    //     plain_text: description,
    //   },
    //   pictures: pictures
    //     .split(",")
    //     .map((url: string) => ({ source: url.trim() })),
    //   // category_id: values,
    //   attributes,
    // };

    // const changedFields: Record<string, any> = {};
    // for (const key in values) {
    //   //@ts-ignore
    //   if ((values[key] !== initialValues[key])) {
    //     changedFields[key] = values[key];
    //   }
    // }

    onSubmit({
      ...values,
      created_at: initialValues?.created_at? initialValues.created_at: dayjs(new Date).toISOString(),
      origin: userSing?.email.split("@")[0].toUpperCase(),
      updated_at: dayjs(new Date).toISOString(),
    });
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
            if (data.ncm?.full_description) setDesc(data.ncm.full_description);
            // //@ts-ignore
            // if (data?.message) {
            //   //@ts-ignore
            //   message.info(data.message);
            //   form.setFieldValue("id", "");
            // }
          }
        },
        onError: () => {},
      }
    );
  };

  const handleFormML = () => {
    AttributeForm.mutate(selectCategoriaML, {
      onSuccess: (data) => {
        setAttributes(data);
      },
    });
  };

  const renderInput = (attribute: AttributeML) => {
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

          {!!data?.id || !!initialValues?.id ? (
            <Form.Item
              name="gtin"
              label="GTIN(Ean)"
              rules={[{ required: true }]}
            >
              <InputNumber
                //  disabled={!!data?.id || !!initialValues?.id}
                style={{ width: "100%" }}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="gtin"
              label="GTIN(Ean)"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} onBlur={handleGTINBlur} />
            </Form.Item>
          )}

          {!!data?.id ||
            (!!initialValues?.id && (
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
            ))}
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
            <Form.Item name="origin" label="Origem">
              <Input disabled />
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
      <Form.Item
        name={["ncm", "full_description"]}
        label="Descrição"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={4} />
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
      <Divider />

      <Title level={4}>Mercado Livre</Title>

      <Form.Item
        name={["mercadoLivre", "categoria"]}
        label="Categoria Mercado Livre"
      >
        <Select
          onSelect={(e: string) => setSelectCategoriaML(e)}
          onBlur={handleFormML}
        >
          {categorias.map((e) => (
            <Option key={e.id} children={e.name} />
          ))}
        </Select>
      </Form.Item>
      {AttributeForm.isPending && <>Carregando....</>}
      {(attributes.length > 0 || initialValues?.mercadoLivre) && (
        <>
          <Title level={4}>Base de parametro (Simples)</Title>
          <Space wrap>
            <Form.Item
              name={["mercadoLivre", "title"]}
              label="Título"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["mercadoLivre", "price"]}
              label="Preço (R$)"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name={["mercadoLivre", "available_quantity"]}
              label="Quantidade"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Space>
          <Form.Item name={["mercadoLivre", "ativo"]} label="SiteEnvio">
            <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" />
          </Form.Item>
          <Title level={4}>Modo de venda</Title>

          <Space wrap>
            <Form.Item
              name={["mercadoLivre", "buying_mode"]}
              label="Modo de compra"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="buy_it_now">
                  Compra Imediata
                </Select.Option>
                <Select.Option value="auction">Leilão</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={["mercadoLivre", "condition"]}
              label="Condição"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="new">Novo</Select.Option>
                <Select.Option value="used">Usado</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={["mercadoLivre", "listing_type_id"]}
              label="Tipo de anúncio"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="gold_pro">Profissional</Select.Option>
                <Select.Option value="gold_special">Especial</Select.Option>
                <Select.Option value="free">Grátis</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Form.Item
            name={["mercadoLivre", "description"]}
            label="Descrição"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name={["mercadoLivre", "pictures"]}
            label="URLs das imagens (separadas por vírgula)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Title level={5}>Campos dinâmicos obrigatórios da categoria</Title>

          {/* Campos dinâmicos obrigatórios */}

          {attributes.map((attr) => (
            <Form.Item
              key={attr.id}
              label={attr.name}
              name={["mercadoLivre", "atributos", attr.id]}
              rules={[
                { required: true, message: `Preencha o campo ${attr.name}` },
              ]}
            >
              {renderInput(attr)}
            </Form.Item>
          ))}
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading || isPending}>
          {initialValues ? "Atualizar Produto" : "Cadastrar Produto"}
        </Button>
      </Form.Item>
    </Form>
  );
};
