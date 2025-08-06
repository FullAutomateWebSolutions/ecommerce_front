import { StandardTable } from "@/components/table/StandardTable";
import { CollapseSection } from "@/components/ui/CollapseSection";

import { TableActions } from "@/components/ui/tableAction";
import { useGenericGet, useGenericPost } from "@/hooks/useQueryStore";
import { Product } from "@/types/type";
import { Button, Input, message, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import { ProductFilled, UserAddOutlined } from "@ant-design/icons";
import { ProductModal } from "./productModal";
const { Title, Text, Paragraph } = Typography;
const ProductList = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [ellipsis, setEllipsis] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const { mutate: mutateProduct } = useGenericPost({
  endpoint: "/search_set_product",
  queryKey: "product",
});

 const { mutate: mutateNewProduct } = useGenericPost({
  endpoint: "/search_new_product",
  queryKey: "product",
});

 const { mutate: mutateDeleteProduct } = useGenericPost({
  endpoint: "/search_delete_product",
  queryKey: "product",
});


  const handleSaveProduct = (product: Product) => {
    if (product.id) {
       mutateProduct({data: product});
    }else{
      mutateNewProduct({data: product});
    }
  };
    const handleDeleteProduct = (product: Product) => {
       mutateDeleteProduct({data : product}, 
        {
                onSuccess: (data: any) => {
                  message.info(data)
                }}
       )
  };

  const { data, isLoading } = useGenericGet({
    endpoint: "/search_all_product",
    queryKey: "product",
    options: { retry: 2, retryDelay: 2 },
  });

  const columns: ColumnsType<Product> = [
    {
      title: "Imagem",
      dataIndex: "thumbnail",
      key: "thumbnail",
      fixed: "left",
      width: 80,
      render: (src) => (
        <img
          src={src || <ProductFilled />}
          alt="produto"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 6,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        />
      ),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      width: 200,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text || "—"}</span>
        </Tooltip>
      ),
    },
    {
      title: "Marca",
      dataIndex: ["brand", "name"],
      key: "brand",
      width: 120,
      render: (_, product) => product.brand?.name || "—",
    },
    {
      title: "Categoria",
      dataIndex: ["category", "description"],
      key: "category",
      width: 160,
      render: (_, product) => product.category?.description || "—",
    },
    {
      title: "GPC",
      dataIndex: ["gpc", "description"],
      key: "gpc",
      width: 150,
      render: (_, product) => product.gpc?.description || "—",
    },
    {
      title: "NCM",
      key: "ncm",
      width: 160,
      render: (_, p) =>
        p.ncm?.description ? (
          <>
            <Paragraph
              type="secondary"
              ellipsis={
                ellipsis ? { rows: 1, expandable: true, symbol: "Mais" } : false
              }
            >
              {p.ncm?.description}
            </Paragraph>
          </>
        ) : (
          "—"
        ),
    },
    {
      title: "GTIN",
      dataIndex: "gtin",
      key: "gtin",
      width: 120,
    },
    {
      title: "GTINs Adicionais",
      dataIndex: "gtins",
      key: "gtins",
      width: 160,
      render: (_: any, grupo: Product) =>
        grupo.gtins?.length ? (
          <Tooltip title={grupo.gtins?.map((g) => g.gtin).join(", ")}>
            <Tag color="blue">{grupo.gtins?.length} código(s)</Tag>
          </Tooltip>
        ) : (
          "—"
        ),
    },
    {
      title: "Embalagem",
      key: "gtins",
      width: 200,
      render: (_: any, grupo: Product) =>
        grupo.gtins?.length ? (
          <>
            <strong>Pack:</strong>{" "}
            {grupo.gtins
              ?.map((g) => g.commercial_unit?.quantity_packaging)
              .join(", ") ?? "—"}
            <Paragraph
              type="secondary"
              ellipsis={
                ellipsis ? { rows: 1, expandable: true, symbol: "Mais" } : false
              }
            >
              {grupo.gtins?.map((g) => (
                <>
                  <div>
                    <strong>Ean:</strong> {g.gtin ?? "—"}
                  </div>
                  <div>
                    <strong>Pack:</strong>{" "}
                    {g.commercial_unit?.type_packaging ?? "—"}
                  </div>
                  <div>
                    <strong>Quant:</strong>{" "}
                    {g.commercial_unit?.quantity_packaging ?? "—"}
                  </div>
                </>
              ))}
            </Paragraph>
          </>
        ) : (
          "—"
        ),
    },
    {
      title: "Origem",
      dataIndex: "origin",
      key: "origin",
      width: 100,
      render: (origin) => (origin ? <Tag color="green">{origin}</Tag> : "—"),
    },
    {
      title: "Dimensões",
      key: "dimensoes",
      width: 140,
      render: (p) =>
        p.length || p.width || p.height
          ? `${p.length ?? "?"}×${p.width ?? "?"}×${p.height ?? "?"} cm`
          : "—",
    },
    {
      title: "Peso",
      key: "peso",
      width: 120,
      render: (p) =>
        p.net_weight || p.gross_weight ? (
          <>
            <div>
              <strong>Net:</strong> {p.net_weight ?? "—"}kg
            </div>
            <div>
              <strong>Bruto:</strong> {p.gross_weight ?? "—"}kg
            </div>
          </>
        ) : (
          "—"
        ),
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => (price != null ? `R$ ${price.toFixed(2)}` : "—"),
    },
    {
      title: "Preço Médio / Min / Max",
      key: "precos",
      width: 160,
      render: (p) => (
        <>
          <div>
            <small>Médio:</small>{" "}
            {p.avg_price != null ? `R$ ${p.avg_price.toFixed(2)}` : "—"}
          </div>
          <div>
            <small>Min:</small>{" "}
            {p.min_price != null ? `R$ ${p.min_price.toFixed(2)}` : "—"}
          </div>
          <div>
            <small>Max:</small>{" "}
            {p.max_price != null ? `R$ ${p.max_price.toFixed(2)}` : "—"}
          </div>
        </>
      ),
    },
    {
      title: "Datas",
      key: "datas",
      width: 180,
      render: (p) => (
        <>
          <div>
            <small>Criação:</small>{" "}
            {p.created_at ? dayjs(p.created_at).format("DD/MM/YYYY") : "—"}
          </div>
          <div>
            <small>Atualização:</small>{" "}
            {p.updated_at ? dayjs(p.updated_at).format("DD/MM/YYYY") : "—"}
          </div>
          <div>
            <small>Lançamento:</small>{" "}
            {p.release_date ? dayjs(p.release_date).format("DD/MM/YYYY") : "—"}
          </div>
        </>
      ),
    },
    {
      title: "Ações",
      key: "acoes",
      align: "center",
      fixed: "right",
      width: 130,
      render: (_: any, product: Product) => (
        <TableActions
          onSwitch={() => console.log()}
          onDelete={() => (handleDeleteProduct(product))}
          onEdit={() => (setEditingProduct(product), setModalOpen(true))}
          onCreate={() => (setEditingProduct(product), setModalOpen(true))}
          onSwitchDisbled={!product.price}
          onJoinStatus={false}
        />
      ),
    },
  ];

  return (
    <div>
      <CollapseSection
        defaultActiveKeys={["1", "2"]}
        sections={[
          {
            key: "2",
            title: "Administração de produtos",
            extra: (
              <>
                <Button type="primary" onClick={() => setModalOpen(true)}>
                  Cadastrar Novo Produto
                </Button>
              </>
            ),
            showArrow: true,
            content: (
              <>
                <StandardTable
                  bordered
                  style={{ paddingTop: 4, paddingBottom: 4 }}
                  columns={columns}
                  dataSource={data}
                  loading={isLoading}
                  scroll={{ x: 2000, y: 400 }}
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
        ]}
      />
      <ProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(undefined);
        }}
        onSave={handleSaveProduct}
        initialValues={editingProduct} 
      />
    </div>
  );
};

export default ProductList;
