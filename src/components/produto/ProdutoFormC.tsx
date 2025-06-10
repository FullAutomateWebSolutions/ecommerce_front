import React, { useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Space,
  Divider,
  Card,
  message,
} from 'antd';
import { Produto } from '@/types/Produto';
import axios from 'axios';


const { RangePicker } = DatePicker;

interface ProdutoFormProps {
  initialValues?: Produto;
  onSubmit: (values: Produto) => void;
  loading?: boolean;
}

export const ProdutoFormC: React.FC<ProdutoFormProps> = ({
  initialValues,
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm<Produto>();

  const handleFinish = (values: Produto) => {
    onSubmit(values);
    console.log(values)
  };

    useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

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

      const produto:Produto = response.data;
      console.log
      if (produto && produto.description) {
        form.setFieldsValue(produto);
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
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      autoComplete="off"

      
    >
      <Form.Item
        label="Descrição"
        name="description"
        rules={[{ required: true, message: 'Informe a descrição' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="GTIN Principal"
        name="gtin"
        rules={[{ required: true, message: 'Informe o GTIN principal' }]}
      >
        <Input 
         placeholder="Digite o código de barras"
        onBlur={(e) => buscarProdutoPorGTIN(e.target.value)}
        style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Thumbnail (URL)" name="thumbnail" rules={[{ type: 'url' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Dimensões (cm)">
        <Space>
          <Form.Item name="width" noStyle>
            <InputNumber placeholder="Largura" />
          </Form.Item>
          <Form.Item name="height" noStyle>
            <InputNumber placeholder="Altura" />
          </Form.Item>
          <Form.Item name="length" noStyle>
            <InputNumber placeholder="Comprimento" />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item label="Peso (kg)">
        <Space>
          <Form.Item name="net_weight" noStyle>
            <InputNumber placeholder="Peso líquido" step={0.01} />
          </Form.Item>
          <Form.Item name="gross_weight" noStyle>
            <InputNumber placeholder="Peso bruto" step={0.01} />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item label="Datas">
        <Space>
          <Form.Item name="created_at" noStyle>
            <Input placeholder="Data criação (ISO)" />
          </Form.Item>
          <Form.Item name="updated_at" noStyle>
            <Input placeholder="Data atualização (ISO)" />
          </Form.Item>
          <Form.Item name="release_date" noStyle>
            <Input placeholder="Data lançamento (ISO)" />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item label="Preço (string formatada)" name="price">
        <Input placeholder="Ex: R$ 7,12 a R$ 27,90" />
      </Form.Item>

      <Form.Item label="Preços médios e limites">
        <Space>
          <Form.Item name="avg_price" noStyle>
            <InputNumber placeholder="Preço médio" step={0.01} />
          </Form.Item>
          <Form.Item name="max_price" noStyle>
            <InputNumber placeholder="Preço máximo" step={0.01} />
          </Form.Item>
          <Form.Item name="min_price" noStyle>
            <InputNumber placeholder="Preço mínimo" step={0.01} />
          </Form.Item>
        </Space>
      </Form.Item>

      <Divider>GTINs</Divider>

      <Form.List name="gtins">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card
                key={key}
                size="small"
                style={{ marginBottom: 10 }}
                title={`GTIN ${name + 1}`}
                extra={<Button onClick={() => remove(name)} danger size="small">Remover</Button>}
              >
                <Form.Item
                  {...restField}
                  label="GTIN"
                  name={[name, 'gtin']}
                  rules={[{ required: true, message: 'Informe o GTIN' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Divider>Unidade Comercial</Divider>
                <Form.Item
                  {...restField}
                  label="Tipo de embalagem"
                  name={[name, 'commercial_unit', 'type_packaging']}
                  rules={[{ required: true, message: 'Informe o tipo de embalagem' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Quantidade na embalagem"
                  name={[name, 'commercial_unit', 'quantity_packaging']}
                  rules={[{ required: true, message: 'Informe a quantidade' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Space>
                  <Form.Item
                    {...restField}
                    label="Lastro"
                    name={[name, 'commercial_unit', 'ballast']}
                    style={{ flex: 1 }}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Camada"
                    name={[name, 'commercial_unit', 'layer']}
                    style={{ flex: 1 }}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Space>
              </Card>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Adicionar GTIN
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Divider>Marca</Divider>

      <Form.Item
        label="Nome da Marca"
        name={['brand', 'name']}
        rules={[{ required: true, message: 'Informe o nome da marca' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="URL da imagem da Marca"
        name={['brand', 'picture']}
        rules={[{ type: 'url' }]}
      >
        <Input />
      </Form.Item>

      <Divider>NCM (Nomenclatura Comum do Mercosul)</Divider>

      <Form.Item
        label="Código NCM"
        name={['ncm', 'code']}
        rules={[{ required: true, message: 'Informe o código NCM' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descrição NCM"
        name={['ncm', 'description']}
        rules={[{ required: true, message: 'Informe a descrição NCM' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Descrição completa NCM" name={['ncm', 'full_description']}>
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Ex NCM" name={['ncm', 'ex']}>
        <Input />
      </Form.Item>

      <Divider>Categoria</Divider>

      <Form.Item
        label="ID Categoria"
        name={['category', 'id']}
        rules={[{ required: true, message: 'Informe o ID da categoria' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Descrição Categoria"
        name={['category', 'description']}
        rules={[{ required: true, message: 'Informe a descrição da categoria' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ID Categoria Pai"
        name={['category', 'parent_id']}
        rules={[{ required: true, message: 'Informe o ID do pai da categoria' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};
