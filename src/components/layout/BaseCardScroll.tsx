import { Card, Row, Typography } from 'antd';

const BaseCardScroll = () => {
    const { Title } = Typography;
    const cardsScroll = [
      { title: "Card A", description: "Descrição A" },
      { title: "Card B", description: "Descrição B" },
      { title: "Card C", description: "Descrição C" },
      { title: "Card D", description: "Descrição D" },
      { title: "Card E", description: "Descrição E" }
    ];
    
  return (
    <>
            {/* Cards com scroll lateral no mobile */}
              <Title level={3} style={{ marginTop: 24 }}>Cards com Scroll</Title>
              <Row style={{
                overflowX: "auto",
                display: "flex",
                gap: "16px",
                paddingBottom: "16px"
              }}>
                {cardsScroll.map((card, index) => (
                  <Card
                    key={index}
                    title={card.title}
                    style={{ minWidth: 250, flex: "0 0 auto" }}
                  >
                    {card.description}
                  </Card>
                ))}
              </Row>
        
      
    </>
  )
}

export default BaseCardScroll
