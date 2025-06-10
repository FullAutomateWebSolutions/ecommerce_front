import { BaseLayout } from "@/components/layout/BaseLayout";
import { PageActions } from "@/components/layout/PageActions";
import { StandardTable } from "@/components/table/StandardTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardDescriptions } from "@/components/ui/StandardDescriptions";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const gruposMock = [
  {
    idMensagem: "GRP001",
    tipo: "Integração SAP",
    data: "2025-05-28 11:30",
    status: "Erro",
    falhas: [
      {
        idFalha: "001",
        descricao: "Campo & da estrutura & não pode ser inicial",
        data: "2025-05-28 11:31",
      },
      {
        idFalha: "002",
        descricao: "Venda já foi integrada",
        data: "2025-05-28 11:31",
      },
      {
        idFalha: "003",
        descricao: "Operação & não configurada",
        data: "2025-05-28 11:31",
      },
      {
        idFalha: "004",
        descricao: "Estrutura & não configurada",
        data: "2025-05-28 11:31",
      },
      {
        idFalha: "005",
        descricao: "Preenchimento da estrutura & é obrigatório para operação &",
        data: "2025-05-28 11:31",
      },
      {
        idFalha: "006",
        descricao:
          "Não é permitido o preenchimento da estrutura & para operação &",
        data: "2025-05-28 11:31",
      },
      {
        idFalha: "007",
        descricao: "Empresa & não existe. Erro estrutura &",
        data: "2025-05-28 11:31",
      },
      {
        idFalha: "008",
        descricao: "Centro & não existe. Erro estrutura &",
        data: "2025-05-28 11:31",
      },
      {
        idFalha: "009",
        descricao:
          "Sistema de PDV & não cadastrado (/YSIM/C005). Erro estrutura &",
        data: "2025-05-28 11:31",
      },
    ],
  },
  {
    idMensagem: "GRP002",
    tipo: "Integração CRM",
    data: "2025-05-27 17:45",
    status: "Pendente",
    falhas: [
      {
        idFalha: "F002-A",
        descricao: "Timeout na requisição",
        data: "2025-05-27 17:46",
      },
    ],
  },
  {
    idMensagem: "GRP003",
    tipo: "WhiteLabel",
    data: "2025-05-27 17:45",
    status: "Pendente",
    falhas: [
      {
        idFalha: "F002-A",
        descricao: "Timeout na requisição",
        data: "2025-05-27 17:46",
      },
    ],
  },
];

export const FalhasRecenteDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const falhaDetalhe = gruposMock.filter((item) => item.idMensagem === id);

  return (
    <BaseLayout
      title={`Detalhes da falha #${id}`}
      breadcrumb={["Análise de Falhas", "Falhas recente", "Detalhes"]}
      actions={
        <PageActions
          customButtons={
            <>
              <Button
                type="primary"
                onClick={() => alert(`Reprocessando mensagem ${id}`)}
              >
                Reprocessar
              </Button>
              <Button onClick={() => navigate(-1)}>Voltar</Button>
            </>
          }
        />
      }
    >
      <SectionCard title="Informações do Produto">
        <StandardDescriptions
          data={{
            idMensagem: falhaDetalhe[0].idMensagem,
            tipo: falhaDetalhe[0].tipo,
            data: falhaDetalhe[0].data,
            status: falhaDetalhe[0].status,
          }}
        />
        <StandardTable
          columns={[
            { title: "ID Falha", dataIndex: "idFalha", key: "idFalha" },
            { title: "Descrição", dataIndex: "descricao", key: "descricao" },
            { title: "Data", dataIndex: "data", key: "data" },
          ]}
          dataSource={falhaDetalhe[0].falhas}
          pagination={false}
          rowKey="idFalha"
          size="small"
        />
      </SectionCard>
    </BaseLayout>
  );
};
