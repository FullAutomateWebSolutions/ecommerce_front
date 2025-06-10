import { Drawer, Space, Button, Row, Col } from "antd";
import React, { ReactNode } from "react";

interface DrawerBaseProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  width?: number;
  footer?: ReactNode;
  extra?: ReactNode;
}
interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}
const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const DrawerBase: React.FC<DrawerBaseProps> = ({
  open,
  title,
  children,
  onOk,
  onCancel,
  okText = "Salvar",
  cancelText = "Cancelar",
  confirmLoading = false,
  width = 600,
  footer,
  extra
}) => {
  const defaultFooter = (
    <Space style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={onCancel}>{cancelText}</Button>
      <Button
        type="primary"
        onClick={onOk}
        loading={confirmLoading}
      >
        {okText}
      </Button>
    </Space>
  );

  return (
    <Drawer
    extra={extra}
    destroyOnClose
      title={title}
      width={width}
      placement="right"
      closable
      onClose={onCancel}
      open={open}
      footer={footer !== undefined ? footer : (onOk || onCancel ? defaultFooter : null)}
    >
      {children}
          {/* <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
        </Row>
        <Row></Row> */}
    </Drawer>
  );
};

export default DrawerBase;
