
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorPage from '../pages/manut/Error404';
import AuthPage from '../pages/aut/autenticacao';
import ErrorPage404 from '../pages/manut/Error404';
import ErrorPage403 from '../pages/manut/Error403';
import App from '@/App';
import User from '@/pages/user/user';
import Product from '@/pages/product/product';
import MercadoLivre from '@/pages/MercadoLivre/page/MercadoLivre';
import Inventory from '@/pages/Inventory/Inventory';
import Store from '@/pages/Store/store';

/*Passagens do sistemas rotas existentes */
const router = createBrowserRouter([
  {
    // Rota principal
    path: "/",    element: (<AuthProvider ><PrivateRoute roleUser='public'><App/></PrivateRoute></AuthProvider>),
    //Rotas privadas  
    children: [
     {        path :"perfil", element: (<AuthProvider ><PrivateRoute roleUser='public'><User/></PrivateRoute></AuthProvider>),},     
     {        path :"inventario", element: (<AuthProvider ><PrivateRoute roleUser='public'><Inventory/></PrivateRoute></AuthProvider>),},     
     {        path :"loja", element: (<AuthProvider ><PrivateRoute roleUser='public'><Store/></PrivateRoute></AuthProvider>),},     
     {        path :"MercadoLivre", element: (<AuthProvider ><PrivateRoute roleUser='public'><MercadoLivre/></PrivateRoute></AuthProvider>),},     
     {        path :"cadastro", element: (<AuthProvider ><PrivateRoute roleUser='super'><Product/></PrivateRoute></AuthProvider>),},    
     { path: '404', element:           <AuthProvider ><PrivateRoute roleUser='public'><ErrorPage404/></PrivateRoute></AuthProvider>  },
     { path: '403', element:           <AuthProvider ><PrivateRoute roleUser='public'><ErrorPage403/></PrivateRoute></AuthProvider>  },
     { path: '*', element:             <AuthProvider ><PrivateRoute roleUser='public'><ErrorPage/></PrivateRoute></AuthProvider>  }
    ],
    }, //Rota publica
    { path: 'login', element: <AuthPage />  },
    { path: '*', element: <ErrorPage />  },
   
    
]);
export default router;