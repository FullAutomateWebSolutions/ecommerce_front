import { Card, Col, Row } from 'antd'
import React from 'react'

const BaseCardAjuste = () => {
  return (
    <div>
        {/*Cards */}
         <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <Card title="Card 1" bordered>
            Conteúdo 1
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card title="Card 2" bordered>
            Conteúdo 2
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card title="Card 3" bordered>
            Conteúdo 3
          </Card>
        </Col>
      </Row>

    </div>
  )
}

export default BaseCardAjuste
