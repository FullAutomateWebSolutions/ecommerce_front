import { Row, Col } from "antd";
import { ReactNode } from "react";

interface FormGroupProps {
  children: ReactNode;
  columns?: number;
}

export const FormGroup = ({ children, columns = 2 }: FormGroupProps) => {
  const childArray = Array.isArray(children) ? children : [children];
  const colSpan = 24 / columns;

  return (
    <Row gutter={16}>
      {childArray.map((child, index) => (
        <Col span={colSpan} key={index}>
          {child}
        </Col>
      ))}
    </Row>
  );
};
