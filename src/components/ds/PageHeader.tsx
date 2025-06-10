
import { Button, Space, Typography, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  breadcrumb?: string[];
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, breadcrumb, actions }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 24 }}>
      {breadcrumb && (
        <Breadcrumb
          items={breadcrumb.map((b, i) => ({
            title: b,
            onClick: i < breadcrumb.length - 1 ? () => navigate("/") : undefined,
          }))}
          style={{ marginBottom: 8 }}
        />
      )}
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Typography.Title level={3}>{title}</Typography.Title>
        {actions}
      </Space>
    </div>
  );
};
