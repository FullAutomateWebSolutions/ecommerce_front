import { BaseLayout } from "@/components/layout/BaseLayout";
import { StandardTable } from "@/components/table/StandardTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Collapse, Space, Table, Tag, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
const { Title } = Typography;
const { Panel } = Collapse;

const FalhasRecente = () => {
    const navigate = useNavigate();
 const falhasRecentes = [
    {
      id: "GRP001",
      sistema: "SAP",
      tipo: "Erro de autenticação",
      data: "Hoje, 10:24",
      status: "crítico",
      detalhe: "Token inválido ao tentar acessar o módulo de vendas",
    },
    {
      id: "GRP002",
      sistema: "NCR ",
      tipo: "Timeout na requisição",
      data: "Ontem, 15:42",
      status: "aviso",
      detalhe: "A API demorou mais de 30 segundos para responder",
    },
    {
      id: "GRP003",
      sistema: "White Label",
      tipo: "Formato inválido",
      data: "27/05, 18:20",
      status: "normal",
      detalhe: "Campo `valorTotal` veio com vírgula em vez de ponto",
    },
  ];
 const statusTag = (status: string) => {
    switch (status) {
      case "crítico":
        return <Tag color="red">Crítico</Tag>;
      case "aviso":
        return <Tag color="orange">Aviso</Tag>;
      default:
        return <Tag color="blue">Info</Tag>;
    }
  };
    const handleVerMais = (id: string) => {
    navigate(`/falhas/${id}`);
  };

  return (
    <BaseLayout
      title={"Falhas recente"}
      breadcrumb={["Análise de Falhas", "Falhas recente"]}
    >
      <SectionCard title="">
         <Collapse accordion>
              {falhasRecentes.map((falha) => (
                <Panel
                  key={falha.id}
                  header={
                    <Space>
                      <strong>{falha.sistema}</strong>
                      <span>- {falha.tipo}</span>
                      {statusTag(falha.status)}
                    </Space>
                  }
                >
                  <p><strong>Data:</strong> {falha.data}</p>
                  <p><strong>Detalhe:</strong> {falha.detalhe}</p>
                  <Button
                    type="primary"
                    onClick={() => handleVerMais(falha.id)}
                  >
                    Ver mais
                  </Button>
                </Panel>
              ))}
            </Collapse>
      </SectionCard>
    </BaseLayout>
  );
};

export default FalhasRecente;
