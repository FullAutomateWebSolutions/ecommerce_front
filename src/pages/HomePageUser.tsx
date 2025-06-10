import { useNavigate } from "react-router-dom";
import {
  Card,
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
  Splitter,
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

const { Title, Paragraph } = Typography;

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
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
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
      {/* <Title level={2}>👋 Bem-vindo, {usuario?.nome}</Title> */}
      <Title level={2}>Portal GPA Monitoramento de Integrações </Title>
      <Paragraph>
        Utilize o menu para navegar entre as funcionalidades.
      </Paragraph>
     
      <Splitter style={{ marginBottom: 24 }}  >
        <Splitter.Panel defaultSize="25%" min="25%" max="50%" resizable={true}>
          <Card title="Saúde Geral das Integrações" extra={<Alert message="Serviço SAP está instável" type="info" showIcon style={{ marginTop: 16, width:"100%" }} />}>
             <Statistic
              title="Total de Integrações"
              value={125}
              prefix={<SyncOutlined />}
            />
            <br />
            <Card.Meta key={1} title="Taxa de Sucesso" description={<Progress  percent={85} status="active" strokeColor="#1890ff"/>} style={{color: "#1890ff"}} avatar={<><CheckCircleOutlined /></>}/>
            <Card.Meta key={2} title="Erros Críticos" description={<Progress percent={10} status="active" strokeColor="#005bac" />} style={{color: "#005bac"}} avatar={<><CloseCircleOutlined /></>}/>
            <Card.Meta key={2} title="Falhas Detectadas" description={<Progress  percent={5}  status="active" strokeColor="#001529"/>} style={{color: "#001529"}} avatar={<><WarningOutlined /></>}/>
            <br />
            <Card.Meta key={2} title="Total de Integrações" description={"7"} style={{color: "#001529"}} avatar={<><SyncOutlined /></>}/>
            <br />
            <Card.Meta key={2} title="Última falha registrada" description={"Hoje, 10:24"} style={{color: "#001529"}} avatar={<><ClockCircleOutlined /></>}/>
            <br />
            <Card.Meta key={2} title="Integrações Ativas" description={"34"} style={{color: "#001529"}} avatar={<><DeploymentUnitOutlined /></>}/>
            <br />
            <br />
            <br />
           </Card>
        </Splitter.Panel>
        <Splitter.Panel>
        <Card title="Falhas por Dia">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dadosFalhasPorDia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="falhas" stroke="#001529" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
             <Card title="Em desenvolvimento">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dadosFalha} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#1890ff" />
                <Bar dataKey="amt" stackId="a" fill="#005bac" />
                <Bar dataKey="uv" fill="#001529" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Splitter.Panel>
        
      </Splitter>
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
          <Button type="link" onClick={() => navigate("/falhas")}>Ver todas as falhas →</Button>
        </div>
      </Card>
    </>
  );
};

export default HomePageUser;
