import { ProdutoForm, ProdutoFormValues } from "@/components/produto/ProdutoForm";
import { RedeForm } from "@/components/Rede/RedeForm";
import { SectionCard } from "@/components/ui/SectionCard";
import { message } from "antd";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { ProdutoFormC } from "@/components/produto/ProdutoFormC";
import { Produto } from "@/types/Produto";

interface ProductListEditarModalProps {
  id: string,
  values: Produto,
  onSave?: (values: Produto) => void;
}

export const ProductListEditarModalProps: React.FC<ProductListEditarModalProps> = ({ id,values,onSave }) => {
  const navigate = useNavigate();
  const isEdit = !!values.id;
  const handleSubmit = async (values: Produto) => {
    
    try {
      await setDoc(doc(db, "webBase", id), {
        ...values
      });
           message.success("Documento substituído com sucesso!"); 
      navigate("/0");
       if (onSave) onSave({...values}); 
    } catch (e) {
      message.error("Erro ao substituir documento:", 5); 
    }
    
  };
  return (
    <BaseLayout
      title={''}
      breadcrumb={[
        "Gestão produtos",
        "Cadastro",
        isEdit ? "Editar" : "Novo",
      ]}
    >
      <SectionCard  title="">

        <ProdutoFormC initialValues={values} onSubmit={function (values: Produto): void {
          handleSubmit(values)
        } } />
        
        
      </SectionCard>
   </BaseLayout>
  );
};


