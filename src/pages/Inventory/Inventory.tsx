import { BaseLayout } from '@/components/layout/BaseLayout'
import { PageActions } from '@/components/layout/PageActions'
import React from 'react'
import InventoryMovimento from './InventoryMovimento'

const Inventory = () => {
  return (
    <div>
      <BaseLayout 
        title={'Inventário'} 
        actions={<>
        <PageActions 
        onRefresh={()=>console.log()}
        />
        </>}
        subTitle='Consulta modificação e adminstração de Inventário'
        breadcrumb={["Inventário","Adminstração de Inventário"]}
        children={<InventoryMovimento/>}
         />
      
    </div>
  )
}

export default Inventory
