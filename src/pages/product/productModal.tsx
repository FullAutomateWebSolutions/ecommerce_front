import React from "react";
import { Modal } from "antd";
import { Product } from "@/types/type";
import { ProductForm } from "@/components/form/ProductForm";


interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Product) => void;
  initialValues?: Product;
  loading?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  onSave,
  initialValues,
  loading = false,
}) => {
  return (
    <Modal
      title={initialValues ? "Editar Produto" : "Novo Produto"}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={800}
    >
      <ProductForm
        initialValues={initialValues}
        onSubmit={(values) => {
          onSave({...values, id: initialValues?.id});
          onClose();
        }}
        loading={loading}
      />
    </Modal>
  );
};
