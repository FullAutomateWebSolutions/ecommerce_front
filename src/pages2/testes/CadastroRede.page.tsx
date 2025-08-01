import { BaseLayout } from "@/components/layout/BaseLayout";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { PageActions } from "@/components/layout/PageActions";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardTable } from "@/components/table/StandardTable";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import ModalBase from "@/components/ui/ModalBase";
import { CadastroRedeEditar } from "./CadastroRedeEditar.page";
import { CadastroRedeEditarModal } from "./CadastroRedeEditarModal.page";
export interface IRede {
  idRede: string;
  descricao: string;
}
export const mockDado: IRede[] = [
  { idRede: "012", descricao: "BRASILCARD " },
  { idRede: "012", descricao: "VOLUS " },
  { idRede: "013", descricao: "SYSDATA " },
  { idRede: "041", descricao: "REDECOMPRAS " },
  { idRede: "071", descricao: "ECXCARD " },
  { idRede: "073", descricao: "GETNET " },
  { idRede: "086", descricao: "VALESHOP " },
  { idRede: "090", descricao: "GWCEL " },
  { idRede: "094", descricao: "NEUS " },
  { idRede: "095", descricao: "CREDI-SHOP " },
  { idRede: "102", descricao: "CIELO " },
  { idRede: "103", descricao: "REDE " },
  { idRede: "105", descricao: "REDESOFTNEX " },
  { idRede: "108", descricao: "GETNETLAC " },
  { idRede: "109", descricao: "USECRED " },
  { idRede: "113", descricao: "SISCRED " },
  { idRede: "146", descricao: "TELENET " },
  { idRede: "157", descricao: "TICKETLOG " },
  { idRede: "158", descricao: "TODO-CARTOES " },
  { idRede: "160", descricao: "PAGBANK " },
  { idRede: "170", descricao: "SEICON " },
  { idRede: "172", descricao: "SENFF-EMV " },
  { idRede: "173", descricao: "ALGORIX-EMV " },
  { idRede: "176", descricao: "SOLUCARD " },
  { idRede: "057", descricao: "BANESE " },
  { idRede: "174", descricao: "BKBANK " },
  { idRede: "075", descricao: "FIC " },
  { idRede: "164", descricao: "PICPAY " },
  { idRede: "028", descricao: "UPBRASIL " },
  { idRede: "165", descricao: "RAPPI " },
  { idRede: "177", descricao: "STIX SNC " },
  { idRede: "045", descricao: "INCOMM " },
];
const CadastroRede = () => {
  const [data, setData] = useState<IRede[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({ descricao: "", idRede: "" });
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);

  const [redeSelecionada, setRedeSelecionada] = useState<{
    idRede: string;
    descricao: string;
  } | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    handleBuscar();
  }, []);
  const handleBuscar = () => {
    setLoading(true);
    setTimeout(() => {
      let resultado = mockDado;

      if (filtros.descricao) {
        resultado = resultado.filter((p) =>
          p.descricao.toLowerCase().includes(filtros.descricao.toLowerCase())
        );
      }

      if (filtros.idRede) {
        resultado = resultado.filter((p) => p.idRede === filtros.idRede);
      }

      setData(resultado);
      setLoading(false);
    }, 500); // simula requisição
  };

  const handleInputChange = (changedValues: any) => {
    setFiltros((prev) => ({ ...prev, ...changedValues }));
  };

  const handleAtualizar = () => {
    handleBuscar();
  };

  const handleEditar = (id: string, descricao: string) => {
    navigate(`/rede/${id}/${descricao}`);
  };

  const abrirModalComRede = (rede: { idRede: string; descricao: string }) => {
    setRedeSelecionada(rede);
    setOpen(true);
  };

  const handleCreate = () => {
    navigate(`/rede/create`);
  };

  const columns: ColumnsType<IRede> = [
    { title: "Descrição", dataIndex: "descricao", key: "descricao" },
    { title: "Código de rede", dataIndex: "idRede", key: "idRede" },
    {
      title: "Ações",
      key: "acoes",
      // render: (_, record) =><PageActions onEdit={() => handleEditar(record.idRede, record.descricao)}/> ,
      render: (_, record) => (
        <PageActions 
          onEdit={() =>
            abrirModalComRede({
              idRede: record.idRede,
              descricao: record.descricao,
            })
          }
        />
      ),
    },
  ];

  return (
    <BaseLayout
      title={"Cadastro de rede"}
      breadcrumb={["Gestão de processos", "Cadastro de rede"]}
      actions={
        <PageActions
          onCreate={() => handleCreate()}
          onRefresh={handleAtualizar}
          onExcel={() => alert("Download Excel.........")}
        />
      }
    >
      <SectionCard title="Filtros de Busca">
        <Form layout="vertical" onValuesChange={handleInputChange}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Buscar por descrição" name="descricao">
                <Input placeholder="Ex: CIELO" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Código de rede" name="idRede">
                <Input placeholder="Ex: 030" allowClear />
                {/* <Select placeholder="Todas" allowClear>
                  {categoriasMock.map(cat => (
                    <Select.Option key={cat} value={cat}>
                      {cat}
                    </Select.Option>
                  ))}
                </Select> */}
              </Form.Item>
            </Col>
            <Col span={8} style={{ display: "flex", alignItems: "flex-end" }}>
              <Space>
                <Button
                  onClick={handleBuscar}
                  className="ant-btn ant-btn-primary"
                >
                  Filtrar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </SectionCard>
      <SectionCard title="Redes cadastradas">
        <StandardTable
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total) => `Total de registros: ${total}`,
            onShowSizeChange: (_, size) => setPageSize(size),
          }}
        />
      </SectionCard>
      <ModalBase
        open={open}
        title="Detalhes da Rede"
        onCancel={() => setOpen(false)}
      >
        {redeSelecionada && (
          <CadastroRedeEditarModal
            idRede={redeSelecionada.idRede}
            descricao={redeSelecionada.descricao}
            onSave={(valores) => {
              console.log("Valores preenchidos:", valores);
              setOpen(false); // fecha modal
            }}
          />
        )}
      </ModalBase>
    </BaseLayout>
  );
};

export default CadastroRede;
