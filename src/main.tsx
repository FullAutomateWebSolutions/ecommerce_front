import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./routes/routes";
import ptBR from "antd/es/locale/pt_BR";
import { ConfigProvider, ConfigProviderProps, ThemeConfig } from "antd";

const queryClient = new QueryClient();

const customTheme: ThemeConfig = {
  token: {
    colorPrimary: "#2a9d8f",              // Verde água para destaque
    colorText: "#1a1a1a",                 // Preto suave para bom contraste
    colorTextHeading: "#0f3d3e",          // Mais escuro para títulos
    colorTextLabel: "#3a3a3a",            // Para labels de formulário
    colorLink: "#2a9d8f",
    colorLinkHover: "#21867b",
    borderRadius: 8,
    fontFamily: "'Segoe UI', sans-serif",
    colorBgLayout: "#f0f4f5",             // Fundo geral da aplicação
    colorBgContainer: "#ffffff",          // Fundo dos cards/tabelas
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  components: {
    Layout: {
      headerBg: "#2a9d8f",
      headerColor: "#ffffff",
      siderBg: "#2a9d8f",
      triggerBg: "#21867b",
      triggerColor: "#ffffff",
    },
    Button: {
      colorPrimary: "#2a9d8f",
      colorPrimaryHover: "#21867b",
      colorTextLightSolid: "#ffffff",
    },
    Typography: {
      colorTextHeading: "#0f3d3e",
    },
    Card: {
      colorBgContainer: "#ffffff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      borderRadius: 8,
    },
    Table: {
      colorBgContainer: "#ffffff",
      headerColor: "#0f3d3e",
    },
    Input: {
      colorBorder: "#c1dad8",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={customTheme} locale={ptBR}>
        <RouterProvider router={router} />
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
