import { BaseLayout } from "@/components/layout/BaseLayout";
import { PageActions } from "@/components/layout/PageActions";

import { StandardTable } from "@/components/table/StandardTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardDescriptions, StandardDescriptionsForm } from "@/components/ui/StandardDescriptions";
import {  message } from "antd";


interface CadastroRedeModeloDetalheProp{
  values : IRede
}
export interface IRede {
  idRede: string;
  descricao: string;
  listBandeira?: IListBandeiraFormValues[];
  date_create?: string;
  date_update?: string;
}
export interface IListBandeiraFormValues {
  idBandeira: string;
  descricaoBandeira: string;
     date_create?: string;
  date_update?: string;
}

const CadastroRedeModeloDetalhe : React.FC<CadastroRedeModeloDetalheProp>=({values}) => {

  return (
      <BaseLayout
      versao="V 1.1.0"
      title={` [${values.idRede}] - ${values.descricao}`}
      
    >
      <SectionCard title="Informações de Rede e Bandeira" extra={
        <PageActions 
        onExcel={()=>message.success("Baixando excel....")}
        />

      }>
        <StandardDescriptionsForm data={[
            {label: "Codigo de Rede", children: <>{`${values.idRede}`}</>},
            {label: "Descrição de Rede", children: <>{`${values.descricao}`}</>}
          ]} column={2}       
        />
        <StandardDescriptionsForm data={[
            {label: "Data criação", children: <>{`${values.date_create}`}</>},
            {label: "Data atualização", children: <>{`${values.date_update}`}</>},
            {label: "User ID", children: <>634196</>},
            {label: "User name", children: <>Alex Lima</>}

          ]} column={0}        
        />
        <StandardTable
            columns={[
            { title: "ID Bandeira", dataIndex: "idBandeira", key: "idBandeira" },
            { title: "Descrição bandeira", dataIndex: "descricaoBandeira", key: "descricaoBandeira" },
            { title: "Data criação", dataIndex: "date_create", key: "date_create" },
            { title: "Data atualização", dataIndex: "date_update", key: "date_update" },
            // {
            //       title: "Ações",
            //       key: "acoes",
            //       // render: (_, record) =><PageActions onEdit={() => handleEditar(record.idRede, record.descricao)}/> ,
            //       render: (_, record) => (
            //         <TableActions
            //           onDelete={() => {}}
            //           onEdit={() =>{""}}
            //         />
            //       ),
            //     },
          ]}
          dataSource={values.listBandeira}
          pagination={{
             pageSize:5,
                // showSizeChanger: true,
                // pageSizeOptions: ["5", "10", "20", "50"],
                showTotal: (total) => `Total de registros: ${total}`,
                // onShowSizeChange: (_, size) => setPageSize(size),
          }}

          rowKey="idBandeira"
          size="small"
        />
      </SectionCard>
   </BaseLayout>
  )
}

export default CadastroRedeModeloDetalhe