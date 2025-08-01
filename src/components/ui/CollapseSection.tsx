
import { Collapse, Typography } from "antd";
import { ReactNode } from "react";

const { Panel } = Collapse;

interface CollapseSectionProps {
  sections: {
    key: string;
    title: string;
    content: ReactNode;
    showArrow?: boolean;
    extra?: ReactNode; 
  }[];
  defaultActiveKeys?: string[];
  onChange?: (activeKey: string | string[]) => void;
}

export const CollapseSection = ({
  sections,
  defaultActiveKeys = [],
  onChange,
}: CollapseSectionProps) => {
  return (
    <Collapse
      collapsible="icon"
      defaultActiveKey={defaultActiveKeys}
      expandIconPosition="end"
      onChange={onChange}
      style={{ background: "#fff", borderRadius: 6 }}
    >
      {sections.map(({ key, title, content, showArrow = true, extra }) => (
        <Panel key={key} header={<Typography.Text strong>{title}</Typography.Text>} showArrow={showArrow} extra={extra}>
          {content}
        </Panel>
      ))}
    </Collapse>
  );
};
