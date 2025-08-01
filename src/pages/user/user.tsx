import { BaseLayout } from "@/components/layout/BaseLayout";
import React from "react";
import UserList from "./userList";
import { PageActions } from "@/components/layout/PageActions";

const User = () => {
  return (
    <div>
      <BaseLayout
        title="Gerenciar usuários."
        breadcrumb={["Perfil", "Gerenciar usuários"]}
        subTitle="Gerenciar todos os usuarios que acessa a aplicação de todos os apps."
        actions={<PageActions createText="Criar usuário" onCreate={() => ""} />}
        children={<UserList />}
      />
    </div>
  );
};

export default User;
