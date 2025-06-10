import { Layout, Breadcrumb, Typography, Badge } from 'antd';
import { useEffect, useState } from 'react';

const { Content } = Layout;
const { Title } = Typography;

interface BaseLayoutProps {
  title: string;
  breadcrumb?: string[];
  actions?: React.ReactNode;
  children: React.ReactNode;
  versao?: string;

}


export const BaseLayout = ({ title, breadcrumb = [], actions, children,versao }: BaseLayoutProps) => {
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
    
    <Layout style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
    
       {!mostrarBadge && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 0 }}>
          <Badge.Ribbon text={versao} />
        </div>
      )}
      
       
      {breadcrumb.length > 0 && (
        <Breadcrumb style={{ marginBottom: 16 }}>
          {breadcrumb.map((item, idx) => (
            <Breadcrumb.Item key={idx}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>{title}</Title>
        {actions}
      </div>
      <Content>{children}</Content>
      
    </Layout>
  );
};
