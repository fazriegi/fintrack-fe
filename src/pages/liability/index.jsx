import { Button, Tag, theme } from "antd";
import numeral from "numeral";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ListingTable from "src/components/ListingTable";
import PageHeader from "src/components/PageHeader";

export default function index() {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      showSearch: true,
      showSorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showSearch: true,
      showSorter: true,
      render: (_, record) => (
        <span
          style={{ cursor: "pointer", color: colorPrimary }}
          onClick={() => navigate(`/liabilities/${record.id}`)}
        >
          {record.name}
        </span>
      ),
    },
    {
      title: "Remaining Balance",
      dataIndex: "remaining_balance",
      key: "remaining_balance",
      showSorter: true,
      align: "right",
      render: (_, record) => numeral(record.remaining_balance).format("0,0"),
    },
  ];

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/liabilities/add");
  };

  return (
    <>
      <PageHeader breadCrumb={["Liabilities"]} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1em",
        }}
      >
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add
        </Button>
      </div>

      <ListingTable columns={columns} endpoint="/v1/liabilities" />
    </>
  );
}
