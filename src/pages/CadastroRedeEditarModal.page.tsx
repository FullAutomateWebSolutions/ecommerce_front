import { BaseLayout } from "@/components/layout/BaseLayout";
import { PageActions } from "@/components/layout/PageActions";
import { IRedeFormValues, RedeForm } from "@/components/Rede/RedeForm";
import { SectionCard } from "@/components/ui/SectionCard";
import { Input, Col, Form, message, Button } from "antd";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface CadastroRedeEditarModalProps {
  values: IRedeFormValues,
  onSave?: (values: IRedeFormValues) => void;
}

export const CadastroRedeEditarModal: React.FC<CadastroRedeEditarModalProps> = ({ values,onSave }) => {
  const navigate = useNavigate();
  const isEdit = !!values.idRede;
  const handleSubmit = async (values: IRedeFormValues) => {
    try {
      // Simula request
      await new Promise((res) => setTimeout(res, 1000));

      message.success(isEdit ? "Rede atualizada!" : "Rede criada!"); 
      navigate("/10");
      if (onSave) onSave({...values, }); 
    } catch (err) {
      message.error("Erro ao salvar rede");
    }
  };
  return (
    <BaseLayout
      title={isEdit ? "Editar rede" : "Nova rede"}
      breadcrumb={[
        "Gestão de processos",
        "Cadastro de rede",
        isEdit ? "Editar" : "Novo",
      ]}
    >
      <SectionCard  title="">

        <RedeForm title={isEdit ? "Editar rede" : "Nova rede"} initialValues={ !isEdit ? {descricao: '', idRede: '', listBandeira:[{descricaoBandeira: '', idBandeira: ''}]}:values } onSubmit={handleSubmit}/>
        
      </SectionCard>
   </BaseLayout>
  );
};


