import { Form, Button, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

interface StandardFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  children: React.ReactNode;
  childrenSubmit?: React.ReactNode;
  loading?: boolean;
}

export const StandardForm = ({
  initialValues,
  onSubmit,
  children,
  loading = false,
  childrenSubmit,
}: StandardFormProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
    form={form}
      layout="vertical"
      variant="underlined"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <Row gutter={[16, 16]}>
        {children}
      </Row>
      
          <Form.Item style={{ textAlign: 'center' }}> 
            {!childrenSubmit ? (
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                block
              >
                Salvar
              </Button>
            ) : (
              childrenSubmit
            )}
          </Form.Item>
       
    </Form>
  );
};
