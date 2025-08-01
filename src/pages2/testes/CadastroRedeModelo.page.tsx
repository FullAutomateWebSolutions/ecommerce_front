import { BaseLayout } from "@/components/layout/BaseLayout";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { PageActions } from "@/components/layout/PageActions";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardTable } from "@/components/table/StandardTable";
import {
  Button,
  Col,
  Collapse,
  Dropdown,
  Flex,
  FloatButton,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Splitter,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import ModalBase from "@/components/ui/ModalBase";
import { CadastroRedeEditar } from "./CadastroRedeEditar.page";
import { CadastroRedeEditarModal } from "./CadastroRedeEditarModal.page";
import {
  CaretRightOutlined,
  CreditCardOutlined,
  FilterOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { TableActions } from "@/components/layout/TableActions";
import DrawerBase from "@/components/ui/DrawerBase";
import { IRedeFormValues, RedeForm } from "@/components/Rede/RedeForm";
const { Panel } = Collapse;
export interface IRede {
  idVinculado?: string;
  idRede: string;
  descricao: string;
  listBandeira?: IListBandeiraFormValues[];
  date_create?: string;
  date_update?: string;
}
export interface IListBandeiraFormValues {
  idBandeira: string;
  descricaoBandeira: string;
  date_create?: string;
  date_update?: string;
}
export const dados: IRede[] = [
  {
    idRede: "012",
    descricao: "BRASILCARD ",
    idVinculado: "",
    listBandeira: [
      { descricaoBandeira: "CIELO ALIMENTAÇÃO", idBandeira: "015" },
    ],
    date_create: "02/06/2025 10:00",
    date_update: "03/06/2025 11:50",
  },
  {
    idRede: "015",
    descricao: "VOLUS ",
    listBandeira: [
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "016",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "017",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "018",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "019",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "020",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "021",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
    ],
    date_create: "02/06/2025 10:00",
    date_update: "02/06/2025 10:00",
  },
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

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: "100%" }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{ whiteSpace: "nowrap" }}
    >
      {props.text}
    </Typography.Title>
  </Flex>
);
import type { MenuProps, TableProps } from "antd";
import CadastroRedeModeloDetalhe from "./CadastroRedeModeloDetalheProp.page";
import SplitterBase from "@/components/ui/SplitterBase";
import { StandardDescriptionsForm } from "@/components/ui/StandardDescriptions";
import { StandardForm } from "@/components/form/StandardForm";
import { dataHoraAtualFormato } from "@/utils/dataSistem";
type OnChange = NonNullable<TableProps<IRede>["onChange"]>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const CadastroRedeModelo = () => {
  const [mockDado, setDados] = useState<IRede[]>([...dados]);
  const [data, setData] = useState<IRede[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    descricao: "",
    idRede: "",
    idVinculo: "",
  });
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState(false);
  const [openDetalhes, setOpenDetalhes] = useState(false);
  const [pageSize, setPageSize] = useState<number>(8);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [novoID, setNovoID] = useState("");
  const [redeSelecionada, setRedeSelecionada] = useState<IRede | null>(null);
  const [viewId, setViewId] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleBuscar();
  }, [filtros, redeSelecionada, mockDado]);

  const abrirModalIdSap = (registro: IRede) => {
    if (registro.listBandeira?.length) {
      setRedeSelecionada(registro);
      setNovoID(novoID);
      setOpenId(true);
    } else {
      message.error("Cadastrar bandeira para poder vicular Id Sap (SIM)");
    }
  };

  const confirmarVinculo = () => {
    if (!novoID.trim()) {
      message.warning("Informe um ID válido para vincular.");
      return;
    }
    const idJaVinculado = mockDado.some(
      (item) =>
        item.idVinculado === novoID && item.idRede !== redeSelecionada?.idRede
    );

    if (idJaVinculado) {
      message.error("Este ID já está vinculado a outro registro.");
      return;
    }
    setDados((prev) =>
      prev.map((item) =>
        item.idRede === redeSelecionada?.idRede
          ? { ...item, idVinculado: novoID }
          : item
      )
    );

    setOpenId(false);
    message.success("ID vinculado com sucesso!");
  };
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

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
      if (filtros.idVinculo) {
        resultado = resultado.filter(
          (p) => p.idVinculado === filtros.idVinculo
        );
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

  const handleEditar = (registro: IRede) => {
    setDados((prev) =>
      prev.map((item) =>
        item.idRede === registro?.idRede
          ? {
              ...registro,
              date_create: "01/06/2025 10:00",
              date_update: `${dataHoraAtualFormato()}`,
            }
          : item
      )
    );
  };

  const abrirModalComRede = (rede: IRede) => {
    setRedeSelecionada(rede);
    setOpen(true);
  };

  const handleDetalhes = (rede: IRede) => {
    setOpenDetalhes(true);
    setRedeSelecionada(rede);
  };

  const handleCreate = () => {
    navigate(`/rede/create`);
  };

  const columns: ColumnsType<IRede> = [
    {
      title: "Id Sap (SIM)",
      dataIndex: "idVinculado",
      key: "idVinculado",
      render: (_, record) => record.idVinculado || <em>Não vinculado</em>,
    },
    {
      title: "Código de rede",
      dataIndex: "idRede",
      key: "idRede",
      ellipsis: true,
      sortOrder: sortedInfo.columnKey === "idRede" ? sortedInfo.order : null,
    },
    { title: "Descrição rede", dataIndex: "descricao", key: "descricao" },
    {
      title: "Qtd_Bandeiras",
      key: "idBandeira",
      render: (_, record) => {
        return record.listBandeira?.length;
      },
    },
    // { title: "Descrição bandeira", dataIndex: ['listBandeira', '0', 'descricaoBandeira'], key: "descricaoBandeira" },
    { title: "Data de criação", dataIndex: "date_create", key: "date_create" },
    {
      title: "Data de atualização",
      dataIndex: "date_update",
      key: "date_update",
    },
    {
      title: "Ações",
      key: "acoes",
      // render: (_, record) =><PageActions onEdit={() => handleEditar(record.idRede, record.descricao)}/> ,
      render: (_, record) => (
        <TableActions
          onDetail={() => {
            handleDetalhes(record);
          }}
          onJoinStatus={viewId}
          onJoin={() => abrirModalIdSap(record)}
          onExcel={() => {
            showDrawer();
          }}
          onDelete={() => {}}
          onEdit={() => abrirModalComRede({ ...record })}
        />
      ),
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: "Editar",
      key: "1",
    },
    {
      label: "Deletar",
      key: "2",
    },
    {
      label: "Colar",
      key: "3",
    },
      {
      label: "Vincular",
      key: "3",
    },
  ];

  return (
    <BaseLayout
      versao="V 1.4.0" /// MAJOR (versão principal).MINOR (versão secundária).PATCH  (correções)
      title={"Cadastro de Rede /Bandeira /Associar SAP(SIM)"}
      breadcrumb={["Gestão de processos", "Cadastro de rede"]}
      actions={
        <PageActions
          createText="Cadastrar nova Rede"
          // onCreate={() => handleCreate()}

          onCreate={() => showDrawer()}
          onRefresh={() => handleCreate()}
          returnText="Cadastrar Rede"
          // onRefresh={handleAtualizar}
          // onExcel={() => alert("Download Excel.........")}
        />
      }
    >
      <Dropdown menu={{ items }} trigger={["contextMenu"]}>
        <div>
          <SplitterBase
            defaultActiveKey={["1"]}
            onSubmit={function (values: any): void {
              setFiltros(values);
            }}
            SplitterBasePainelFilter={[
              {
                extra: <FilterOutlined />,
                header: <Space>Filtro Avançado </Space>,
                key: "1",
                childrenFormItem: (
                  <>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item label="Descrição" name="descricao">
                          <Input placeholder="Ex: CIELO" allowClear />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Código de rede" name="idRede">
                          <Input placeholder="Ex: 030" allowClear />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Col span={12}>
                      <Form.Item label="Id sap (Sim)" name="idVinculo">
                        <Input placeholder="Ex: 1000" allowClear />
                      </Form.Item>
                    </Col>
                  </>
                ),
              },
            ]}
            SplitterBasePainelTable={
              <SectionCard
                title="Redes cadastradas"
                extra={
                  <PageActions
                    excelText="Gerar excel"
                    onExcel={() => {
                      message.info("Excel em andamento.......");
                    }}
                  />
                }
              >
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
            }
          />
        </div>
      </Dropdown>
      <ModalBase
        footer=""
        open={open}
        // title="Detalhes da Rede"
        width={700}
        onCancel={() => setOpen(false)}
      >
        {redeSelecionada && (
          <CadastroRedeEditarModal
            //@ts-ignore
            values={redeSelecionada}
            onSave={(valores) => {
              handleEditar(valores);
              // console.log("Valores preenchidos:", valores);
              setOpen(false); // fecha modal
            }}
          />
        )}
      </ModalBase>

      <ModalBase
        open={openDetalhes}
        width={800}
        onCancel={() => setOpenDetalhes(false)}
        footer=""
      >
        {redeSelecionada && (
          <CadastroRedeModeloDetalhe
            //@ts-ignore
            values={redeSelecionada}
            // onSave={(valores) => {
            //   console.log("Valores preenchidos:", valores);
            //   setOpen(false); // fecha modal
            // }}
          />
        )}
      </ModalBase>

      <Modal
        open={openId}
        title={`Vincular ID ao registro [${redeSelecionada?.idRede}] ${redeSelecionada?.descricao}`}
        onOk={confirmarVinculo}
        onCancel={() => setOpenId(false)}
        okText="Vincular"
        footer={true}
        destroyOnHidden
      >
        <Space direction="horizontal">
          <Col>
            <Input
              suffix={<CreditCardOutlined />}
              disabled
              value={redeSelecionada?.idRede}
            />
          </Col>
          <SwapOutlined />
          <Col>
            <Input
              name="id"
              suffix={<FormOutlined />}
              addonAfter={
                <PageActions onJoin={confirmarVinculo} onJoinText="Vincular" />
              }
              placeholder="Digite o ID para vincular"
              onChange={(e) => setNovoID(e.target.value)}
            />
          </Col>
        </Space>
      </Modal>

      <DrawerBase
        open={openDrawer}
        title="Cadastro de Rede / Bandeira."
        onCancel={() => setOpenDrawer(false)}
        onOk={() => {
          // salvar dados
        }}
        footer={false}
      >
        <RedeForm
          title="Cadastro"
          onSubmit={function (values: IRedeFormValues): void {
            console.log(values);
          }}
        />
      </DrawerBase>
    </BaseLayout>
  );
};

export default CadastroRedeModelo;
