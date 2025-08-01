import { BaseLayout } from "@/components/layout/BaseLayout";
import React from "react";

import { PageActions } from "@/components/layout/PageActions";
import ProductList from "./productList";
import { ProductForm } from "@/components/form/ProductForm";

const Product = () => {
  return (
    <div>
      <BaseLayout
        title="Gerenciar Produtos"
        breadcrumb={["Cadastro", "Produtos"]}
        subTitle="Gerenciar todos os produtos cadastrados"
        actions={<PageActions createText="Criar produto" onCreate={() => ""} />}
        children={<ProductList />}
      />
   
    </div>
  );
};

export default Product;
