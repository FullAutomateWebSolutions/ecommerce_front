import { useState } from "react";
import { Table, Button, Tag, Modal, message } from "antd";
import { EyeOutlined, ReloadOutlined } from "@ant-design/icons";

const dadosMock = [
  {
    id: "F001",
    tipo: "Integração SAP",
    data: "2025-05-29 10:22",
    status: "Erro",
    detalhe: "Campo X inválido na mensagem XML enviada para o SAP."
  },
  {
    id: "F002",
    tipo: "Integração CRM",
    data: "2025-05-28 15:10",
    status: "Pendente",
    detalhe: "Erro de conexão com o servidor externo."
  },
];

export default function FalhasLista() {
  const [falhaSelecionada, setFalhaSelecionada] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const abrirDetalhes = (falha: any) => {
    setFalhaSelecionada(falha);
  };

  const reprocessar = (falha: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(`Falha ${falha.id} reprocessada com sucesso`);
    }, 1500);
  };

  const colunas = [
    { title: "ID", dataIndex: "id", key: "id" },
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
      render: (_: any, falha: any) => (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={() => abrirDetalhes(falha)}
            style={{ marginRight: 8 }}
          >
            Ver
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => reprocessar(falha)}
            loading={loading}
            type="primary"
            danger
          >
            Reprocessar
          </Button>
        </>
      )
    }
  ];

  return (
    <>
      <h2>Falhas na Integração</h2>
      <Table
        dataSource={dadosMock}
        columns={colunas}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={`Detalhes da Falha ${falhaSelecionada?.id}`}
        open={!!falhaSelecionada}
        onCancel={() => setFalhaSelecionada(null)}
        footer={null}
      >
        <p><strong>Tipo:</strong> {falhaSelecionada?.tipo}</p>
        <p><strong>Status:</strong> {falhaSelecionada?.status}</p>
        <p><strong>Data:</strong> {falhaSelecionada?.data}</p>
        <p><strong>Detalhes:</strong></p>
        <p>{falhaSelecionada?.detalhe}</p>
      </Modal>
    </>
  );
}
