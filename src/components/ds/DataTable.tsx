import { Table } from "antd";
import type { TableProps } from "antd";

export const DataTable = <T extends object>(props: TableProps<T>) => {
  return (
    <Table
      rowKey="id"
      pagination={{ pageSize: 10 }}
      size="middle"
      bordered
      {...props}
    />
  );
};
