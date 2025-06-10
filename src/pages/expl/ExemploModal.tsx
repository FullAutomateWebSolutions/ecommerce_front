import { useState } from "react";

import { Button } from "antd";
import ModalBase from "@/components/ui/ModalBase";

const ExemploModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>

      <ModalBase
        open={open}
        title="Detalhes do Produto"
        onCancel={() => setOpen(false)}
        onOk={() => {
          // salvar
          setOpen(false);
        }}
      >
        <p>Conteúdo do modal aqui!</p>
      </ModalBase>
    </>
  );
};

export default ExemploModal;
