import { useGenericGet, useGenericPost } from "@/hooks/useQueryStore";
import { Product } from "@/types/type";
import { Button, Card, Col, Row, Typography, Tag, Avatar, Space } from "antd";

import React, { useState } from "react";

const { Title, Text, Paragraph } = Typography;

const Cadastro = () => {
  const [ellipsis, setEllipsis] = useState(true);
  const { data, isLoading } = useGenericGet({
    endpoint: "/search_all_product",
    queryKey: "product",
    options: { retry: 2, retryDelay: 2 },
  });

  const { mutate, isPending } = useGenericPost({
    endpoint: "/search_into_product",
    queryKey: "product",
    onSuccessCallback: (data: Product) => {
      console.log("Produto encontrado:", data);
    },
  });

  const handleComprar = (ean: number) => {
    mutate({ ean });
  };

  const produtos: Product[] = data || [];

  return (
    <>
      <Row
        style={{
          overflowX: "auto",
          display: "flex",
          gap: "20px",
          paddingBottom: "24px",
          flexWrap: "nowrap",
        }}
      >
        {produtos.map((produto: Product, index) => {
          const preco =
            produto.price ??
            produto.avg_price ??
            produto.max_price ??
            produto.min_price ??
            0;

          return (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
               extra={index+1}
                // hoverable
                bodyStyle={{
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                style={{
                  //   height: 420,
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                cover={
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f9f9f9",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <img
                      src={
                        produto.thumbnail ||
                        "https://via.placeholder.com/250x200?text=Sem+Imagem"
                      }
                      alt={produto.description}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                }
              >
                <div
                key={index}
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: "18px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: 36,
                      marginBottom: 4,
                    }}
                  >
                    {produto.description}
                  </Text>
                  <Space
                    align="center"
                    size="small"
                    style={{ marginBottom: 4 }}
                  >
                    <Avatar src={produto.brand?.picture} size={40} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {produto.brand?.name}
                    </Text>
                  </Space>
                  <Text strong style={{ fontSize: 12, marginBottom: 4 }}>
                    ID: {produto.id || "N/A"}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Categoria: {produto.category?.description || "N/A"}
                  </Text>
                   <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Categoria Sub: {produto.gpc?.description || "N/A"}
                  </Text>
                  {/* {produto.gtins &&
                    produto.gtins.map((e) => (
                      <>
                      
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 0 }}
                        >
                          Ean: {e.gtin || "N/A"}
                        </Text>
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 4 }}
                        >
                          Ean: {e.gtin || "N/A"}
                          Type packaging:{" "}
                          {e.commercial_unit?.type_packaging || "N/A"}, Quantity
                          packaging:{" "}
                          {e.commercial_unit?.quantity_packaging || "N/A"}
                        </Text>
                      </>
                    ))} */}

                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Ean_Principal: {produto.gtin}
                  </Text>

                  {/* <Text strong style={{ fontSize: "1.1em", color: "#1677ff" }}>
                    R$ {Number(preco).toFixed(2)}
                  </Text> */}

                  {/* <Tag color="blue" style={{ marginTop: 6 }}>
                    {produto.origin}
                  </Tag> */}
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Code NCM: {produto.ncm?.code}
                  </Text>
                  <Paragraph
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                     ellipsis={
                      ellipsis
                        ? { rows: 1, expandable: true, symbol: "Mais" }
                        : false
                    }
                  >
                    Descrição NCM: {produto.ncm?.description}
                  </Paragraph>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Descrição completa NCM:
                  </Text>
                  <Paragraph
                    type="secondary"
                    ellipsis={
                      ellipsis
                        ? { rows: 1, expandable: true, symbol: "Mais" }
                        : false
                    }
                  >
                    {produto.ncm?.full_description}
                  </Paragraph>

                   <Paragraph
                    type="secondary"
                    ellipsis={
                      ellipsis
                        ? { rows: 1, expandable: true, symbol: "Mais" }
                        : false
                    }
                  >
                     {produto.gtins &&
                    produto.gtins.map((e) => (
                      <>
                      
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 0 }}
                        >
                          Ean: {e.gtin || "N/A"}
                        </Text>
                        <br />
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 4 }}
                        >
                          Type:{" "}{e.commercial_unit?.type_packaging || "N/A"}/
                          Quantity:{" "}{e.commercial_unit?.quantity_packaging || "N/A"}
                          <br />
                        </Text>
                      </>
                    ))}
                  </Paragraph>
                </div>

                {/* <Button
                  type="primary"
                  block
                  style={{ marginTop: 12 }}
                  onClick={() => handleComprar(produto.gtin)}
                  loading={isPending}
                >
                  Comprar
                </Button> */}
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cadastro;
