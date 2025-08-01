import React, { useState } from 'react'
import StoreList from './storeList'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { PageActions } from '@/components/layout/PageActions'
import ModalBase from '@/components/ui/ModalBase'
import { Loja, LojaForm } from '@/components/form/LojaForm'


const Store = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
      const [selected, setSelected] = useState<any | null>(null );
        const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelected(null);
    };
  return (
    <div>
      <BaseLayout 
        title={'Gestão de cadastro Loja'} 
        actions={<>
        <PageActions 
        createText='Nova Loja'
        onCreate={()=>setIsModalOpen(true)}
        />
        </>}
        subTitle='Consulta modificação e adminstração de lojas'
        breadcrumb={["Loja","Adminstração de lojas"]}
        children={<StoreList/>}
         />

        <ModalBase
         title="Adiconar Loja"
        open={isModalOpen}
        onCancel={handleCloseModal}
        
        // onOk={() => updateUser(formData)}
        // okText="Salvar"
        // confirmLoading={isSaving}
        // width={isMobile ? "90%" : 600}
        // centered
      >
        {/* {selected && ( */}
          <LojaForm onSubmit={function (values: Loja): void {
                 console.log(values)
               } } title={""}/>
        {/* )} */}
      </ModalBase>
      
    </div>
  )
}

export default Store
