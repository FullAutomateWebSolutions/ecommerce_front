import { Button, Form, Input } from "antd";
import { PageHeader } from "../../components/ds/PageHeader";
import { SectionCard } from "../../components/ui/SectionCard";
import { FormGroup } from "../../components/ds/FormGroup";

export const CategoriaCadastro = () => {
  return (
    <>
      <PageHeader title="Nova Categoria" breadcrumb={["Início", "Categorias", "Nova"]} />

      <SectionCard title={""} >
        <Form layout="vertical">
          <FormGroup>
            <Form.Item label="Nome" name="nome" required>
              <Input />
            </Form.Item>
            <Form.Item label="Código" name="codigo">
              <Input />
            </Form.Item>
          </FormGroup>

          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form>
      </SectionCard>
    </>
  );
};
