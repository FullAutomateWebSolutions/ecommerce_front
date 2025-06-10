import { useEffect, useState } from "react";
import { Input, Select, Space, Form, Row, Col, message, Tag } from "antd";
import { PageActions } from "@/components/layout/PageActions";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardTable } from "@/components/table/StandardTable";
import { ColumnsType } from "antd/es/table";

import {
  query,
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  ProdutoForm,
  ProdutoFormValues,
} from "@/components/produto/ProdutoForm2";
import ModalBase from "@/components/ui/ModalBase";
import { ProductListEditarModalProps } from "./ProductListEditarModal.page";
import { TableActions } from "@/components/layout/TableActions";

export interface IProduto {
  id: string;
  descricao: string;
  codigo: string;
  categoria: string;
  preco?: number;
  estoque?: number;
  imagens?: string; // Certifique-se que seja string ou array, depende do form
  status: boolean;
}

const categoriasMock = ["Eletrônico", "Limpeza", "Alimento"];

export const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({ busca: "", categoria: "" });
  const [dados, setData] = useState<IProduto[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<IProduto[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selecionado, setSelecionado] = useState<IProduto | null>(null);

  // Atualiza dados filtrados
  useEffect(() => {
    let resultado = dados;

    if (filtros.busca) {
      resultado = resultado.filter((p) =>
        p.descricao.toLowerCase().includes(filtros.busca.toLowerCase())
      );
    }

    if (filtros.categoria) {
      resultado = resultado.filter((p) => p.categoria === filtros.categoria);
    }

    setDadosFiltrados(resultado);
  }, [filtros, dados]);

  // Snapshot em tempo real do Firestore
  useEffect(() => {
    const q = query(collection(db, "webBase"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const produtos: IProduto[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IProduto[];
      setData(produtos);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (changedValues: any) => {
    setFiltros((prev) => ({ ...prev, ...changedValues }));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "webBase", id));
      message.success(`Produto ${id} removido com sucesso!`);
    } catch (e) {
      message.error(`Erro ao remover produto ${id}!`);
    }
  };

  const handleEdite = (values: IProduto) => {
    setOpenModal(true);
    setSelecionado(values);
  };

  const handleCreateItem = async (values: ProdutoFormValues) => {
    setOpenModal(false);
    setSelecionado(null);

    try {
      await addDoc(collection(db, "webBase"), {
        ...values,
        status: true,
      });
    } catch (e) {
      console.error("Erro ao adicionar documento:", e);
    }
  };

  const columns: ColumnsType<IProduto> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Código Loja", dataIndex: "codigo", key: "codigo" },
    { title: "Descrição", dataIndex: "descricao", key: "nome" },
    { title: "Preço", dataIndex: "preco", key: "preco" },
    { title: "Estoque", dataIndex: "estoque", key: "estoque" },
    {
      title: "Imagem",
      dataIndex: "imagens",
      key: "imagens",
      render: (url: string) =>
        url ? <img src={url} alt="produto" width={60} /> : "-",
    },
    { title: "Categoria", dataIndex: "categoria", key: "categoria" },
    {
      title: "Status",
      key: "status",
      render: (_, record) =>
        record.status ? (
          <Tag color="success">Ativo</Tag>
        ) : (
          <Tag color="error">Inativo</Tag>
        ),
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <TableActions
          onDelete={() => handleDelete(record.id)}
          key={record.id}
          onEdit={() => handleEdite(record)}
          onJoinStatus={false}
        />
      ),
    },
  ];

  return (
    <BaseLayout
      title="Lista de Produtos"
      breadcrumb={["Início", "Produtos"]}
      actions={<PageActions onCreate={() => setOpenModal(true)} />}
    >
      <SectionCard title="Filtros de Busca">
        <Form layout="vertical" onValuesChange={handleInputChange}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Buscar por nome" name="busca">
                <Input placeholder="Ex: arroz" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Categoria" name="categoria">
                <Select placeholder="Todas" allowClear>
                  {categoriasMock.map((cat) => (
                    <Select.Option key={cat} value={cat}>
                      {cat}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </SectionCard>

      <SectionCard title="Produtos Cadastrados">
        <StandardTable
          columns={columns}
          dataSource={dadosFiltrados}
          loading={loading}
        />
      </SectionCard>

      <ModalBase
        footer=""
        open={openModal}
        title={
          selecionado?.id
            ? `Editar [${selecionado?.codigo}]`
            : "Novo Item"
        }
        width={700}
        onCancel={() => {
          setOpenModal(false);
          setSelecionado(null);
        }}
      >
        {selecionado?.id ? (
          <ProductListEditarModalProps
            //@ts-ignore
            values={selecionado}
            id={selecionado.id}
            onSave={() => {
              setSelecionado(null);
              setOpenModal(false);
            }}
          />
        ) : (
          <ProdutoForm onSubmit={handleCreateItem} />
        )}
      </ModalBase>
    </BaseLayout>
  );
};
