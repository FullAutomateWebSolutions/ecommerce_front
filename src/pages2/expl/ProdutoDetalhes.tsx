import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseLayout } from '../../components/layout/BaseLayout';
import { PageActions } from '../../components/layout/PageActions';
import { SectionCard } from '../../components/ui/SectionCard';
import { StandardDescriptions } from '../../components/ui/StandardDescriptions';


const mockProduto = {
  id: 1,
  nome: 'Mouse Gamer',
  codigo: '001',
  categoria: 'Eletrônico',
  preco: 'R$ 150,00',
  estoque: 20,
};

export const ProdutoDetalhes = () => {
  const { id } = useParams();           
  const navigate = useNavigate();


  const produto = mockProduto;

  return (
    <BaseLayout
      title={`Detalhes do Produto #${id}`}
      breadcrumb={['Início', 'Produtos', 'Detalhes']}
      actions={
        <PageActions
          customButtons={
            <>
              <Button
                type="primary"
                onClick={() => navigate(`/3/editar/${id}`)}
              >
                Editar
              </Button>
              <Button onClick={() => navigate(-1)}>Voltar</Button>
            </>
          }
        />
      }
    >
      <SectionCard title="Informações do Produto">
        <StandardDescriptions
          data={{
            Nome: produto.nome,
            Código: produto.codigo,
            Categoria: produto.categoria,
            Preço: produto.preco,
            Estoque: produto.estoque,
          }}
        />
      </SectionCard>
    </BaseLayout>
  );
};
