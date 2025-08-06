import React, { useEffect, useMemo, useState } from "react";
import {
  List,
  Avatar,
  Typography,
  Spin,
  Form,
  DatePicker,
  Button,
  notification,
} from "antd";
import { StandardTable } from "@/components/table/StandardTable";
import { ColumnsType, ColumnType } from "antd/es/table";
import { Input } from "antd/lib";
import { dados } from "@/pages2/testes/CadastroRedeModelo.page";
import { useForm, useWatch } from "antd/lib/form/Form";
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";

import {
  converterParaFormatoBRSimples,
  converterParaFormatoBRSimplesRangePicker,
} from "@/utils/dataSistem";
import { useMercadoLivre } from "@/hooks/useMercadoLivre";
import { CollapseSection } from "@/components/ui/CollapseSection";
const { Link } = Typography;

type TrendItem = {
  id: string;
  keyword: string;
  data_inclusao: string;
  data_atualizacao?: string;
  posts: number;
  url: string;
};

type ProductData = {
  id: string;
  keyword: string;
  data_inclusao: string;
  data_atualizacao: string;
  posts: number;
  url: string;
};

const MercadoLivreTrends: React.FC = () => {
  const [form] = Form.useForm();
  // const data_inicio = Form.useWatch("data_inicio");
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<String>("");
  const [dateFiltro, setDateFiltro] = useState<String[]>([]);
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const { listByDate } = useMercadoLivre();
  const rangeAt = Form.useWatch("rangeAt", form);

  // const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null);

  const dados = useMemo(() => {
    const ate = dayjs(rangeAt).format("DD/MM/YYYY");
    const filtros = data
      ?.filter((e) => {
        const descricao = e.keyword
          ? e.keyword.toLowerCase().includes(filter.toLowerCase())
          : false;
        // const data_atualizacao = e.data_atualizacao
        //   ? e.data_atualizacao.includes(ate)
        //   : false;

        return  descricao;
      })
      .sort((a, b) => {
        return b.posts - a.posts;
      });
    return filtros;
  }, [filter, data]);

  const colunas: ColumnsType<ProductData> = [
    // {
    //   key: "id",
    //   dataIndex: "id",
    //   title: "ID"
    // },
    {
      key: "posts",
      dataIndex: "posts",
      title: "Verificações",
      sorter: (a: any, b: any) => a.posts - b.posts,
    },
    {
      key: "keyword",
      dataIndex: "keyword",
      title: "Descrição",
      render: (_: any, record: ProductData) => (
        <>{record.keyword.toUpperCase()}</>
      ),
    },
    {
      key: "data_inclusao",
      dataIndex: "data_inclusao",
      title: "Data_inclusao",
    },
    {
      key: "data_atualizacao",
      dataIndex: "data_atualizacao",
      title: "Data_atualizacao",
    },

    //  {
    //   key: "url",
    //   dataIndex: "url",
    //   title: "Url",
    //   render: (_: any, item) => (
    //     <>
    //      <Link href={item.url} target="_blank">Clique para ver no Mercado Livre</Link>
    //     </>
    //   ),
    // },
  ];

  function handleFinish(values: any): void {
    const { range } = values;

    const de = dayjs(range).format("DD/MM/YYYY");
    // console.log(dayjs(range).format("DD/MM/YYYY - HH:mm:ss"))

    listByDate.mutate(de, {
      onSuccess: (data) => {
        setData(
          data.sort((a, b) => {
            return a.posts - b.posts;
          })
        );
      },
      onError: (error) => {
        notification.error(error);
      },
    });
  }

  return (
    <>
      <CollapseSection
        defaultActiveKeys={["1", "2"]}
        sections={[
          {
            key: "2",
            title: "Filtro",
            extra: (
              <>
                <Form form={form} onFinish={(e) => handleFinish(e)}>
                  <Form.Item name="range" label="De">
                    <DatePicker format={"DD/MM/YYYY"} />
                  </Form.Item>
                  {/* <Form.Item name="rangeAt" label="Até">
                    <DatePicker format={"DD/MM/YYYY"} />
                  </Form.Item> */}
                  <Form.Item name="busca">
                    <Input
                      name="busca"
                      placeholder="Buscar por descrição"
                      allowClear
                      onChange={(valor) => setFilter(valor.target.value)}
                    />
                  </Form.Item>
                  <Button type="primary" target="_blank" htmlType="submit">
                    Enviar
                  </Button>
                </Form>
              </>
            ),
            showArrow: true,
            content: (
              <>
                <StandardTable
                  bordered
                  style={{ paddingTop: 4, paddingBottom: 4 }}
                  columns={colunas}
                  dataSource={dados}
                  // loading={}
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
    </>
  );
};

export default MercadoLivreTrends;
