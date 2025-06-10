 import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';
import { StandardDescriptionsForm } from '../ui/StandardDescriptions';

const { Option } = Select;

export interface ProdutoFormValues {
  id?: string;
  descricao: string;
  codigo: string;
  categoria: string;
  preco: number;
  estoque: number;
  imagens: string;
  status: boolean;
}

interface ProdutoFormProps {
  initialValues?: ProdutoFormValues;
  onSubmit: (values: ProdutoFormValues) => void;
  loading?: boolean;
}

export const ProdutoForm = ({
  initialValues,
  onSubmit,
  loading,
}: ProdutoFormProps) => {
  const [form] = Form.useForm<ProdutoFormValues>();

  const handleFinish = (values: ProdutoFormValues) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      variant='filled'
      initialValues={initialValues}
      onFinish={handleFinish}
    >

      
      <Form.Item label="Descrição" name="descricao" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Código" name="codigo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Categoria" name="categoria" rules={[{ required: true }]}>
        <Select placeholder="Selecione uma categoria">
          <Option value="Eletrônico">Eletrônico</Option>
          <Option value="Alimento">Alimento</Option>
          <Option value="Vestuário">Vestuário</Option>
        </Select>
      </Form.Item>
         <Form.Item label="Imagem" name="imagem" rules={[{ required: true }]}>
        <Input  />
      </Form.Item>

      <Form.Item label="Preço" name="preco" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} prefix="R$" min={0} step={0.01} />
      </Form.Item>

      <Form.Item label="Estoque" name="estoque" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
       <Form.Item label="Status" name="status">
         <Switch defaultChecked={false}  />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};