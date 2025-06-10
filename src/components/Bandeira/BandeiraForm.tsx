import { mockDado } from '@/pages/CadastroRede.page';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

export interface IBandeiraFormValues {
  idBandeira: string;
  descricao: string;
  idRede : string;
}

interface BandeiraFormProps {
  initialValues?: IBandeiraFormValues;
  onSubmit: (values: IBandeiraFormValues) => void;
  loading?: boolean;
}

export const BandeiraForm = ({
  initialValues,
  onSubmit,
  loading,
}: BandeiraFormProps) => {
  const [form] = Form.useForm<IBandeiraFormValues>();

  const handleFinish = (values: IBandeiraFormValues) => {
    onSubmit(values);
  };
  

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <Form.Item label="Descrição" name="descricao" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Código de Bandeira" name="idBandeira" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Rede" name="idRede" rules={[{ required: true }]}>
        <Select placeholder="Selecione uma rede">
        {mockDado.map((e)=>(
             <Option value={e.idRede}>{e.descricao}</Option>
        ))}
        
        </Select>
      </Form.Item>

      {/* <Form.Item label="Preço" name="preco" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} prefix="R$" min={0} step={0.01} />
      </Form.Item>

      <Form.Item label="Estoque" name="estoque" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};
