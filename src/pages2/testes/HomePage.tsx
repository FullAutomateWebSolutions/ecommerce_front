import { useUserStore } from "@/store/useUserStore";
import { Card, Typography } from "antd";
const { Title, Paragraph } = Typography;

const HomePage = () => {

  const setUsuario = useUserStore((state) => state.setUsuario);
        setUsuario({ nome: "Alex Lima", matricula: "634196" });


  return (
    <Card>
      <Title level={2}>Bem-vindo ao Portal GPA Monitoramento de Integrações</Title>
      <Paragraph>
        Utilize o menu lateral para navegar entre as funcionalidades.
      </Paragraph>
    </Card>
  );
};

export default HomePage;
