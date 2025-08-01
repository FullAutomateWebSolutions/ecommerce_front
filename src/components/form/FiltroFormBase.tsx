import React from "react";
import { Button, Col, Form, Row, Space } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";

type CampoCustomizado = {
  key: string;
  label: string;
  component: React.ReactNode;
};

type Props = {
  form: any;
  campos: CampoCustomizado[];
  onBuscar: (values: any) => void;
  onValue?: (changedValues: any, allValues: any) => void;
  onLimpar?: () => void;
};

const FiltroFormBase: React.FC<Props> = ({
  form,
  campos,
  onBuscar,
  onLimpar,
  onValue,
}) => {
   
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => onBuscar(values)}
      variant="underlined"
      onValuesChange={(changedValues, allValues) => {
        if (onValue) {
          onValue(changedValues, allValues);
        }
      }}
    >
      <Row gutter={[16, 0]} align="bottom" wrap>
        {campos.map((campo) => (
          <Col key={campo.key}>
            <Form.Item name={campo.key} label={campo.label}>
              {campo.component}
            </Form.Item>
          </Col>
        ))}

        <Col flex="auto" style={{ textAlign: "right" }}>
          <Form.Item label=" ">
            <Space>
              {onLimpar && (
                <Button onClick={onLimpar} icon={<ReloadOutlined />}>
                  Limpar
                </Button>
              )}
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Buscar
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltroFormBase;
