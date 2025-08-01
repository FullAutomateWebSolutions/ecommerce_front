import { StandardTable } from '@/components/table/StandardTable';
import { CollapseSection } from '@/components/ui/CollapseSection';
import ModalBase from '@/components/ui/ModalBase'
import { Input } from 'antd';
import React, { useState } from 'react'

const StoreList = () => {

    const [pageSize, setPageSize] = useState<number>(10);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<any | null>(null );
      const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };
  return (
    <>
      <CollapseSection
        defaultActiveKeys={["2", "3"]}
        sections={[
          {
            key: "2",
            title: "Administração de lojas",
            extra: (
              <>
                <Input
                  placeholder="Buscar por código loja."
                  // prefix={<SearchOutlined />}
                  // value={searchGtin}
                  onChange={(e) => setSearch(e.target.value)}
                  allowClear
                  style={{
                    borderRadius: 8,
                    padding: "6px 12px",
                  }}
                />
              </>
            ),
            showArrow: true,
            content: (
              <>
                <StandardTable
                  bordered
                  // expandable={{ expandedRowRender: renderDetalhesFalha }}
                  // style={{ paddingTop: 4, paddingBottom: 4 }}
             
                  dataSource={[]}
                  // loading={isLoading}
                  scroll={{ x: 1500, y: 300 }}
                  size="small"
                  pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    showTotal: (total) => `Total de registros: ${total}`,
                    onShowSizeChange: (_, size) => setPageSize(size),
                  }}
                />
              </>
            ),
          },
          {
            key: "3",
            title: "Mais detalhes",
            showArrow: true,
            content: (
              <>
                s
              </>
            ),
          },
        
        ]}
      />
   


     
    </>
  )
}

export default StoreList
