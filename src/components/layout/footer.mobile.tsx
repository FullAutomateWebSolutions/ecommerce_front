import {
  CalendarOutlined,
  InboxOutlined,
  PoweroffOutlined,
  PushpinOutlined,
  ScanOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  ToTopOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import { MenuItem } from "../../types/type";
import { IconApp } from "../ui/iconApp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { c } from "vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";

const rawItemsDoMenu: MenuItem[] = [
  {
    key: "Scan",
    icon: <IconApp iconKey="Scan" />,
    label: "Scan",
    role: ["super", "user"],
  },
  {
    key: "Cadastro",
    icon: <IconApp iconKey="Cadastro" />,
    label: "Cadastro",
    role: ["super", "user"],
  },
  {
    key: "Loja",
    icon: <IconApp iconKey="Loja" />,
    label: "Loja",
    role: ["super", "admin"],
  },
  {
    key: "Servicos",
    icon: <IconApp iconKey="Servicos" />,
    label: "Serviços",
    role: ["super", "admin"],
  },
  {
    key: "Empacotar",
    icon: <IconApp iconKey="Empacotar" />,
    label: "Empacotar",
    role: ["super", "separador", "admin"],
  },
  {
    key: "Pedidos",
    icon: <IconApp iconKey="Pedidos" />,
    label: "Pedidos",
    role: ["super", "separador", "admin"],
  },
  {
    key: "Separação",
    icon: <IconApp iconKey="Separação" />,
    label: "Separação",
    role: ["super", "separador"],
  },
  {
    key: "Enviados",
    icon: <IconApp iconKey="Enviados" />,
    label: "Enviados",
    role: ["super", "admin"],
  },
  {
    key: "perfil",
    icon: <IconApp iconKey="Perfil" />,
    label: "Perfil",
    role: ["super"],
  },
  {
    key: "Agenda",
    icon: <IconApp iconKey="Agenda" />,
    label: "Agenda",
    role: ["super", "admin"],
  },
   {
    key: "MercadoLivre",
    icon: <IconApp iconKey="Agenda" />,
    label: "Mercado Livre",
    role: ["super", "admin"],
  },
   {
    key: "Inventario",
    icon: <IconApp iconKey="Agenda" />,
    label: "Inventario",
    role: ["super", "admin"],
  },
];

const hasPermission = (requiredRoles?: string[]) => {
  const { role } = useAuth(); // role: string[]
  if (!requiredRoles || !Array.isArray(role)) return false;
  return requiredRoles.some((r) => role.includes(r));
};

export function handleMenu() {
  return rawItemsDoMenu.filter((item) => {
    if (item.role) {
      return hasPermission(item.role);
    }
    return false;
  });
}

const FooterMobile = () => {
  const navigate = useNavigate();
  const itemsDoMenu = handleMenu();
  const handleSelect = (key: string) => {
    navigate(key);
  };

  const iconContainer: React.CSSProperties = {
    height: 70,
    width: 70,
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column", /// para que lado fica o texto
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    margin: "0 auto",
    // border: "solid 1px red",
    flexShrink: 0, /// 0-> nao permite  /1-> Permite que o item encolha para caber no container
  };

  const iconStyle: React.CSSProperties = {
    fontSize: 26,
    marginBottom: 2,
  };

  const textStyle: React.CSSProperties = {
    fontSize: 12,
    margin: 0,
    padding: 0,
    color: "black",
    lineHeight: 1.2, ///alcular o espaço entre linhas de texto
  };

  const footer: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
    padding: 10,
    zIndex: 999,
    overflowX: itemsDoMenu.length > 4 ? "auto" : "hidden", ///controla como o conteúdo se comporta horizontalmente quando excede a largura do elemento.
    WebkitOverflowScrolling: "touch", //touch; — ativa o scroll com inércia (smooth scrolling) em dispositivos touch (iPhones, iPads).//// auto; — comportamento de scroll padrão, não necessariamente suave.
  };

  const scrollContainer: React.CSSProperties = {
    display: "flex",
    gap: 20, ///é uma propriedade muito útil para definir o espaçamento entre elementos filhos dentro de containers flexíveis (flexbox) ou grids (grid).
    minWidth: itemsDoMenu.length > 4 ? "max-content" : "100%", ///define a largura mínima que um elemento pode ter, ou seja, o menor valor para a largura do elemento.
    justifyContent: itemsDoMenu.length > 4 ? "flex-start" : "center", /// muda linha conforme tamanhoPadraoitem
  };

  return (
    <div>
      {/* //style={footer} */}
      <div>
        {/* //style={scrollContainer} */}

        {itemsDoMenu.map(({ key, icon, label, BadgeNumber }) => (
          <div key={key}>
            <Tooltip title={label}>
              {/* //style={iconContainer} */}

              <div>
                <Badge
                  count={BadgeNumber}
                  key={key}
                  onClick={() => handleSelect(key)}
                >
                  {icon}
                </Badge>
                <p >{label}</p>
                {/* style={textStyle} */}
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterMobile;
