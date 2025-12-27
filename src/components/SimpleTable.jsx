import { Table } from "antd";

export default function SimpleTable({ columns, data, ...tableProps }) {
  return (
    <Table
      {...tableProps}
      columns={columns}
      dataSource={data}
      scroll={{ x: "max(100%, 800px)", y: "calc(100vh - 280px)" }}
      listItemHeight={2}
      tableLayout="fixed"
      bordered
    />
  );
}
