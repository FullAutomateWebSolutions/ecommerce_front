import { BaseLayout } from "@/components/layout/BaseLayout";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { PageActions } from "@/components/layout/PageActions";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardTable } from "@/components/table/StandardTable";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import ModalBase from "@/components/ui/ModalBase";
import { CadastroBandeiraEditar } from "./CadastroBandeiraEditar.page";
import { mockDado } from "./CadastroRede.page";
export interface IBandeira {
  idRede: string;
  idBandeira: string;
  descricao: string;
}
export const mockDadoBandeira: IBandeira[] = 
[{idRede:'012',idBandeira:'015',descricao:'BRASILCARD '},
{idRede:'012',idBandeira:'204',descricao:'BRASILCARD SENHA '},
{idRede:'013',idBandeira:'091',descricao:'SYSDATA '},
{idRede:'013',idBandeira:'274',descricao:'FORTBRASIL '},
{idRede:'028',idBandeira:'313',descricao:'UP ALIM '},
{idRede:'028',idBandeira:'482',descricao:'UP BEN '},
{idRede:'028',idBandeira:'443',descricao:'UP COMB '},
{idRede:'028',idBandeira:'312',descricao:'UP DEB '},
{idRede:'028',idBandeira:'311',descricao:'UP GO '},
{idRede:'041',idBandeira:'061',descricao:'BONUS '},
{idRede:'041',idBandeira:'339',descricao:'VEGAS CARD VOUCHER '},
{idRede:'041',idBandeira:'340',descricao:'REDECOMPRAS CRED '},
{idRede:'041',idBandeira:'349',descricao:'VEGAS CARD ALIM '},
{idRede:'041',idBandeira:'338',descricao:'BIQ VOUCHER '},
{idRede:'041',idBandeira:'123',descricao:'VEGAS CARD CRED '},
{idRede:'045',idBandeira:'065',descricao:'INCOMM '},
{idRede:'057',idBandeira:'085',descricao:'BANESECARD CRED '},
{idRede:'071',idBandeira:'082',descricao:'ECXCARD '},
{idRede:'071',idBandeira:'415',descricao:'ECXCARD CRED '},
{idRede:'073',idBandeira:'108',descricao:'PLANVALE '},
{idRede:'073',idBandeira:'117',descricao:'UNIK '},
{idRede:'073',idBandeira:'131',descricao:'GOODVALE '},
{idRede:'073',idBandeira:'136',descricao:'SYSPROCARD '},
{idRede:'073',idBandeira:'196',descricao:'GOODCARD SENHA '},
{idRede:'073',idBandeira:'319',descricao:'GETNET CRED '},
{idRede:'073',idBandeira:'320',descricao:'GETNET DEB '},
{idRede:'073',idBandeira:'321',descricao:'GETNET VOUCHER '},
{idRede:'073',idBandeira:'056',descricao:'GOODCARD '},
{idRede:'075',idBandeira:'057',descricao:'FIC '},
{idRede:'086',idBandeira:'381',descricao:'VALESHOP ALIM '},
{idRede:'086',idBandeira:'382',descricao:'VALESHOP REF '},
{idRede:'086',idBandeira:'383',descricao:'VALESHOP BEN '},
{idRede:'086',idBandeira:'385',descricao:'VALESHOP DEB '},
{idRede:'086',idBandeira:'386',descricao:'VALESHOP CRED '},
{idRede:'090',idBandeira:'040',descricao:'CELULAR '},
{idRede:'090',idBandeira:'130',descricao:'BRTELECOM '},
{idRede:'090',idBandeira:'143',descricao:'CLARO '},
{idRede:'090',idBandeira:'144',descricao:'OI '},
{idRede:'090',idBandeira:'145',descricao:'TIM '},
{idRede:'090',idBandeira:'146',descricao:'TELEMIG '},
{idRede:'090',idBandeira:'150',descricao:'TELEMAR '},
{idRede:'090',idBandeira:'151',descricao:'ALGAR CELULAR '},
{idRede:'090',idBandeira:'152',descricao:'ALGAR FIXO '},
{idRede:'090',idBandeira:'156',descricao:'NEXTEL '},
{idRede:'090',idBandeira:'157',descricao:'VIVO '},
{idRede:'094',idBandeira:'350',descricao:'VALE REAL '},
{idRede:'094',idBandeira:'351',descricao:'BANESE ALIM '},
{idRede:'095',idBandeira:'162',descricao:'CREDI-SHOP '},
{idRede:'102',idBandeira:'028',descricao:'VR '},
{idRede:'102',idBandeira:'054',descricao:'VALETIK '},
{idRede:'102',idBandeira:'165',descricao:'VEROCHEQUE '},
{idRede:'102',idBandeira:'196',descricao:'GOODCARD SENHA '},
{idRede:'102',idBandeira:'253',descricao:'VR BENEFICIO '},
{idRede:'102',idBandeira:'272',descricao:'ELO REFEICAO '},
{idRede:'102',idBandeira:'273',descricao:'ELO ALIMENTACAO '},
{idRede:'102',idBandeira:'275',descricao:'AVISTA '},
{idRede:'102',idBandeira:'292',descricao:'ALELO ALIMENTACAO '},
{idRede:'102',idBandeira:'291',descricao:'ALELO REFEICAO '},
{idRede:'102',idBandeira:'062',descricao:'ALELO '},
{idRede:'102',idBandeira:'392',descricao:'BEN ALIMENTACAO '},
{idRede:'102',idBandeira:'391',descricao:'BEN REFEICAO '},
{idRede:'102',idBandeira:'105',descricao:'CIELO '},
{idRede:'102',idBandeira:'021',descricao:'ELECTRON '},
{idRede:'102',idBandeira:'023',descricao:'J.C.B. '},
{idRede:'102',idBandeira:'326',descricao:'VALECARD VOUCHER '},
{idRede:'102',idBandeira:'194',descricao:'ELO DEBITO '},
{idRede:'102',idBandeira:'239',descricao:'CREDZ '},
{idRede:'102',idBandeira:'069',descricao:'GREENCARD '},
{idRede:'102',idBandeira:'256',descricao:'VR REFEICAO '},
{idRede:'102',idBandeira:'254',descricao:'VR AUTO '},
{idRede:'102',idBandeira:'465',descricao:'TICKET FLEX '},
{idRede:'103',idBandeira:'008',descricao:'MASTERCARD DEB '},
{idRede:'103',idBandeira:'016',descricao:'TICKET '},
{idRede:'103',idBandeira:'017',descricao:'HIPERCARD '},
{idRede:'103',idBandeira:'021',descricao:'ELECTRON '},
{idRede:'103',idBandeira:'022',descricao:'REDE '},
{idRede:'103',idBandeira:'108',descricao:'PLANVALE '},
{idRede:'103',idBandeira:'304',descricao:'HIPER DEB '},
{idRede:'103',idBandeira:'388',descricao:'SODEXO PREMIUM '},
{idRede:'103',idBandeira:'465',descricao:'TICKET FLEX '},
{idRede:'103',idBandeira:'355',descricao:'CABAL ALIMENTACAO '},
{idRede:'103',idBandeira:'192',descricao:'NUTRICASH '},
{idRede:'103',idBandeira:'003',descricao:'AMEX '},
{idRede:'103',idBandeira:'059',descricao:'CABAL CRED '},
{idRede:'103',idBandeira:'128',descricao:'CABAL DEB '},
{idRede:'103',idBandeira:'005',descricao:'DINERS '},
{idRede:'103',idBandeira:'195',descricao:'ELO CREDITO '},
{idRede:'103',idBandeira:'194',descricao:'ELO DEBITO '},
{idRede:'103',idBandeira:'001',descricao:'VISA '},
{idRede:'103',idBandeira:'002',descricao:'MASTERCARD '},
{idRede:'103',idBandeira:'271',descricao:'SODEXO ALIMENTACAO '},
{idRede:'103',idBandeira:'248',descricao:'SODEXO REFEICAO '},
{idRede:'103',idBandeira:'389',descricao:'SODEXO COMBUSTIVEL '},
{idRede:'103',idBandeira:'390',descricao:'SODEXO GIFT '},
{idRede:'103',idBandeira:'290',descricao:'TICKET ALIMENTACAO '},
{idRede:'103',idBandeira:'093',descricao:'TICKET RESTAURANTE '},
{idRede:'105',idBandeira:'132',descricao:'REDESOFTNEX SENHA '},
{idRede:'105',idBandeira:'213',descricao:'REDESOFTNEX CONV '},
{idRede:'105',idBandeira:'214',descricao:'REDESOFTNEX '},
{idRede:'105',idBandeira:'245',descricao:'ABRAPETITE '},
{idRede:'108',idBandeira:'002',descricao:'MASTERCARD '},
{idRede:'108',idBandeira:'003',descricao:'AMEX '},
{idRede:'108',idBandeira:'008',descricao:'MASTERCARD DEB '},
{idRede:'108',idBandeira:'017',descricao:'HIPERCARD '},
{idRede:'108',idBandeira:'021',descricao:'ELECTRON '},
{idRede:'108',idBandeira:'194',descricao:'ELO DEBITO '},
{idRede:'108',idBandeira:'291',descricao:'ALELO REFEICAO '},
{idRede:'108',idBandeira:'292',descricao:'ALELO ALIMENTACAO '},
{idRede:'108',idBandeira:'391',descricao:'BEN REFEICAO '},
{idRede:'108',idBandeira:'392',descricao:'BEN ALIMENTACAO '},
{idRede:'108',idBandeira:'001',descricao:'VISA '},
{idRede:'108',idBandeira:'195',descricao:'ELO CREDITO '},
{idRede:'109',idBandeira:'200',descricao:'USECRED SENHA '},
{idRede:'109',idBandeira:'538',descricao:'USECRED ALIM '},
{idRede:'109',idBandeira:'541',descricao:'USECRED BEN '},
{idRede:'109',idBandeira:'199',descricao:'USECRED CRED '},
{idRede:'113',idBandeira:'209',descricao:'PLANVALE SENHA '},
{idRede:'113',idBandeira:'211',descricao:'REDECON SENHA '},
{idRede:'113',idBandeira:'277',descricao:'SOLUCARD SENHA '},
{idRede:'113',idBandeira:'210',descricao:'REDECON '},
{idRede:'113',idBandeira:'121',descricao:'SOLUCARD '},
{idRede:'146',idBandeira:'070',descricao:'TELENET CRED '},
{idRede:'146',idBandeira:'188',descricao:'BNB CLUBE VOUCHER '},
{idRede:'146',idBandeira:'352',descricao:'PERSONAL CARD VOUCHER '},
{idRede:'146',idBandeira:'353',descricao:'BNB CLUBE CRED '},
{idRede:'146',idBandeira:'366',descricao:'PERSONAL CARD DEB '},
{idRede:'146',idBandeira:'367',descricao:'BNB CLUBE DEB '},
{idRede:'146',idBandeira:'368',descricao:'TELENET VOUCHER '},
{idRede:'146',idBandeira:'068',descricao:'PERSONAL CARD CRED '},
{idRede:'157',idBandeira:'413',descricao:'TICKET LOG DEBITO '},
{idRede:'157',idBandeira:'414',descricao:'TICKET LOG FROTA '},
{idRede:'157',idBandeira:'412',descricao:'TICKET LOG CREDITO '},
{idRede:'158',idBandeira:'417',descricao:'TODO VOUCHER '},
{idRede:'160',idBandeira:'433',descricao:'PAGBANK '},
{idRede:'164',idBandeira:'460',descricao:'PICPAY '},
{idRede:'165',idBandeira:'466',descricao:'RAPPI '},
{idRede:'170',idBandeira:'504',descricao:'SEICON VOUCHER '},
{idRede:'170',idBandeira:'503',descricao:'SEICON CRED '},
{idRede:'172',idBandeira:'033',descricao:'SENFF CRED '},
{idRede:'173',idBandeira:'488',descricao:'LECARD VOUCHER '},
{idRede:'173',idBandeira:'489',descricao:'LECARD CRED '},
{idRede:'174',idBandeira:'526',descricao:'BKBANK BEN '},
{idRede:'176',idBandeira:'533',descricao:'SOLUCARD CRED '},
{idRede:'176',idBandeira:'534',descricao:'SOLUCARD BEN '},
{idRede:'177',idBandeira:'529',descricao:'STIX '},


];
const CadastroBandeira = () => {
  const [data, setData] = useState<IBandeira[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({ descricao: "", idBandeira: "", idRede: "" });
    const [pageSize, setPageSize] = useState<number>(5);
  const navigate = useNavigate();
  useEffect(() => {
    handleBuscar();
  }, []);
  const handleBuscar = () => {
    setLoading(true);
    setTimeout(() => {
      let resultado = mockDadoBandeira;

      if (filtros.descricao) {
        resultado = resultado.filter((p) =>
          p.descricao.toLowerCase().includes(filtros.descricao.toLowerCase())
        );
      }

      if (filtros.idBandeira) {
        resultado = resultado.filter((p) => p.idBandeira === filtros.idBandeira);
      }

      if (filtros.idRede) {
        resultado = resultado.filter((p) => p.idRede === filtros.idRede);
      }
      setData(resultado);
      setLoading(false);
    }, 500); // simula requisição
  };

  const handleInputChange = (changedValues: any) => {
    setFiltros((prev) => ({ ...prev, ...changedValues }));
  };

  const handleAtualizar = () => {
    handleBuscar();
  };

  const handleEditar = (id: string, descricao: string,idRede: string) => {
    navigate(`/Bandeira/${id}/${descricao}/${idRede}`);
  };

  const handleCreate = () => {
    navigate(`/Bandeira/create`);
  };
  

  const columns: ColumnsType<IBandeira> = [
    { title: "Código de rede", dataIndex: "idRede", key: "idRede" },

    { title: "Descrição", dataIndex: "descricao", key: "descricao" },
    { title: "Código de Bandeira", dataIndex: "idBandeira", key: "idBandeira" },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) =><PageActions onEdit={() => handleEditar(record.idBandeira, record.descricao,record.idRede)}/> ,
    },
  ];

  return (
    <BaseLayout
      title={"Cadastro de Bandeira"}
      breadcrumb={["Gestão de processos", "Cadastro de Bandeira"]}
      actions={
        <PageActions
          onCreate={() => handleCreate()}
          onRefresh={handleAtualizar}
          onExcel={() => alert("Download Excel.........")}
        />
      }
    >
      <SectionCard title="Filtros de Busca">
        <Form layout="vertical" onValuesChange={handleInputChange}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Buscar por descrição" name="descricao">
                <Input placeholder="Ex: CIELO" allowClear />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Código de Bandeira" name="idBandeira">
                <Input placeholder="Ex: 030" allowClear />
              </Form.Item>
            </Col>
             <Col span={8}>
              <Form.Item label="Rede" name="idRede">
                <Select placeholder="Todas" allowClear>
                  {mockDado.map(e => (
                    <Select.Option value={e.idRede}>
                     {e.descricao}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} style={{ display: "flex", alignItems: "flex-end" }}>
              <Space>
                <Button
                  onClick={handleBuscar}
                  className="ant-btn ant-btn-primary"
                >
                  Filtrar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </SectionCard>
      <SectionCard title="Bandeiras cadastradas">
        <StandardTable columns={columns} dataSource={data} loading={loading} 
        pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    showTotal: (total) => `Total de registros: ${total}`,
                    onShowSizeChange: (_, size) => setPageSize(size),
                  }}/>
      </SectionCard>

   
    </BaseLayout>
  );
};

export default CadastroBandeira;
