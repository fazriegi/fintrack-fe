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
      title: "Current Value",
      dataIndex: "current_value",
      key: "current_value",
      showSorter: true,
      align: "right",
      render: (_, record) => numeral(record.current_value).format("0,0"),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "is_active",
      showSorter: true,
      align: "center",
      width: "10%",
      render: (_, { is_active }) => {
        const colorMap = {
          true: "green",
          false: "red",
          archived: "default",
        };

        return (
          <Tag color={colorMap[is_active] || "default"}>
            {is_active ? "Active" : "Inactive"}
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

      <ListingTable columns={columns} endpoint="/v1/assets" />
    </>
  );
}
