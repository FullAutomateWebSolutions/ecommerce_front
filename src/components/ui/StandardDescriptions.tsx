import { Descriptions } from 'antd';
import React from 'react';

/**
 * Mostra pares label → valor em modo somente-leitura
 */
interface StandardDescriptionsProps {
  /** objeto onde a chave é o rótulo e o valor é qualquer conteúdo React */
  data: Record<string, React.ReactNode>;
}
interface StandardDescriptionsFormProps {
  /** objeto onde a chave é o rótulo e o valor é qualquer conteúdo React */
  data: StandardDescriptions[];
  column: number
  title?: string
  extra?: React.ReactNode;

}
interface StandardDescriptions{
  label: React.ReactNode,
  children: React.ReactNode
}

export const StandardDescriptions = ({ data }: StandardDescriptionsProps) => (
  <Descriptions
    bordered
    column={1}
    size="middle"
    style={{ marginBottom: 24 }}
  >
    {Object.entries(data).map(([label, value]) => (
      <Descriptions.Item key={label} label={label}>
        {value}
      </Descriptions.Item>
    ))}
  </Descriptions>
);

export const StandardDescriptionsForm = ({ data,column,extra,title }: StandardDescriptionsFormProps) => (
  <Descriptions
    extra={extra}
    title={title}
    bordered
    column={column}
    
    size="small"
    style={{ marginBottom: 10 }}
  >
    {data.map((e, index) => (
      <Descriptions.Item  key={index} label={e.label}>
        {e.children}
      </Descriptions.Item>
    ))}
  </Descriptions>
);
