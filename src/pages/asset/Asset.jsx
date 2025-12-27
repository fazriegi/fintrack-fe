import { Button, Tag, theme } from "antd";
import numeral from "numeral";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ListingTable from "src/components/ListingTable";
import PageHeader from "src/components/PageHeader";

export default function Asset() {
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
          onClick={() => navigate(`/assets/${record.id}`)}
        >
          {record.name}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      showSorter: true,
    },
    {
      title: "Purchase Price",
      dataIndex: "purchase_price",
      key: "purchase_price",
      render: (_, rec) => numeral(rec.purchase_price).format("0,0[.]00"),
      showSorter: true,
    },
    {
      title: "Total Purchase price",
      dataIndex: "total_purchase_price",
      key: "total_purchase_price",
      showSorter: true,
      render: (_, rec) => numeral(rec.total_purchase_price).format("0,0[.]00"),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      showSearch: true,
      showSorter: true,
      render: (_, { status }) => {
        const colorMap = {
          active: "green",
          sold: "red",
          archived: "default",
        };

        return (
          <Tag color={colorMap[status] || "default"}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/assets/add");
  };

  return (
    <>
      <PageHeader breadCrumb={["Assets"]} />
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

      <ListingTable columns={columns} endpoint="/api/v1/asset/list" />
    </>
  );
}
