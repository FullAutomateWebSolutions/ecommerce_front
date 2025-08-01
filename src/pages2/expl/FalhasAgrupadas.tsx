import { Table, Button, Tag, Space, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";

// Mock: grupo de falhas por ID
const gruposMock = [
  {
    idGrupo: "GRP001",
    tipo: "Integração SAP",
    data: "2025-05-28 11:30",
    status: "Erro",
    falhas: [
      {
        idFalha: "F001-A",
        descricao: "Campo X inválido no XML",
        data: "2025-05-28 11:31"
      },
      {
        idFalha: "F001-B",
        descricao: "Erro de autenticação no SAP",
        data: "2025-05-28 11:32"
      }
    ]
  },
  {
    idGrupo: "GRP002",
    tipo: "Integração CRM",
    data: "2025-05-27 17:45",
    status: "Pendente",
    falhas: [
      {
        idFalha: "F002-A",
        descricao: "Timeout na requisição",
        data: "2025-05-27 17:46"
      }
    ]
  }
];

export default function FalhasAgrupadas() {
  const [loadingGrupo, setLoadingGrupo] = useState<string | null>(null);

  const reprocessarGrupo = (grupoId: string) => {
    setLoadingGrupo(grupoId);
    setTimeout(() => {
      setLoadingGrupo(null);
      message.success(`Grupo ${grupoId} reprocessado com sucesso`);
    }, 1200);
  };

  const colunas = [
    { title: "ID Grupo", dataIndex: "idGrupo", key: "idGrupo" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Data/Hora", dataIndex: "data", key: "data" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Erro" ? "red" : "orange"}>{status}</Tag>
      )
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_: any, grupo: any) => (
        <Button
          icon={<ReloadOutlined />}
          loading={loadingGrupo === grupo.idGrupo}
          onClick={() => reprocessarGrupo(grupo.idGrupo)}
          type="primary"
          danger
        >
          Reprocessar grupo
        </Button>
      )
    }
  ];

  const renderDetalhesFalha = (grupo: any) => (
    <Table
      columns={[
        { title: "ID Falha", dataIndex: "idFalha", key: "idFalha" },
        { title: "Descrição", dataIndex: "descricao", key: "descricao" },
        { title: "Data", dataIndex: "data", key: "data" }
      ]}
      dataSource={grupo.falhas}
      pagination={false}
      rowKey="idFalha"
      size="small"
    />
  );

  return (
    <>
      <h2>Falhas Agrupadas por ID</h2>
      <Table
        dataSource={gruposMock}
        columns={colunas}
        expandable={{ expandedRowRender: renderDetalhesFalha }}
        rowKey="idGrupo"
      />
    </>
  );
}
