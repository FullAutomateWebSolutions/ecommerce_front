import React, { useState } from "react";

import {
  ApiOutlined,
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  theme,
  Tooltip,
  Typography,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { handleMenu } from "./components/layout/footer.mobile";
import { useMediaQuery } from "react-responsive";
import HeaderChildren from "./components/layout/Header.mobile";
import { useAuth } from "./contexts/AuthContext";
import { loginStore } from "./store/useStore";
const { Header, Footer, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const App: React.FC = () => {
  const {
    token: {
      colorBgContainer,
      colorPrimary,
      colorText,
      borderRadiusLG,
      colorBgLayout,
    },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { userSing, logout } = loginStore();
  const navigate = useNavigate();
  const { Title, Paragraph, Text } = Typography;
  const ContentStyle: React.CSSProperties = {
    padding: 24,
  };

  const items: MenuProps["items"] = [
    {
      // label: "Configuração do usuário",
      key: "1",
      icon: (
        <>
          <Space align="center" size="small">
             <Avatar
                    size="default"
                    style={{ border: "2px sold #fff", background: "#fff" }}
                    icon={<UserOutlined />}
                    src={userSing?.photoURL}
                  />
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
              }}
            >
              <Title level={1} style={{ margin: 2, fontSize: 12 }}>
                {userSing?.email}
              </Title>
              <span style={{ fontWeight: "bold", fontSize: 12 }}>
                {userSing?.uid}
              </span>
            </Row>
          </Space>
        </>
      ),
    },

    {
      // label: "Permissões",
      key: "3",
      icon: (
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <Title level={1} style={{ margin: 2, fontSize: 12 }}>
            Permissões
          </Title>
          <Paragraph type="secondary" style={{ margin: 2, fontSize: 12 }}>
                {userSing?.customClaims.role.join(" / ") }
          </Paragraph>
        </Row>
      ),

      disabled: true,
    },
    {
      // label: "Permissões",
      key: "4",
      icon: (
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <Title level={1} style={{ margin: 2, fontSize: 12 }}>
            Versão
          </Title>
          <Paragraph type="secondary" style={{ margin: 2, fontSize: 12 }}>
            <Tooltip
              title="MAJOR (versão principal).MINOR (versão secundária).PATCH  (correções)"
              placement="left"
            >
              <span style={{ fontWeight: "bold", fontSize: 12 }}>1.6.0</span>
            </Tooltip>
          </Paragraph>
        </Row>
      ),

      // disabled: true,
    },
      {
      // label: "Permissões",
      key: "4",
      icon: (
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <Title level={1} style={{ margin: 2, fontSize: 12 }}>
           Sair
          </Title>
          <Paragraph type="secondary" style={{ margin: 2, fontSize: 12 }}>
            <Button type="primary" title="Sair da aplicação" icon={<ApiOutlined/>}/>
               <span style={{ fontWeight: "bold", margin: 10, fontSize: 12 }} onClick={logout}>Sair da aplicação</span>
           
          </Paragraph>
        </Row>
      ),

      // disabled: true,
    },
  ];
  const menuProps = { items };

  const handleSelect = (key: string) => {
    navigate(key);
  };

  return (
    <>
      <Layout>
        <Sider
          //  style={siderStyle}
          // trigger={null} /// botao de recolher
          // style={{ border: "solid 5px green" }}
          //  breakpoint="lg"
          // collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={220}
          collapsedWidth={80}
        >
          <div
            style={{
              height: 64,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              background: colorPrimary,
              color: "#fff",
              transition: "all 0.3s ease",
            }}
          >
            <img
              src="/logo2.png"
              alt="Logo"
              style={{
                width: 60,
                height: 50,
                marginRight: collapsed ? 0 : 12,
                transition: "all 0.3s ease",
              }}
            />
            {!collapsed && (
              <div style={{ lineHeight: 1.2 }}>
                <Typography.Title
                  level={5}
                  style={{ color: "#fff", margin: 0 }}
                >
                  Full Automate
                </Typography.Title>
                <Typography.Text style={{ color: "#d9f4f1", fontSize: 12 }}>
                  Web Solutions
                </Typography.Text>
              </div>
            )}
          </div>

          <Menu
            onClick={(key) => handleSelect(key.key)}
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
            items={handleMenu()}
          />
        </Sider>
        <Layout>
          <Header>
            <Row
              style={{
                alignItems: "flex-end",
                // margin: 8,
                marginBottom: 10,
                padding: 0,
                borderTop: "1px solid rgba(212, 204, 204, 0.1)",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Dropdown menu={menuProps}>
                <Space align="center" size="small">
                  <Avatar
                    size="default"
                    style={{ border: "2px sold #fff", background: "#fff" }}
                    icon={<UserOutlined />}
                    src={userSing?.photoURL}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      lineHeight: 1,
                    }}
                  >
                    <Title
                      level={1}
                      style={{
                        margin: 2,
                        fontSize: 12,
                        // color: "rgba(212, 204, 204, 0.57)",
                      }}
                    >
                      {userSing?.email}
                    </Title>
                    <span style={{ fontWeight: "bold" }}></span>
                    <span style={{ fontSize: 10 }}>{userSing?.uid}</span>
                  </div>
                </Space>
              </Dropdown>
            </Row>
          </Header>
          <Content style={ContentStyle}>
            <Outlet />
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
