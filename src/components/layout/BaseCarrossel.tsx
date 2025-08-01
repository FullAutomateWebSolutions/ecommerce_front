import { Carousel, Col, Row, Typography } from "antd";
import React from "react";
const carouselItens = [
  "https://via.placeholder.com/400x200?text=Slide+1",
  "https://via.placeholder.com/400x200?text=Slide+2",
  "https://via.placeholder.com/400x200?text=Slide+3",
];

const BaseCarrossel = () => {
  const { Title } = Typography;
  return (
    <div>
      {/* Carrossel */}
      <Title level={3} style={{ marginTop: 24 }}>
        Carrossel
      </Title>
      <Row>
        <Col xs={24} md={16}>
          <Carousel autoplay>
            {carouselItens.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default BaseCarrossel;
