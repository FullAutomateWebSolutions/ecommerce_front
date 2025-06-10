import { BaseLayout } from "@/components/layout/BaseLayout";
import { TableActions } from "@/components/layout/TableActions";
import { StandardTable } from "@/components/table/StandardTable";
import { SectionCard } from "@/components/ui/SectionCard";
import SplitterBase from "@/components/ui/SplitterBase";
import { FilterOutlined, QuestionCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, FloatButton, Form, Input, message, Row, Select, Space, Table, Tag } from "antd";
import { useState } from "react";
import type { MenuProps, TableColumnsType, TableProps } from 'antd';
const { Option } = Select;
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <SectionCard title="Monitoramento de Integrações">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p><strong> Tela:</strong> Monitoramento de Integrações</p>

          <p>
            Esta tela apresenta uma visão consolidada das mensagens de integração entre sistemas
            (como SAP), com foco na identificação de erros e acompanhamento de falhas.
          </p>

          <p><strong>Funcionalidades principais:</strong></p>
          <ul style={{ paddingLeft: '1.2rem' }}>
            <li><strong>Lista de mensagens agrupadas por ID</strong>: Cada grupo exibe:
              <ul>
                <li><code>idMensagem</code></li>
                <li>Tipo de integração (SAP)</li>
                <li>Data e hora</li>
                <li>Status (Erro, Pendente, etc.)</li>
              </ul>
            </li>
            <li><strong>Exibição de falhas associadas</strong>: Detalhes como:
              <ul>
                <li><code>idFalha</code></li>
                <li>Descrição do erro</li>
                <li>Data e hora</li>
              </ul>
            </li>
          </ul>

          <p><strong>Comportamento visual:</strong></p>
          <ul style={{ paddingLeft: '1.2rem' }}>
            <li>Tabela com colunas: ID, Tipo, Data, Status, Ações</li>
            <li>Cores por status (vermelho para erro, amarelo para pendente)</li>
            <li>Expansível ou via modal para exibir falhas</li>
            <li>Filtros por tipo e status</li>
          </ul>

          <p><strong>Objetivo:</strong> Ajudar o time a visualizar e agir rapidamente sobre falhas nas integrações.</p>
        </div>
      </SectionCard>
    ),
  },
];

type Falha = {
  idFalha: string;
  descricao: string;
  data: string;
};

type Grupo = {
  idMensagem: string;
  tipo: string;
  data: string;
  status: string;
  falhas: Falha[];
};
const ReprocessarFalhas = () => {
  const [loadingGrupo, setLoadingGrupo] = useState<string | null>(null);
   const [filtros, setFiltros] = useState({ descricao: "", idRede: "" });
     const [pageSize, setPageSize] = useState<number>(10);
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
          descricao:
            "Preenchimento da estrutura & é obrigatório para operação &",
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
      idMensagem: "GRP003",
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
      idMensagem: "GRP004",
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
      idMensagem: "GRP005",
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
      idMensagem: "GRP006",
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
      idMensagem: "GRP007",
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
  ];

  const rowSelection: TableProps<Grupo>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Grupo[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
  const colunas = [
    { title: "ID Mensagem", dataIndex: "idMensagem", key: "idMensagem" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Data da Registro", dataIndex: "data", key: "data" },
    { title: "Data de Reenvio", dataIndex: "data", key: "data" },
    { title: "Data da Integração", dataIndex: "data", key: "data" },
  {
      title: "Qtd_Falhas",
      key: "falhas",
      render: (_: any, record: { falhas: string | any[]; }) => {
        return record.falhas?.length;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Erro" ? "red" : "orange"}>{status}</Tag>
      ),
    },
     {
          title: "Ações",
          key: "acoes",
          // render: (_, record) =><PageActions onEdit={() => handleEditar(record.idRede, record.descricao)}/> ,
          render: (_: any, grupo: any) => (
            <TableActions
              onJoinStatus= {false}
              onJoin={()=>("")}
              onDetail={()=>("")}
              onRefresh={()=> reprocessarGrupo(grupo.idMensagem)}
            />
          ),
        },
  ];
  const renderDetalhesFalha = (grupo: any) => (
    <Table
      columns={[
        { title: "ID Falha", dataIndex: "idFalha", key: "idFalha" },
        { title: "Descrição", dataIndex: "descricao", key: "descricao" },
        { title: "Data", dataIndex: "data", key: "data" },
      ]}
      dataSource={grupo.falhas}
      pagination={false}
      rowKey="idFalha"
      size="small"
    />
  );
  const reprocessarGrupo = (grupoId: string) => {
    setLoadingGrupo(grupoId);
    setTimeout(() => {
      setLoadingGrupo(null);
      message.success(`Grupo ${grupoId} reprocessado com sucesso`);
    }, 1200);
  };

  return (
    <BaseLayout
      title={"Reprocessar falhas"}
      versao="V 1.0.0"
      breadcrumb={["Análise de Falhas", "Reprocessar falhas"]}
      actions={
        <>
          <Space>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => alert("Reprocessando..........")}
            >
              Reprocessar todas
            </Button>
          </Space>
        </>
      }
    >
       <Dropdown menu={{items}} placement="top" arrow={{ pointAtCenter: true }}>
        <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineEnd: 24 }} />
      </Dropdown>
       <SplitterBase
        defaultActiveKey={["1"]}
        onSubmit={function (values: any): void {
          setFiltros(values)
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
                  <Form.Item label="ID Mensagem" name="idMensagem">
                    <Input placeholder="Ex: GRP001" allowClear />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Código de falha" name="idFalha">
                    <Input placeholder="Ex: 030" allowClear />
                  </Form.Item>
                </Col>
              </Row>

                <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item label="Tipo" name="tipo">
                     <Select placeholder="Selecione uma tipo" style={{width: '100%'}} allowClear>
                            {[{decricao: "Integração SAP"},{ decricao: "Integração WhiteLabel"}].map((e, index)=>(
                                 <Option value={index}>{e.decricao}</Option>
                            ))}
                            </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Status" name="status">
                       <Select placeholder="Selecione uma rede" style={{width: '100%'}} allowClear>
                            {[{id: 1, decricao: "Falha"},{id: 2, decricao: "Reprocessamento"}].map((e)=>(
                                 <Option value={e.id}>{e.decricao}</Option>
                            ))}
                            </Select>
                  </Form.Item>
                </Col>
              </Row>
              </>
            ),
          },
        ]}
        SplitterBasePainelTable={
     <SectionCard title="Registros">
        <StandardTable
          dataSource={gruposMock}
          columns={colunas}
          expandable={{ expandedRowRender: renderDetalhesFalha }}
          rowKey="idMensagem"
          pagination={{
                pageSize: pageSize,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
                showTotal: (total) => `Total de registros: ${total}`,
                onShowSizeChange: (_, size) => setPageSize(size),
              }}
               rowSelection={{  ...rowSelection }}
        />
      </SectionCard>
        }
      />
      
    </BaseLayout>
  );
};

export default ReprocessarFalhas;
