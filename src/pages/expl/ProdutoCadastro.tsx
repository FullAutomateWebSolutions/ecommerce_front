import { Input, Col, Form, message } from 'antd';
import { BaseLayout } from '../../components/layout/BaseLayout';
import { PageActions } from '../../components/layout/PageActions';
import { SectionCard } from '../../components/ui/SectionCard';
import { StandardForm } from '../../components/form/StandardForm';
import { useParams, useNavigate } from 'react-router-dom';
import { ProdutoForm, ProdutoFormValues } from '../../components/produto/ProdutoForm2';
export const ProdutoCadastro = () => {


    const { id } = useParams(); 
  const navigate = useNavigate();

  const isEdit = !!id;

  const produtoMock = {
    nome: 'Teclado',
    codigo: '002',
    categoria: 'Eletrônico',
    preco: 120.0,
    estoque: 10,
  };
 const handleSubmit = async (values: ProdutoFormValues) => {
    try {
      // Simula request
      await new Promise((res) => setTimeout(res, 1000));

      message.success(isEdit ? 'Produto atualizado!' : 'Produto criado!');
      navigate('/2');
    } catch (err) {
      message.error('Erro ao salvar produto');
    }
  };
  return (
   <BaseLayout
      title={isEdit ? 'Editar Produto' : 'Novo Produto'}
      breadcrumb={['Início', 'Produtos', isEdit ? 'Editar' : 'Novo']}
    >
      <SectionCard title='Pre cadastro'>
        <ProdutoForm
          initialValues={isEdit ? produtoMock : undefined}
          onSubmit={handleSubmit}
        />
      </SectionCard>
    </BaseLayout>
  );
};
