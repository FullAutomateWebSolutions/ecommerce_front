import React, { useState } from "react";

//@ts-ignore
import logo from "../../public/assets/gpa.svg";

import {
  DesktopOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Badge, Col, Layout, Menu, Row, Space, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem("Dashboard", "0", <PieChartOutlined />),
  // getItem("Dashboard", "1", <PieChartOutlined />),
  // getItem("Trat. Falhas", "7", <DesktopOutlined />), /// gestão de falhas, falhas e reprocessamento, trat. falha
  // getItem("Rep. de mensagens", "3", <DesktopOutlined />),
  getItem("Relatórios", "sub1", <PieChartOutlined />, [
    getItem("Dashboard", "0"),
    getItem("Lista de Associações", "945"),
   
  ]),
  getItem("Análise", "sub2", <DesktopOutlined />, [
    getItem("Falhas recente", "15"),
    getItem("Reprocessar falhas", "11"),
    getItem("Histórico de falha", "21"),
  ]),
  getItem("Gestão de processos", "sub3", <SettingOutlined />, [
    getItem("Todas Associações", "94"),
    getItem("Cadastro Rede", "67"),
    getItem("Cadastro Bandeira", "78"),
    getItem("Cadastro Rede/Bandeira/SAP", "10"),
    // getItem("Associar IDs SAP/SIM", "55"),
    // getItem("Vincular IDs SAP/SIM", "56"),
  ]),
];

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
};

const logoStyle: React.CSSProperties = {
  height: "64px",
  margin: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ContentStyle: React.CSSProperties = {
  minHeight: 360,
  padding: 24,
};

const layoutPrincipal: React.CSSProperties = {
  minHeight: "100vh",
};

const AppProt1: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    // token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSelect = (key: string) => {
    navigate(key);
  };

  return (
    <Layout>
      
      <Header style={headerStyle}>
        <div style={logoStyle}>
          <img src={logo} alt="Logo GPA" width="50" />
          
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["/dashboard"]}
          mode="horizontal"
          items={items}
          onClick={(e) => handleSelect(e.key)}
          inlineCollapsed={collapsed}
          style={{ flex: 1, minWidth: 0 }}
        />
        
        <div>
          {/* <Badge.Ribbon text={"versao"} /> */}
          <Space align="center" size="small" style={{ color: "white" }}>
            
            <Avatar size="default" icon={<UserOutlined />} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Alex Lima</span>
              <span style={{ fontSize: 12 }}>Cad: 634196</span> 
            </div>
            <LogoutOutlined style={{ cursor: "pointer", color: "white" }} />
          </Space>
          
        </div>
      </Header>
      <Content style={ContentStyle}>
        <Outlet />
      </Content>
    </Layout>
    // <Layout style={layoutPrincipal}>
    //   <Sider
    //     style={siderStyle}
    //     // trigger={null} /// botao de recolher
    //     // style={{ border: "solid 5px green" }}
    //     //  breakpoint="lg"
    //     // collapsedWidth="0"
    //     collapsible
    //     collapsed={collapsed}
    //     onCollapse={(value) => setCollapsed(value)} /// recolher menu sem nome
    //     width={220}
    //     collapsedWidth={80}
    //   >
    //     <div style={logoStyle}>
    //       <img src={logo} alt="Logo GPA" width="50" />
    //     </div>
    //     <Menu
    //       theme="dark"
    //       defaultSelectedKeys={["/dashboard"]}
    //       mode="inline"
    //       items={items}
    //       onClick={(e) => handleSelect(e.key)}
    //       inlineCollapsed={collapsed}
    //     />
    //   </Sider>

    //   <Layout>
    //     <Header style={headerStyle}>
    //       <div>
    //         <Space align="center" size="small" style={{ color: "white" }}>
    //           <Avatar size="default" icon={<UserOutlined />} />
    //           <div
    //             style={{
    //               display: "flex",
    //               flexDirection: "column",
    //               lineHeight: 1,
    //             }}
    //           >
    //             <span style={{ fontWeight: "bold" }}>Alex Lima</span>
    //             <span style={{ fontSize: 12 }}>Cad: 634196</span>
    //           </div>
    //           <LogoutOutlined style={{ cursor: "pointer", color: "white" }} />
    //         </Space>
    //       </div>
    //     </Header>
    //     <Content style={ContentStyle}>
    //       <Outlet />
    //     </Content>
    //     <Footer style={{ textAlign: "center" }}>
    //       GPA ©{new Date().getFullYear()} Created by TecdSistemas
    //     </Footer>
    //   </Layout>
    // </Layout>
  );
};

export default AppProt1;
