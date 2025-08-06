import { Loja, LojaForm } from "@/components/form/LojaForm";
import { PageActions } from "@/components/layout/PageActions";
import { TableActions } from "@/components/layout/TableActions";
import { StandardTable } from "@/components/table/StandardTable";
import { CollapseSection } from "@/components/ui/CollapseSection";
import ModalBase from "@/components/ui/ModalBase";
import { useLoja } from "@/hooks/useLoja";
import { Input, message, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

const StoreList = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const { list, update, delete_ } = useLoja();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const coluns: ColumnsType<Loja> = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID"
    },
    {
       title: "Nome",
      key: "nome",
      dataIndex: "nome",
    },
    {
       title: "Tipo Cadastro",
      key: "tipoCadastro",
      dataIndex: "tipoCadastro",
    },
    {
      title: "CNPJ",
      key: "cnpj",
      dataIndex: "cnpj",
    },
    {
      title: "CPF",
      key: "cpf",
      dataIndex: "cpf",
    },
    {
      title: "E-mail",
      key: "email",
      dataIndex: "email",
    },

    {
      key: "Action",
      dataIndex: "Action",
      filtered: true,
      render: (_: any, r: Loja) => (
        <>
          <TableActions
            onEdit={() => (setIsModalOpen(true), setSelected(r))}
            onDelete={() =>
              delete_.mutate(r.id ? r.id : "", {
                onSuccess: () => {
                  message.success("Deletado com sucesso");
                },
                onError(error) {
                  message.info("" + error);
                },
              })
            }
            onJoinStatus={false}
          />
        </>
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
                  columns={coluns}
                  dataSource={list.data}
                  loading={list.isLoading}
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
            content: <>s</>,
          },
        ]}
      />
      <ModalBase
        title="Editar Loja"
        open={isModalOpen}
        onCancel={handleCloseModal}

        // onOk={() => updateUser(formData)}
        // okText="Salvar"
        // confirmLoading={isSaving}
        // width={isMobile ? "90%" : 600}
        // centered
      >
        {/* {selected && ( */}
        <LojaForm
          initialValues={selected}
          onSubmit={function (values: Loja): void {
            update.mutate(values, {
              onSuccess: () => {
                message.success("Atualizado com sucesso!");
                setIsModalOpen(false)
              },
              onError: (e) => {
                notification.error(e);
              },
            });
          }}
          title={""}
        />
        {/* )} */}
      </ModalBase>
    </>
  );
};

export default StoreList;
