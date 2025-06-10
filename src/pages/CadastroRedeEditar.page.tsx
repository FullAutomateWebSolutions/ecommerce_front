import { BaseLayout } from '@/components/layout/BaseLayout';
import { PageActions } from '@/components/layout/PageActions';
import { IRedeFormValues, RedeForm } from '@/components/Rede/RedeForm';
import { SectionCard } from '@/components/ui/SectionCard';
import { Input, Col, Form, message, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';



export const CadastroRedeEditar = () => {
  const { id, descricao } = useParams(); 
  const navigate = useNavigate();

  const isEdit = !!id;

  const redeMock = {
    idRede: id || '',
    descricao: descricao ||'',

  };
 const handleSubmit = async (values: IRedeFormValues) => {
    try {
      // Simula request
      await new Promise((res) => setTimeout(res, 1000));

      message.success(isEdit ? 'Rede atualizada!' : 'Rede criada!');
      navigate('/67');
    } catch (err) {
      message.error('Erro ao salvar rede');
    }
  };
  return (
   <BaseLayout
      title={isEdit ? 'Editar rede' : 'Nova rede'}
      breadcrumb={['Gestão de processos', 'Cadastro de rede', isEdit ? 'Editar' : 'Novo']}
      actions={ <PageActions onReturn={()=>navigate(-1)}/>}
    >
      <SectionCard title=''>
        <RedeForm
          initialValues={isEdit ? redeMock : {descricao: '', idRede: ''}}
          onSubmit={handleSubmit}
        />
      </SectionCard>
    </BaseLayout>
  );
};
