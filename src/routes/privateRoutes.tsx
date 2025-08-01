import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Alert, Flex, message, Spin } from "antd";

interface PrivateRouteProps {
  children: ReactNode;
  roleUser: string | null;
  telaUser?: string;
}

const PrivateRoute = ({ children, roleUser }: PrivateRouteProps) => {
  const { use, loading, role } = useAuth();

  const hasPermission = (requiredRole: string | null) => {
    if (requiredRole === null) return false;
    return role?.includes(requiredRole);
  };

  if (loading) {
    return (
      <Flex gap="middle" vertical>
        <Spin tip="Loading...">
          <Alert
            message="Autenticando"
            description="Buscando autenticação"
            type="info"
          />
        </Spin>
      </Flex>
    );
  }

  if (!use) {
    message.error("Por favor, se autenticar!");
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(roleUser) && roleUser !== "public") {
    message.error("Acesso negado! Você não tem permissão para acessar esta página.");
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
