import { Col, List, Row, Typography } from 'antd';
import React from 'react'

const BaseLista = () => {
    const { Title } = Typography;

const listaDados = [
  "Produto 1",
  "Produto 2",
  "Produto 3",
  "Produto 4",
  "Produto 5"
];
  return (
    <div>
         {/* Lista */}
      <Title level={3} style={{ marginTop: 24 }}>Lista</Title>
      <Row>
        <Col xs={24} md={12}>
          <List
            bordered
            dataSource={listaDados}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>
    </div>
  )
}

export default BaseLista
