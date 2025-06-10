
import { Card } from "antd";

export const SectionCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      style={{
        marginBottom: 24,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </Card>
  );
};
