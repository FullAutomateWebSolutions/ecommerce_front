
import { Button, Tooltip } from "antd";
import { ReactNode } from "react";

interface ActionButtonProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export const ActionButton = ({ title, icon, onClick, danger }: ActionButtonProps) => {
  return (
    <Tooltip title={title}>
      <Button
        icon={icon}
        onClick={onClick}
        danger={danger}
        type="text"
        size="small"
      />
    </Tooltip>
  );
};
