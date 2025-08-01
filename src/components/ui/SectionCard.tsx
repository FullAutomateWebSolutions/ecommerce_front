import { Card } from 'antd';

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  
}

export const SectionCard = ({ title, children,extra }: SectionCardProps) => {
  return (
    <Card extra={extra} title={title} style={{ marginBottom: 24 }}>
      {children}
    </Card>
  );
};
