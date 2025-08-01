import { useState } from "react";
import {
  Menu,
  Drawer,
  Button,
  Grid,
  Col,
  Row,
  Divider,
  List,
  Avatar,
  Dropdown,
  MenuProps,
  Typography,
} from "antd";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { loginStore } from "@/store/useStore";
import { IconApp } from "../ui/iconApp";
import { useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;

// const formatToBRDateTime = (
//   dateInput: Date | string | null | undefined
// ): string => {
//   if (!dateInput) return "Data não disponível";

//   const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
//   if (isNaN(date.getTime())) return "Data inválida";

//   const pad = (n: number) => n.toString().padStart(2, "0");

//   const day = pad(date.getDate());
//   const month = pad(date.getMonth() + 1);
//   const year = date.getFullYear();
//   const hours = pad(date.getHours());
//   const minutes = pad(date.getMinutes());
//   const seconds = pad(date.getSeconds());

//   return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
// };

const HeaderChildren = () => {
  const navigate = useNavigate();
  const { userSing, logout } = loginStore();
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: "",
      key: "1",
      icon: userSing?.email && (
        <List style={{ width: 300, margin: 10 }}>
          <List.Item.Meta
            avatar={<Avatar src={userSing.photoURL} />}
            title={userSing.email}
            description={
              userSing.emailVerified ? "Verificado" : "Não verificado"
            }
          />
        </List>
      ),
    },
    {
      label: "Configuração do usuário",
      key: "2",
      icon: (
        <Button
          title="Menu"
          type="text"
          icon={<IconApp iconKey="Servicos" />}
          onClick={showDrawer}
          style={{
            borderBottom: "none",
            background:
              "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
          }}
        />
      ),
    },
    {
      label: "Sair",
      key: "3",
      icon: (
        <Button
          title="Sair"
          type="text"
          icon={<IconApp iconKey="Sair" />}
          onClick={handleLogout}
          style={{
            borderBottom: "none",
            background:
              "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
          }}
        />
      ),
    },
  ];

  const menuProps = { items };

  const ModalUser = () => (
    <Drawer
      width={640}
      placement="right"
      onClose={onClose}
      open={visible} // Antd v5 usa `open` ao invés de `visible`
      title="Perfil do usuário"
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <List.Item.Meta
            avatar={<Avatar size={64} src={userSing?.photoURL} />}
            title={userSing?.email}
            description={
              userSing?.emailVerified ? "Verificado" : "Não verificado"
            }
          />
        </Col>

        <Col span={12}>
          <Typography.Text strong>UID</Typography.Text>
          <div>{userSing?.uid}</div>
        </Col>

        <Col span={24}>
          <Typography.Text strong>Status</Typography.Text>
          <div>{userSing?.disabled ? "Desativado" : "Ativo"}</div>
        </Col>

        <Col span={12}>
          <Typography.Text strong>E-mail Verificação</Typography.Text>
          <div>{userSing?.emailVerified ? "Sim" : "Não"}</div>
        </Col>

        <Col span={24}>
          <Typography.Text strong>Provedor de Login</Typography.Text>
          <div>
            {userSing?.providerData?.map((p) => p.providerId).join(", ") ||
              "Desconhecido"}
          </div>
        </Col>

        <Col span={24}>
          <Typography.Text strong>Funções</Typography.Text>
          <div>
            {userSing?.customClaims?.role?.join(" / ") || "Não informado"}
          </div>
        </Col>

        <Col span={24}>
          <Typography.Text strong>Criado em</Typography.Text>
          <div>{userSing?.metadata?.creationTime}</div>
        </Col>

        <Col span={24}>
          <Typography.Text strong>Atualizado em</Typography.Text>
          <div>{userSing?.metadata?.lastRefreshTime}</div>
        </Col>
      </Row>

      <Divider />
      <Button
        title="Sair"
        type="text"
        icon={<IconApp iconKey="Sair" />}
        onClick={handleLogout}
        style={{
          borderBottom: "none",
          background:
            "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
        }}
        block
      />
    </Drawer>
  );

  return (
    <>
      {/* <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Logo" style={{ height: 40, marginRight: 12 }} />
        <h2 style={{ margin: 0 }}>Full Automate</h2>
      </div> */}


           {isMobile ? (
        <>
        
      <Row
        gutter={[16, 16]}
        style={{
         width: "100%",
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Col >
          <img src="" alt="" width="50" />
        </Col>
        <Col>
          <Typography.Title level={5} style={{ color: "#2a9d8f", margin: 0 }}>
            Full Automate
          </Typography.Title>
          <Row>
            <Typography.Text type="secondary">Web Solutions</Typography.Text>
            <Divider style={{ margin: 0 }} />
          </Row>
        </Col>
        <Col>
          <Button
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{
              borderBottom: "none",
              background:
                "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
            }}
          />
          {ModalUser()}
        </Col>
          </Row>
        </>
      ) : (
        <>
          <Dropdown.Button
            style={{ width: 100, justifyContent: "end" }}
            menu={menuProps}
            placement="bottom"
            icon={<UserOutlined />}
          >
            {userSing?.email || "Menu de usuário"}
          </Dropdown.Button>

          <ModalUser />
        </>
      )}
        
        

   
    </>
  );
};

export default HeaderChildren;
