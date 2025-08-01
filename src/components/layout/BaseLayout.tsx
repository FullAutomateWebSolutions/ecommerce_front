import { Layout, Breadcrumb, Typography, Badge, Row, Col } from 'antd';
import { useEffect, useState } from 'react';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface BaseLayoutProps {
  title: string;
  subTitle?: string;
  breadcrumb?: string[];
  actions?: React.ReactNode;
  children: React.ReactNode;
  versao?: string;

}


export const BaseLayout = ({ title, breadcrumb = [], actions, children,versao, subTitle }: BaseLayoutProps) => {
    const [mostrarBadge, setMostrarBadge] = useState(false);

    useEffect(() => {
      
    if (versao !== undefined) {
      const timer = setTimeout(() => {
        setMostrarBadge(true);
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [versao]);
  return (
    
    <Layout style={{ padding: 5}} >   
       
      {breadcrumb.length > 0 && (
        <Breadcrumb style={{ marginBottom: 2,  fontSize:10}}>
          
          {breadcrumb.map((item, idx) => (
            <Breadcrumb.Item key={idx}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <Row style={{ display: 'flex',  justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <Row style={{ flexDirection: "column", }}>
          <Title level={4} style={{ margin: 1 }}>{title}</Title>
           <Paragraph type='secondary' style={{ padding: 0, marginBottom: 4, fontSize:10 }}>{subTitle}</Paragraph>
        </Row>
        {actions}
      </Row>
      
         {!mostrarBadge && (
        // <Row style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 15 }}>
          <Badge.Ribbon text={versao} />
        // </Row>
      )}
      <Content style={{ overflow: 'hidden' }}> {children}</Content>
      
    </Layout>
  );
};
