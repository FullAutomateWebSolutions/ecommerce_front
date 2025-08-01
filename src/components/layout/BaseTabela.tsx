import { Col, Row, Table, Typography } from 'antd'


const BaseTabela = () => {
    const { Title } = Typography;
    const columns = [
  { title: "Nome", dataIndex: "name", key: "name" },
  { title: "Idade", dataIndex: "age", key: "age" }
];

const dataSource = [
  { key: "1", name: "João", age: 28 },
  { key: "2", name: "Maria", age: 34 }
];

  return (
    <div>
              {/* Tabela */}
      <Title level={3}>Tabela</Title>
      <Row>
        <Col span={24}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Col>
      </Row>

      
    </div>
  )
}

export default BaseTabela
