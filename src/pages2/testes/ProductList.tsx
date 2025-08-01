import { useEffect, useState } from "react";
import { Input, Select, Space, Form, Row, Col, message, Tag, Image } from "antd";
import { PageActions } from "@/components/layout/PageActions";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardTable } from "@/components/table/StandardTable";
import { ColumnsType } from "antd/es/table";
import { ProdutoFormC } from "@/components/produto/ProdutoFormC";
import ModalBase from "@/components/ui/ModalBase";
import { FirebaseProdutoService } from "@/service/FirebaseProdutoService";
import { Produto } from "@/types/Produto";
import { ProdutoFormA } from "@/components/produto/ProdutoFormA";

const categoriasMock = [
  { id: 1, description: "Eletrônico" },
  { id: 2, description: "Limpeza" },
  { id: 3, description: "Alimento" },
];

export const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState<{ busca: string; categoriaId: number | null }>({
    busca: "",
    categoriaId: null,
  });
  const [dados, setData] = useState<Produto[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<Produto[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selecionado, setSelecionado] = useState<Produto | null>(null);

  useEffect(() => {
    const unsubscribe = FirebaseProdutoService.onChange((produtos) => {
      setData(produtos);
      setDadosFiltrados(produtos);
    });
    return () => unsubscribe();
  }, []);

  // Filtra localmente os dados conforme busca e categoria
  const handleBuscar = () => {
    setLoading(true);
    setTimeout(() => {
      let resultado = dados;

      if (filtros.busca) {
        resultado = resultado.filter((p) =>
          p.description.toLowerCase().includes(filtros.busca.toLowerCase())
        );
      }

    

      setDadosFiltrados(resultado);
      setLoading(false);
    }, 300);
  };

  const handleDelete = async (values: Produto) => {
    try {
      await FirebaseProdutoService.deletar(String(values.id));
      message.success(`Produto ${values.id} removido com sucesso!`);
    } catch {
      message.error(`Erro ao remover produto ${values.id}`);
    }
  };

  const handleEdit = (produto: Produto) => {
    setSelecionado(produto);
    setOpenModal(true);
  };

  const handleCreateItem = async (values: Produto) => {
    setOpenModal(false);
    setSelecionado(null);
    try {
      await FirebaseProdutoService.criar({
        ...values,
      });
      message.success("Produto criado com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar produto:", e);
      message.error("Erro ao adicionar produto.");
    }
  };

  const handleInputChange = (changedValues: Partial<typeof filtros>) => {
    setFiltros((prev) => ({ ...prev, ...changedValues }));
  };

  const columns: ColumnsType<Produto> = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Código", dataIndex: "codigo", key: "codigo", width: 100 },
    { title: "Descrição", dataIndex: "description", key: "description", width: 250 },
    {
      title: "Marca",
      key: "brand",
      width: 150,
      render: (_, record) => record.brand?.name || "-",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (text) => <span>{text || "-"}</span>,
    },
    {
      title: "Estoque",
      dataIndex: "estoque",
      key: "estoque",
      width: 80,
    },
    {
      title: "Imagem",
      dataIndex: "imagem",
      key: "imagem",
      width: 100,
      render: (_, record) => ( <Image width={50} height={50} src={record.thumbnail} alt="Imagem do produto" />),
    },
    {
      title: "Categoria",
      key: "categoria",
      width: 150,
      render: (_, record) => record.category?.description || "-",
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   width: 90,
    //   render: (_, record) => (
    //     <Tag color={record.status ? "green" : "red"}>
    //       {record.status ? "Ativo" : "Inativo"}
    //     </Tag>
    //   ),
    // },
    {
      title: "Ações",
      key: "acoes",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Editar</a>
          <a onClick={() => handleDelete(record)} style={{ color: "red" }}>
            Excluir
          </a>
        </Space>
      ),
    },
  ];

  return (
    <BaseLayout
      title="Lista de Produtos"
      breadcrumb={["Início", "Produtos"]}
      actions={<PageActions onCreate={() => setOpenModal(true)} />}
    >
      {/* Filtros
      <SectionCard title="Filtros de Busca" style={{ marginBottom: 16 }}>
        <Form layout="vertical" onValuesChange={handleInputChange}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Buscar por descrição" name="busca">
                <Input placeholder="Ex: arroz" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Categoria" name="categoriaId">
                <Select placeholder="Todas" allowClear>
                  {categoriasMock.map((cat) => (
                    <Select.Option key={cat.id} value={cat.id}>
                      {cat.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <button
              onClick={handleBuscar}
              className="ant-btn ant-btn-primary"
              type="button"
            >
              Filtrar
            </button>
            <button
              onClick={() => {
                setFiltros({ busca: "", categoriaId: null });
                setDadosFiltrados(dados);
              }}
              className="ant-btn"
              type="button"
            >
              Limpar
            </button>
          </Space>
        </Form>
      </SectionCard> */}

      {/* Tabela */}
      <SectionCard title="Produtos Cadastrados">
        <StandardTable
          columns={columns}
          dataSource={dadosFiltrados}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </SectionCard>

      {/* Modal */}
      <ModalBase
        footer={null}
        open={openModal}
        title={selecionado ? `Editar [${selecionado.id}]` : "Novo Produto"}
        width={700}
        onCancel={() => {
          setOpenModal(false);
          setSelecionado(null);
        }}
        
      >
        {selecionado ? (
          <ProdutoFormC
            initialValues={selecionado}
            onSubmit={() => {
              setOpenModal(false);
              setSelecionado(null);
            }}
          />
        ) : (
          <ProdutoFormC
            onSubmit={(values) => {
              handleCreateItem(values);
            }}
          />


        )}
      </ModalBase>
    </BaseLayout>
  );
};
