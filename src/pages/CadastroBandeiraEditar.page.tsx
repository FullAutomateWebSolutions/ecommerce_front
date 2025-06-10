import { BaseLayout } from '@/components/layout/BaseLayout';
import { PageActions } from '@/components/layout/PageActions';
import { IBandeiraFormValues, BandeiraForm } from '@/components/Bandeira/BandeiraForm';
import { SectionCard } from '@/components/ui/SectionCard';
import { Input, Col, Form, message, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';



export const CadastroBandeiraEditar = () => {
  const { id, descricao, idRede } = useParams(); 
  const navigate = useNavigate();

  const isEdit = !!id;

  const BandeiraMock = {
    idBandeira: id || '',
    descricao: descricao ||'',
    idRede: idRede || ''

  };
 const handleSubmit = async (values: IBandeiraFormValues) => {
    try {
      // Simula request
      await new Promise((res) => setTimeout(res, 1000));

      message.success(isEdit ? 'Bandeira atualizada!' : 'Bandeira criada!');
      navigate('/78');
    } catch (err) {
      message.error('Erro ao salvar Bandeira');
    }
  };
  return (
   <BaseLayout
      title={isEdit ? 'Editar Bandeira' : 'Nova Bandeira'}
      breadcrumb={['Gestão de processos', 'Cadastro de Bandeira', isEdit ? 'Editar' : 'Novo']}
      actions={ <PageActions onReturn={()=>navigate(-1)}/>}
    >
      <SectionCard title=''>
        <BandeiraForm
          initialValues={isEdit ? BandeiraMock : {descricao: '', idBandeira: '', idRede: ''}}
          onSubmit={handleSubmit}
        />
      </SectionCard>
    </BaseLayout>
  );
};
