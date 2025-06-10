import { FilterOutlined, SettingOutlined } from "@ant-design/icons";
import { Col, Collapse, Form, Input, Select, Space, Splitter } from "antd";
import { StandardForm } from "../form/StandardForm";
import { PageActions } from "../layout/PageActions";
import { SectionCard } from "./SectionCard";
const { Panel } = Collapse;

interface SplitterBaseProps {
  defaultActiveKey: string[];
  onSubmit: (values: any) => void;
  SplitterBasePainelFilter: SplitterBasePainel[];
  loading?: boolean;
  SplitterBasePainelTable: React.ReactNode;
}
interface SplitterBasePainel {
  extra: React.ReactNode;
  key: string;
  header: React.ReactNode;
  childrenFormItem: React.ReactNode;
}
const SplitterBase = ({
  onSubmit,
  loading = false,
  SplitterBasePainelFilter,
  defaultActiveKey,
  SplitterBasePainelTable,
}: SplitterBaseProps) => {
  return (
    <Splitter style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      
      <Splitter.Panel defaultSize="25%" min="25%" max="50%" resizable={true}>
        <SectionCard title={""} children={
        <Collapse
          bordered={false}
          defaultActiveKey={defaultActiveKey}
          //  expandIcon={({ isActive }) => <SettingOutlined rotate={isActive ? 360 : 0} />}
          expandIconPosition={"end"}
          accordion
        >
          {SplitterBasePainelFilter.map((e) => (
            <Panel extra={e.extra} key={e.key} header={e.header}>
              <StandardForm
               childrenSubmit={<PageActions filterText="Aplicar" onFilter={()=>("")}/>}
                loading={loading}
                onSubmit={function (values: any): void {
                  onSubmit(values);
                }}
                children={e.childrenFormItem}
              />
            </Panel>
          ))}
        </Collapse>
        }/>
      </Splitter.Panel>
      <Splitter.Panel>{SplitterBasePainelTable}</Splitter.Panel>
    </Splitter>
  );
};

export default SplitterBase;
