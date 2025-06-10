import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Tag,
  Collapse,
  Button,
  Space,
  Progress,
  Alert,
  Select,
  DatePicker,
} from "antd";
import {
  SyncOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import { useUserStore } from "@/store/useUserStore";

const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const HomePageUser = () => {
  const navigate = useNavigate();
  const usuario = useUserStore((state) => state.usuario);

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

  const dadosFalhasPorDia = [
    { dia: "Seg", falhas: 2 },
    { dia: "Ter", falhas: 3 },
    { dia: "Qua", falhas: 1 },
    { dia: "Qui", falhas: 4 },
    { dia: "Sex", falhas: 2 },
    { dia: "Sáb", falhas: 0 },
    { dia: "Dom", falhas: 1 },
  ];

  const dadosFalha = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
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
    <>
      <Title level={2}>👋 Bem-vindo, {usuario?.nome}</Title>
  {/* KPIs principais */}
      <Row gutter={[16, 16]}>
          <Col span={24}>
          <Card title="Saúde Geral das Integrações">
            <Progress percent={82} status="active" strokeColor="#52c41a" />
            <Alert message="Serviço SAP está instável" type="error" showIcon style={{ marginTop: 16 }} />
          </Card>
        </Col>
        {/* <Col span={24}>
          <Card title="Filtros">
            <Space wrap>
              <Select defaultValue="prod" style={{ width: 160 }}>
                <Option value="prod">Produção</Option>
                <Option value="hml">Homologação</Option>
                <Option value="dev">Desenvolvimento</Option>
              </Select>
              <DatePicker.RangePicker />
            </Space>
          </Card>
        </Col> */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total de Integrações"
              value={125}
              prefix={<SyncOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Falhas Detectadas"
              value={7}
              prefix={<WarningOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Erros Críticos"
              value={3}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Taxa de Sucesso"
              value="94.2%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>
      {/* Indicadores adicionais */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Última falha registrada"
              value="Hoje, 10:24"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Integrações Ativas"
              value={18}
              prefix={<DeploymentUnitOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        {/* <Col xs={24} sm={24} md={8}>
          <Card title="Distribuição de falhas por ambiente">
            <p>SAP</p>
            <Progress percent={65} status="exception" />
            <p>WHITE LABEL</p>
            <Progress percent={25} status="active" />
            <p>SIAC</p>
            <Progress percent={10} />
          </Card>
        </Col> */}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        
        {/*Saude geral das integrações  https://recharts.org/en-US/examples/MixBarChart*/}
      

        <Col span={24}>
        <Card>
          <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dadosFalha}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
          <Bar dataKey="uv" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
        </Card>
          <Card title="Falhas por Dia">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dadosFalhasPorDia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="falhas" stroke="#ff4d4f" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
          {/* Falhas Recentes */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Falhas Recentes">
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
                  style={{
                    borderLeft: `4px solid ${
                      falha.status === "crítico"
                        ? "#ff4d4f"
                        : falha.status === "aviso"
                        ? "#faad14"
                        : "#1890ff"
                    }`,
                  }}
                >
                  <p>
                    <strong>Data:</strong> {falha.data}
                  </p>
                  <p>
                    <strong>Detalhe:</strong> {falha.detalhe}
                  </p>
                  <Button type="primary" onClick={() => handleVerMais(falha.id)}>
                    Ver mais
                  </Button>
                </Panel>
              ))}
            </Collapse>
            <div style={{ textAlign: "right", marginTop: 16 }}>
              <Button type="link" onClick={() => navigate("/falhas")}>
                Ver todas as falhas →
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomePageUser;
