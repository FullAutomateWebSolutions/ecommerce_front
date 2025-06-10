
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import App from '../App';
import ErrorPage from '../pages/Error.page';
import { ProdutoCadastro } from '../pages/expl/ProdutoCadastro';
import { ProdutoLista } from '../pages/expl/ProdutoLista';
import { ProdutoDetalhes } from '../pages/expl/ProdutoDetalhes';
import { CategoriaCadastro } from '../pages/expl/CategoriaCadastro';
import HomePage from '@/pages/HomePage';
import HomePageUser from '@/pages/HomePageUser';
import FalhasAgrupadas from '@/pages/expl/FalhasAgrupadas';
import FalhasRecente from '@/pages/FalhasRecente.page';
import ReprocessarFalhas from '@/pages/ReprocessarFalhas.page';
import { FalhasRecenteDetalhes } from '@/pages/FalhasRecenteDetalhes.page';
import CadastroRede from '@/pages/CadastroRede.page';
import { CadastroRedeEditar } from '@/pages/CadastroRedeEditar.page';
import CadastroBandeira from '@/pages/CadastroBandeira.page';
import { CadastroBandeiraEditar } from '@/pages/CadastroBandeiraEditar.page';
import CadastroRedeModelo from '@/pages/CadastroRedeModelo.page';
import AppProt1 from '@/pages/AppPrincipalLinear.page';
import { ProductList } from '@/pages/ProductList';
import AppProt from '@/pages/AppPrincipal.page';

/*Passagens do sistemas rotas existentes */
const router = createBrowserRouter([
  {
    // Rota principal
    path: "/",    element: (<PrivateRoute><AppProt/></PrivateRoute>),
    // path: "/",    element: (<PrivateRoute><AppProt1/></PrivateRoute>),
    
 
    //Rotas privadas
    children: [
        // {        index: true, element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><ProductList/></PrivateRoute>),},    
        {        path: "0", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><ProductList/></PrivateRoute>),},    
      //   {        path: "1", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'> <ProdutoCadastro /></PrivateRoute>),},       
      //   {        path: "2", element: ( <PrivateRoute tela='/2' role='Admin'><ProdutoLista  /></PrivateRoute>),},
      //   {        path: "/3", element: ( <PrivateRoute tela='/3' role='Admin'><ProdutoDetalhes /></PrivateRoute>),},
      //   {        path:"/3/novo", element: ( <PrivateRoute tela='/3' role='Admin'><ProdutoDetalhes /></PrivateRoute>),},
      //   {        path:"/3/editar/:id", element: ( <PrivateRoute tela='/3' role='Admin'><ProdutoDetalhes /></PrivateRoute>),},
      //   {        path:"/3/:id", element: ( <PrivateRoute tela='/3' role='Admin'><ProdutoDetalhes /></PrivateRoute>),},
      //   {        path: "6", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><CategoriaCadastro /></PrivateRoute>),},
      //   {        path: "8", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><FalhasAgrupadas /></PrivateRoute>),},
      //   //ReprocessarFalhas
      //   {        path: "11", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><ReprocessarFalhas /></PrivateRoute>),},
        
      //   ///FalhasRecentes
      //   {        path: "15", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><FalhasRecente /></PrivateRoute>),},
      //   {        path: "/falhas/:id", element: ( <PrivateRoute tela='Monitoramento' role='Admin'><FalhasRecenteDetalhes /></PrivateRoute>),},
      //   /// Cadastro de Rede
      //   {        path: "/67", element: ( <PrivateRoute tela='/3' role='Admin'><CadastroRede /></PrivateRoute>),},
      //   {        path: "/rede/:id/:descricao", element: ( <PrivateRoute tela='/3' role='Admin'><CadastroRedeEditar /></PrivateRoute>),},
      //   {        path: "/rede/create", element: ( <PrivateRoute tela='/3' role='Admin'><CadastroRedeEditar /></PrivateRoute>),},
      //  /// Cadastro de Bandeira
      //   {        path: "/78", element: ( <PrivateRoute tela='/3' role='Admin'><CadastroBandeira /></PrivateRoute>),},
      //   {        path: "/bandeira/:id/:descricao/:idRede", element: ( <PrivateRoute tela='/3' role='Admin'><CadastroBandeiraEditar /></PrivateRoute>),},
      //   {        path: "/bandeira/create", element: ( <PrivateRoute tela='/3' role='Admin'><CadastroBandeiraEditar /></PrivateRoute>),}, 
      //   // CadastroRedeModelo
      //   {        path: "10", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><CadastroRedeModelo /></PrivateRoute>),},
        
        // {        path: "99", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><TelaVinculoID/></PrivateRoute>),},
        // {        path: "10/:id", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><CadastroRedeModeloDetalhe /></PrivateRoute>),},


     { path: '*', element: <ErrorPage />  }
    ],
    }, //Rota publica
    { path: 'login', element: <App />  },
    { path: '*', element: <ErrorPage />  },
   
    
]);
export default router;
