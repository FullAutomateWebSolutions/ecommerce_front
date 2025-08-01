import { Modal } from "antd";
import { ReactNode } from "react";

interface ModalBaseProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  width?: number;
  footer?: ReactNode;
}

const ModalBase = ({
  open,
  title,
  children, 
  onOk,
  onCancel,
  okText = "Salvar",
  cancelText = "Cancelar",
  confirmLoading = false,
  width,
  footer,
}: ModalBaseProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      width={width === undefined ? 600 : width}
      footer=""
      destroyOnClose
    >
     <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px", 
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </Modal>
  );
};

export default ModalBase;
