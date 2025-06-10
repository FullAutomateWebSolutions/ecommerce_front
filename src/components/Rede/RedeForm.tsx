import { Button, Divider, Form, Input, Space } from "antd";
import {
  StandardDescriptions,
  StandardDescriptionsForm,
} from "../ui/StandardDescriptions";
import { PageActions } from "../layout/PageActions";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

// const { Option } = Select;

export interface IRedeFormValues {
  idRede: string;
  descricao: string;
  listBandeira: IListBandeiraFormValues[];
}

export interface IListBandeiraFormValues {
  idBandeira: string;
  descricaoBandeira: string;
   date_create?: string;
  date_update?: string;
}

interface RedeFormProps {
  initialValues?: IRedeFormValues;
  onSubmit: (values: IRedeFormValues) => void;
  title: string,
  loading?: boolean;
}

export const RedeForm = ({
  title,
  initialValues,
  onSubmit,
  loading,
}: RedeFormProps) => {
  const [form] = Form.useForm<IRedeFormValues>();
  const [onChangeRede, setONChangeRede] = useState(false);
  const [onChRede, setOnChRede] = useState(false);
  
  const handleFinish = (values: IRedeFormValues) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="inline"
      initialValues={initialValues}
      onFinish={handleFinish}
      variant="underlined"
    >
      <StandardDescriptionsForm
        data={[
          {
            label: "Descrição",
            children: (
              <>
                {" "}
                <Form.Item name="descricao" rules={[{ required: true }]}>
                  <Input disabled={onChangeRede} allowClear/>
                </Form.Item>
              </>
            ),
          },
          {
            label: "Código de rede",
            children: (
              <>
                {" "}
                <Form.Item name="idRede" rules={[{ required: true }]}>
                  <Input disabled={onChangeRede}  allowClear/>
                </Form.Item>
              </>
            ),
          },
          {
            label: "Bandeira",
            children:(
                    <Form.Item>
        <Form.List name={"listBandeira"}>
          {(subFields, subOpt) => (
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 16 }}
            >
              {subFields.map((subField) => (
                <Space key={subField.key}>
                           {/* <Form.Item   name={[subField.name, 'idBandeira']}>
                              <Input placeholder="001" />
                            </Form.Item>
                            <Form.Item  name={[subField.name, 'descricaoBandeira']}>
                              <Input placeholder="Ex: Cielo" />
                            </Form.Item> */}
                            <Divider type="horizontal"/>
                   <StandardDescriptionsForm 
                      data={[
                        {label: 'Código de Bandeira', children: <><Form.Item  name={[subField.name, 'idBandeira']} rules={[{ required: true }]}><Input placeholder="Código de Bandeira" allowClear/></Form.Item></>},
                        {label: 'Descrição Bandeira', children: <><Form.Item   name={[subField.name, 'descricaoBandeira']} rules={[{ required: true }]}><Input  placeholder="Código de Bandeira" allowClear /></Form.Item></>},
                        ]} column={1}/>
                  <CloseOutlined
                    onClick={() => {
                     ( subOpt.remove(subField.name), subFields.length > 1 ? setONChangeRede(true): setONChangeRede(false));
                    }}
                  />
                </Space>
              ))}
               {subFields.length <= 2 ? <Button type="dashed"  onClick={() => ( subOpt.add(), setONChangeRede(true))} block>
                + Adicionar Bandeira
              </Button>:"" }
            </div>
          )}
        </Form.List>
      </Form.Item>
            )
          }
        ]}
        title={title}
        extra={
          <Form.Item>
            <PageActions onSave={() => ""} />
          </Form.Item>
        }
        column={1}
      />



      {/* 

     
      <Form.Item label="Categoria" name="categoria" rules={[{ required: true }]}>
        <Select placeholder="Selecione uma categoria">
          <Option value="Eletrônico">Eletrônico</Option>
          <Option value="Alimento">Alimento</Option>
          <Option value="Vestuário">Vestuário</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Preço" name="preco" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} prefix="R$" min={0} step={0.01} />
      </Form.Item>

      <Form.Item label="Estoque" name="estoque" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item> */}
    </Form>
  );
};
