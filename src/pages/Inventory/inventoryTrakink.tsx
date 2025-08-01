import React, { useEffect, useMemo, useState } from "react";
import { BaseLayout } from "@/components/layout/BaseLayout";
import {
  Timeline,
  Typography,
  Tag,
  Space,
  Empty,
  Spin,
  message,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useMovimento } from "@/hooks/useEstoque";
import { Movimentacao, ProductInventory } from "@/types/inventory";
import FiltroFormBase from "@/components/form/FiltroFormBase";
import { dataHoraAtualFormato } from "@/utils/dataSistem";
import { ColumnsType } from "antd/es/table";
import { StandardTable } from "@/components/table/StandardTable";

dayjs.extend(utc);
const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const tipoCor: Record<string, string> = {
  bloqueio: "red",
  desbloqueio: "green",
  inventario: "blue",
  entrada: "cyan",
  saida: "orange",
};

interface Props {
  initialValues?: ProductInventory | null;
  onSubmit: (values: ProductInventory) => void;
  title?: string;
  loading?: boolean;
}

const formatFirebaseDate = (data: {
  _seconds: number;
  _nanoseconds: number;
}) => {
  return dayjs.unix(data._seconds).format("DD/MM/YYYY HH:mm");
};

const MovimentacaoTracking: React.FC = () => {
  const { create } = useMovimento();
  const [form] = Form.useForm();
  const [filtros, setFiltros] = useState<any>({});
  const [movimentos, setMovimentos] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    onFinish;
  }, []);

  const onFinish = (values: any) => {
    const { produtoId, tipo, origem, range } = values;
    const de = range?.[0]?.toISOString() || "";
    const ate = range?.[1]?.toISOString() || "";

    if (produtoId !== undefined || tipo !== undefined) {
      setLoading(true);
      create.mutate(
        {
          produtoId,
          tipo,
          origem,
          de,
          ate,
        },
        {
          onSuccess: (data) => {
            setMovimentos(data);
            setLoading(false);
            setFiltros("");
          },
          onError: () => {
            message.error("Erro ao buscar movimentações");
            setLoading(false);
          },
        }
      );
    }
  };
  // const movimentacoes: Movimentacao[] = useMemo(() => {
  //   const list = Array.isArray(movimentos) ? movimentos : [];
  //   //@ts-ignore
  //   return list.filter((u) =>u.produtoId.includes(filtros.produtoId)
  //   );
  // }, [movimentos, filtros]);

  const columns: ColumnsType<Movimentacao> = [
    {
      title: "Código Produto",
      dataIndex: "produtoId",
      key: "produtoId",
      align: "justify",
      width: 50,
      // sorter: (a, b) => a.gtin.localeCompare(b.email),
      render: (_: any, record: Movimentacao) => (
        <div>
          <span>{[record.produtoId]}</span>
        </div>
      ),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Data do Movimento",
      dataIndex: "data",
      key: "data",
      align: "center",
      width: 50,
   
        render: (_: any, record: Movimentacao) => (
        <div>
          <Tag color={tipoCor[record.tipo] || "default"}>
            {dataHoraAtualFormato(record.data)}
          </Tag>
        </div>
      ),
      
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      align: "center",
      width: 40,
      sortDirections: ["ascend", "descend"],
      render: (_: any, record: Movimentacao) => (
        <div>
          <Tag color={tipoCor[record.tipo] || "default"}>
            {record.tipo.toUpperCase()}
          </Tag>
        </div>
      ),
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
      align: "center",
      width: 30,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Referencia Pedido",
      dataIndex: "referenciaPedido",
      key: "referenciaPedido",
      width: 40,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Referencia origem",
      dataIndex: "origem",
      key: "origem",
      width: 80,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Observação",
      dataIndex: "observacao",
      key: "observacao",
      width: 100,
      sortDirections: ["ascend", "descend"],
    },
    //   {
    //   title: "lastRefreshTime",
    //   dataIndex: "tokensValidAfterTime",
    //   key: "lastRefreshTime",
    //   align: "center",
    //   width: 180,
    //   sortDirections: ["ascend", "descend"],
    //   render: (_: any, grupo: FirebaseUserResponse) => (
    //     <div>
    //       <span>{converterParaFormatoBR([grupo.metadata.lastRefreshTime])}</span>
    //     </div>
    //   ),
    // },
    //   {
    //   title: "lastSignInTime",
    //   dataIndex: "tokensValidAfterTime",
    //   key: "lastSignInTime",
    //   align: "center",
    //   width: 180,
    //   sortDirections: ["ascend", "descend"],
    //   render: (_: any, grupo: FirebaseUserResponse) => (
    //     <div>
    //       <span>{converterParaFormatoBR([grupo.metadata.lastSignInTime])}</span>
    //     </div>
    //   ),
    // },
    //  {
    //   title: "Role",
    //   key: "Role",
    //   width: 180,
    //   // dataIndex: ["customClaims", "role"],
    //   render: (_: any, grupo: FirebaseUserResponse) => (
    //     <div>
    //       <span>{grupo.customClaims?.role.join(" /") || "Sem role"}</span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "emailVerified",
    //   dataIndex: "emailVerified",
    //   key: "emailVerified",
    //   align: "center",
    //   width: 180,
    //   sortDirections: ["ascend", "descend"],
    //   render: (_: any, grupo: FirebaseUserResponse) => (
    //     <Tag color={grupo.emailVerified ? "green" : "red"}>
    //       {grupo.emailVerified ? "Sim" : "Não"}
    //     </Tag>
    //   ),
    // },
    // {
    //   title: "disabled",
    //   dataIndex: "disabled",
    //   key: "disabled",
    //   align: "center",
    //   width: 180,
    //   sortDirections: ["ascend", "descend"],
    //   render: (_: any, grupo: FirebaseUserResponse) => (
    //     <Tag color={grupo.disabled ? "green" : "red"}>
    //       {grupo.disabled ? "Sim" : "Não"}
    //     </Tag>
    //   ),
    // },
    // {
    //   title: "Ações",
    //   key: "acoes",
    //   align: "center",
    //   fixed: "right",
    //   width: 180,
    //   render: (_: any, user: FirebaseUserResponse) => (
    //      <TableActions
    //               onSwitch={() => disableUser({uid: user.uid, disabled: user.disabled})}
    //               onDelete={ () => handleDelete(user.uid)}
    //               onEdit={() => handleEdit(user)}
    //               customButtons={<>
    //                 <Button type="text" variant="solid" icon={<Tooltip title="Reenviar senha"><UnlockOutlined   style={{color: '#005bac'}}/></Tooltip>} onClick={()=>ResetLink({email:user.email})}></Button>
    //                 <Button type="text" variant="solid" icon={<Tooltip title="Reenviar confirmação de email"><FileProtectOutlined    style={{color: '#005bac'}}/></Tooltip>} onClick={()=>ValidateEmail({email:user.email})}></Button>
    //               </>}
    //               onSwitchDisbled={user.disabled}
    //               onJoinStatus={false}
    //             />
    //   ),
    // },
  ];
  return (
    <>
      <FiltroFormBase
        form={form}
        campos={[
          {
            key: "produtoId",
            label: "Código do Produto",
            component: <Input placeholder="GTIN (produtoId)" />,
          },
          {
            key: "tipo",
            label: "Tipo",
            component: (
              <Select placeholder="Tipo" allowClear style={{ width: 130 }}>
                <Option value="entrada">Entrada</Option>
                <Option value="saida">Saída</Option>
                <Option value="bloqueio">Bloqueio</Option>
                <Option value="desbloqueio">Desbloqueio</Option>
                <Option value="inventario">Inventário</Option>
              </Select>
            ),
          },
          {
            key: "origem",
            label: "Origem",
            component: <Input placeholder="Origem" />,
          },
          {
            key: "range",
            label: "Periodo",
            component: <RangePicker format="DD/MM/YYYY" />,
          },
        ]}
        onBuscar={(values) => onFinish({ ...filtros, ...values })}
        onLimpar={() => {
          setMovimentos([] as Movimentacao[]);
          // form.resetFields();
        }}
      />

      {loading ? (
        <Spin tip="Carregando movimentações..." />
      ) : movimentos.length === 0 ? (
        <Empty description="Nenhuma movimentação encontrada" />
      ) : (
        <>
          <StandardTable
            bordered
            style={{ paddingTop: 4, paddingBottom: 4 }}
            columns={columns}
            dataSource={movimentos}
            // loading={isLoading}
            scroll={{ x: 1500, y: 300 }}
            size="small"
            pagination={{
              pageSize: pageSize,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              showTotal: (total) => `Total de registros: ${total}`,
              onShowSizeChange: (_, size) => setPageSize(size),
            }}
          />
          {/* <Text strong>Produto (GTIN): </Text>
          <Text code>{movimentos[0]?.produtoId}</Text>

          <Timeline style={{ marginTop: 24 }}>
            {movimentos.map((mov) => (
              <Timeline.Item
                key={mov.id}
                color={tipoCor[mov.tipo] || "gray"}
                label={dataHoraAtualFormato(mov.data)}
              >
                <Space direction="vertical">
                  <Text>
                    <Tag color={tipoCor[mov.tipo] || "default"}>
                      {mov.tipo.toUpperCase()}
                    </Tag>{" "}
                    <strong>{mov.quantidade}</strong> unidades
                  </Text>
                  {mov.origem && (
                    <Text>
                      <strong>Origem:</strong> {mov.origem}
                    </Text>
                  )}
                  {mov.referenciaPedido && (
                    <Text>
                      <strong>Pedido:</strong> {mov.referenciaPedido}
                    </Text>
                  )}
                  {mov.observacao && (
                    <Text>
                      <strong>Obs:</strong> {mov.observacao}
                    </Text>
                  )}
                </Space>
              </Timeline.Item>
            ))}
          </Timeline> */}
        </>
      )}
    </>
  );
};

export default MovimentacaoTracking;
