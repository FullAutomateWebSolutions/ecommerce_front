import React, { useMemo, useState } from "react";

import { useEstoque } from "@/hooks/useEstoque";
import { Table, Tag, Typography, Input, Space } from "antd";

import { StandardTable } from "@/components/table/StandardTable";
import { CollapseSection } from "@/components/ui/CollapseSection";
import { ProductInventory } from "@/types/inventory";
import { ColumnsType } from "antd/es/table";
import ModalBase from "@/components/ui/ModalBase";
import { TableActions } from "@/components/ui/tableAction";
import  MovimentacaoTracking  from "./inventoryTrakink";

const { Title, Paragraph } = Typography;
const { Search } = Input;

const getTagColor = (valor: number) => {
  return valor > 0 ? "green" : "red";
};

const InventoryMovimento: React.FC = () => {
  const { list } = useEstoque();
  const [searchGtin, setSearchGtin] = useState("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<ProductInventory | null>(null );

   const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };
   const handleEdit = (product: ProductInventory) => {
      setSelected(product);
      // setFormData(user);
      setIsModalOpen(true);
    };

  const filteredData = useMemo(() => {
    return (
      list.data?.filter((item) =>
        item.gtin.toLowerCase().includes(searchGtin.toLowerCase())
      ) || []
    );
  }, [searchGtin, list.data]);

  const columns: ColumnsType<ProductInventory> = [
    {
      title: "GTIN",
      dataIndex: "gtin",
      key: "gtin",
      width: 150,
      sorter: (a: any, b: any) => a.gtin.localeCompare(b.gtin),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (_: any, record: ProductInventory) => (
        <Paragraph ellipsis={true}>
          <span>{[record.description]}</span>
        </Paragraph>
      ),
    },
      {
      title: "Estoque",
      dataIndex: "totalReal",
      key: "totalReal",
      sorter: (a: any, b: any) => a.totalReal - b.totalReal,
    },
    {
      title: "Disponível",
      dataIndex: "disponivel",
      key: "disponivel",
      // render: (value: number) => <Tag color={getTagColor(value)}>{value}</Tag>,
      sorter: (a: any, b: any) => a.disponivel - b.disponivel,
    },
    {
      title: "Reservado",
      dataIndex: "reservado",
      key: "reservado",
      // render: (value: number) => <Tag color={getTagColor(value)}>{value}</Tag>,
    },
    {
      title: "Bloqueado",
      dataIndex: "bloqueado",
      key: "bloqueado",
      // render: (value: number) => <Tag color={getTagColor(value)}>{value}</Tag>,
    },
    {
      title: "Faturado",
      dataIndex: "faturado",
      key: "faturado",
    },
    {
      title: "Em Trânsito",
      dataIndex: "transito",
      key: "transito",
    },
    {
      title: "Retorno",
      dataIndex: "retorno",
      key: "retorno",
    },
    {
      title: "Inventário",
      dataIndex: "inventario",
      key: "inventario",
    },
     {
      title: "Ações",
      key: "acoes",
      align: "center",
      fixed: "right",
      width: 180,
      render: (_: any, user: ProductInventory) => (
         <TableActions
          onEdit={() => handleEdit(user)} onJoinStatus={false}           
                />
      ),
    },
  ];

  return (
    <>
      <CollapseSection
        defaultActiveKeys={["2", "3"]}
        sections={[
          {
            key: "2",
            title: "Inventário",
            extra: (
              <>
                <Input
                  placeholder="Buscar por código."
                  // prefix={<SearchOutlined />}
                  // value={searchGtin}
                  onChange={(e) => setSearchGtin(e.target.value)}
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
                  columns={columns}
                  dataSource={filteredData}
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
            title: "Movimentação de Inventário",
            showArrow: true,
            content: (
              <>
                 <MovimentacaoTracking />
              </>
            ),
          },
        
        ]}
      />
   
    <ModalBase
        // title="Editar Usuário"
        open={isModalOpen}
        onCancel={handleCloseModal}
        // onOk={() => updateUser(formData)}
        // okText="Salvar"
        // confirmLoading={isSaving}
        // width={isMobile ? "90%" : 600}
        // centered
      >
        {selected && (
           <></>
        )}
      </ModalBase>

     
    </>
  );
};

export default InventoryMovimento;
