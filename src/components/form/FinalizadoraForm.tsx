import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Select, Divider, Button, Space, message } from "antd";
import {
  BarcodeOutlined,
  TagsOutlined,
  SaveOutlined,
  CreditCardOutlined,
  CloseOutlined,
  HighlightOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { redeStore, tipofinalizadoraStore,finalizadoraStore, BandeiraStore } from "@/store/useStore";
import { IRede } from "@/types/Rede";
import { StandardDescriptionsForm } from "../ui/StandardDescriptions";
import {
  IFinalizadora,
  ITipoFinalizadoraFormValues,
  tipoFinalizadoraFormProps,
} from "@/types/IFinalizadora";
import TipoFinalizadoraList from "../../pages/Finalizadora/tipoFinalizadoraList";
import { IBandeira } from "@/types/Bandeira";

const { Option } = Select;

interface FinalizadoraFormProps {
  valoresIniciais?: any | null;
  onSubmit: (values: IFinalizadora) => void;
  title?: string,
  loading?: boolean;
}


const CombinacaoRedeBandeira = ({ redes,  bandeiras }: { redes: IRede[] , bandeiras : IBandeira[]}) => {
  const redeOptions = useMemo(
    () =>
      redes.map((e: IRede) => ({
        value: e.idRede,
        label: `${e.idRede} ${e.descricao}`,
      })),
    [redes]
  );
   const bandeiraOptions = useMemo(
    () =>
      bandeiras.map((e: IBandeira) => ({
        value: e.idBandeira,
        label: `${e.idBandeira} ${e.descricao}`,
      })),
    [bandeiras]
  );

  return (
    <Form.List name="combinacoes">
      {(fields, { add, remove }) => (
        <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} align="start">
              <StandardDescriptionsForm
                data={[
                  {
                    label: `Rede`,
                    children: (
                      <Form.Item
                        {...restField}
                        name={[name, "cod_rede"]}
                        rules={[
                          { required: true, message: "Selecione uma rede" },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Selecione uma rede"
                          optionFilterProp="label"
                          style={{ width: 300 }}
                          options={redeOptions}
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    label: `Bandeira`,
                    children: (
                      <Form.Item
                        {...restField}
                        name={[name, "cod_bandeira"]}
                        rules={[
                          { required: true, message: "Selecione uma bandeira" },
                        ]}
                      >                          
                        <Select
                          showSearch
                          placeholder="Selecione uma rede"
                          optionFilterProp="label"
                          style={{ width: 300 }}
                          options={bandeiraOptions}
                        />
                      </Form.Item>
                    ),
                  },
                ]}
                column={0}
              />
              <CloseOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          {fields.length <= 2 && (
            <Button type="dashed" onClick={() => add()} block>
              + Adicionar combinação
            </Button>
          )}
        </div>
      )}
    </Form.List>
  );
};

const CombinacaoFinalizadora = ({ value }: { value: string }) => {
  const finalizadoraMemo = useMemo(() => value, [value]);

  return (
    <StandardDescriptionsForm
      data={[
        {
          label: `Código`,
          children: (
            <Form.Item
              name="cod_finalizadora"
              rules={[
                { required: true, message: "Informe o código" },
                
              ]}
            >
              <Input placeholder="Digite o código" allowClear maxLength={4} />
            </Form.Item>
          ),
        },
        // {
        //   label: `Descrição`,
        //   children: (
        //     <Form.Item
        //       name="desc_finalizadora"
        //       rules={[{ required: true, message: "Informe o descrição" }]}
        //     >
        //       <Input placeholder="Informe a descrição" allowClear />
        //     </Form.Item>
        //   ),
        // },
      ]}
      column={0}
    />
  );
};

const CadastroFinalizadoraSAP = ({  title,
  valoresIniciais,
  onSubmit,
  loading,}: FinalizadoraFormProps) => {
  const { fetchRede, redes } = redeStore();
  const { fetchBandeira, Bandeiras } = BandeiraStore();
  const [form] = Form.useForm();
  const { finalizadora, add } = finalizadoraStore();
  const { tipoFinalizadora,fetch } = tipofinalizadoraStore();
  const tipoF = Form.useWatch("tipoFinalizadora", form);
  const codigoSim = Form.useWatch("cod_int_sap_sim", form);
  const [tpSelecionado, setTpSelecionado] = useState<ITipoFinalizadoraFormValues>();

  const onFinish = (values: any) => {
   add({ ...values, finalizadora: tpSelecionado })
   form.resetFields();

  };

  useEffect(() => {
    if (valoresIniciais) {
      const objT = tipoFinalizadora.find(
        //@ts-ignore
        (e) => e.id === valoresIniciais.tipoFinalizadora
      );
      setTpSelecionado(objT);
      form.setFieldsValue(valoresIniciais);
    }
    const carregarRedes = async () => {
      try {
        await fetchRede();
        await fetchBandeira();
        await fetch();
      } catch (error) {
        message.error("Erro ao carregar redes");
      }
    };
    carregarRedes();
  }, []);

  const isSalvarHabilitado = !!codigoSim && !!tipoF;
  const isTipo = !!tipoF;

  return (
    <>
      <Divider orientation="left">Cadastro de finalizadora</Divider>

      <Form
        variant="underlined"
        layout="inline"
        // initialValues={valoresIniciais}
        form={form}
        onFinish={onFinish}
      >
        <StandardDescriptionsForm
          data={[
            {
              label: (
                <>
                  <BarcodeOutlined style={{ marginRight: 8 }} />
                  Código do SIM
                </>
              ),
              children: (
                <Form.Item
                  name="cod_int_sap_sim"
                  rules={[
                    { required: true, message: "Informe o código do SIM" },
                    {
                      pattern: /^\d{4}$/,
                      message: "O código deve conter exatamente 4 números",
                    },
                  ]}
                >
                  <Input
                    // disabled={isTipo}
                    placeholder="Digite o código"
                    allowClear
                    maxLength={4}
                  />
                </Form.Item>
              ),
            },
            {
              label: (
                <>
                  <TagsOutlined style={{ marginRight: 8 }} />
                  Tipo da Finalizadora
                </>
              ),
              children: (
                <Form.Item
                  name="tipoFinalizadora"
                  rules={[{ required: true, message: "Selecione o tipo" }]}
                >
                  <Select
                    prefix={<FileTextOutlined />}
                    showSearch
                    placeholder="Selecione um tipo."
                    optionFilterProp="label"
                    onChange={(values) => {
                      const objT = tipoFinalizadora.find(
                        //@ts-ignore
                        (e) => e.id === values
                      );
                      setTpSelecionado(objT);
                    }}
                    style={{ width: 180 }}
                    allowClear
                    options={tipoFinalizadora.map(
                      //@ts-ignore
                      (e) => ({
                      key: e.id,
                      value: e.id,
                      label: e.descricao,
                    }))}
                  />
                  {/* <Select placeholder="Selecione um tipo.">
                    {tipoFinalizadora.map((e) => (
                      <Option key={e.id} value={e.descCod}>{e.descricao}</Option>
                    ))}
                  </Select> */}
                </Form.Item>
              ),
            },
          ]}
          column={1}
        />

        <Divider />

        {
          //@ts-ignore
          ["Rede/Bandeira"].includes(tpSelecionado?.descCod) && (
            <>
              <Divider orientation="left">Rede e Bandeira</Divider>
              <StandardDescriptionsForm
                data={[
                  {
                    label: (
                      <>
                        <CreditCardOutlined style={{ marginRight: 8 }} />{" "}
                        Rede/Bandeira
                      </>
                    ),
                    children: <CombinacaoRedeBandeira redes={redes} bandeiras={Bandeiras} />,
                  },
                ]}
                column={0}
              />
            </>
          )
        }

        {
          //@ts-ignore
          ["Código finalizadora"].includes(tpSelecionado?.descCod) && (
            <>
              <Divider orientation="left">Finalizadora</Divider>
              <StandardDescriptionsForm
                data={[
                  {
                    label: (
                      <>
                        <TagsOutlined style={{ marginRight: 8 }} /> Código
                        finalizadora{" "}
                      </>
                    ),
                    children: <CombinacaoFinalizadora value={tipoF} />,
                  },
                ]}
                column={0}
              />
            </>
          )
        }

        <Divider />

        <Form.Item style={{ width: "100%" }}>
          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              disabled={!isSalvarHabilitado}
            >
              Salvar
            </Button>
            <Button onClick={() => form.resetFields()}>Limpar</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export const CadastrotipoFinalizadora = ({
  initialValues,
  loading,
}: tipoFinalizadoraFormProps) => {
  const { add } = tipofinalizadoraStore();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    add(values)
     form.resetFields();
     message.info("Dados salvos com sucesso!")
  };

  return (
    <>
      <Divider orientation="left">Tipo de finalizadora</Divider>
      <Form
        variant="underlined"
        layout="inline"
        initialValues={initialValues}
        form={form}
        onFinish={onFinish}
      >
        <StandardDescriptionsForm
          data={[
            {
              label: (
                <>
                  <FileTextOutlined style={{ marginRight: 8 }} /> Tipo{" "}
                </>
              ),
              children: (
                <>
                  <Form.Item
                    name="idTipo"
                    rules={[{ required: true, message: "Selecione o Código" }]}
                  >
                    <Select placeholder="Selecione o tipo">
                      <Option value="0">Rede/Bandeira</Option>
                      <Option value="1">Código finalizadora</Option>
                    </Select>
                  </Form.Item>
                </>
              ),
            },
            {
              label: (
                <>
                  <BarcodeOutlined style={{ marginRight: 8 }} /> Código{" "}
                </>
              ),
              children: (
                <>
                  <Form.Item
                    name="id"
                    rules={[
                      { required: true, message: "Informe o código do SIM" },
                    ]}
                  >
                    <Input
                      placeholder="Digite o código"
                      allowClear
                      maxLength={4}
                    />
                  </Form.Item>
                </>
              ),
            },
            {
              label: (
                <>
                  <HighlightOutlined style={{ marginRight: 8 }} />
                  Descrição
                </>
              ),
              children: (
                <>
                  <Form.Item name={["descricao"]} rules={[{ required: true }]}>
                    <Input placeholder="Descrição" allowClear />
                  </Form.Item>
                </>
              ),
            },
            
          ]}
          column={1}
        />
        <Form.Item style={{ width: "100%" }}>
          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Salvar
            </Button>
            <Button onClick={() => form.resetFields()}>Limpar</Button>
          </Space>
        </Form.Item>
      </Form>
     <StandardDescriptionsForm 
        data={[{
          label: '',
          children: <TipoFinalizadoraList />
        }]} column={0}
      />
    </>
  );
};

export default CadastroFinalizadoraSAP;
