// iconsMap.tsx
import {
  PoweroffOutlined,
  ScanOutlined,
  InboxOutlined,
  ShopOutlined,
  SettingOutlined,
  ShoppingOutlined,
  PushpinOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { theme } from "antd";
import React, { JSX } from "react";
// const {
//   token: { colorPrimary },
// } = theme.useToken();
const iconStyle: React.CSSProperties = {
  // fontSize: 23,
  color: "#2A9D8F",
  // marginBottom: 2,
};

export const iconMap: Record<string, JSX.Element> = {
  Sair: <PoweroffOutlined style={iconStyle} />,
  Scan: <ScanOutlined style={iconStyle} />,
  Cadastro: <InboxOutlined style={iconStyle} />,
  Loja: <ShopOutlined style={iconStyle} />,
  Servicos: <SettingOutlined style={iconStyle} />,
  Empacotar: <ShoppingOutlined style={iconStyle} />,
  Pedidos: <PushpinOutlined style={iconStyle} />,
  Separação: <ShoppingCartOutlined style={iconStyle} />,
  Enviados: <TruckOutlined style={iconStyle} />,
  Perfil: <UserOutlined style={iconStyle} />,
  Agenda: <CalendarOutlined style={iconStyle} />,
};

interface IconAppProps {
  iconKey: keyof typeof iconMap;
}

export const IconApp = ({ iconKey }: IconAppProps) => {
  return iconMap[iconKey] || null;
};
