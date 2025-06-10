import React, { ReactNode } from 'react';


/*Controle de rotas controlador de passagem pelo sistema */
interface PrivateRouteProps {
  children: ReactNode;
  role?: string; 
  tela?: string;
}
//@ts-ignore
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, tela, role }) => {
  return <>{children}</>;
};

export default PrivateRoute;
