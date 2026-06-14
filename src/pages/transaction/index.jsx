import { useState, useMemo, useEffect } from "react";
import {
  Button,
  Card,
  Statistic,
  Row,
  Col,
  Segmented,
  DatePicker,
  Table,
  Space,
  Tag,
  Popconfirm,
  App,
} from "antd";
import {
  PlusOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import numeral from "numeral";
import dayjs from "dayjs";
import PageHeader from "src/components/PageHeader";
import ListingTable from "src/components/ListingTable";
import TransactionForm from "./TransactionForm";
import CategoryDrawer from "./CategoryDrawer";
import api from "src/pkg/api";

export default function TransactionPage() {
  const { message } = App.useApp();
  const [filterType, setFilterType] = useState("month"); // "week" | "month" | "year" | "range" | "all"
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedRange, setSelectedRange] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [stats, setStats] = useState({ income: 0, expense: 0, net: 0 });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const extraParams = useMemo(() => {
    const params = {};
    if (filterType !== "all") {
      params.filter_type = filterType;
      if (filterType === "range") {
        if (selectedRange && selectedRange[0] && selectedRange[1]) {
          params.start_date = selectedRange[0].format("YYYY-MM-DD");
          params.end_date = selectedRange[1].format("YYYY-MM-DD");
        }
      } else {
        params.date = selectedDate
          ? selectedDate.format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD");
      }
    }
    return params;
  }, [filterType, selectedDate, selectedRange]);

  const fetchSummaryStats = async () => {
    try {
      const params = {
        ...extraParams,
      };
      const res = await api.get("/v1/transactions/summary", { params });
      const summary = res.data?.data || { income: 0, expense: 0, net: 0 };

      setStats({
        income: Number(summary.income) || 0,
        expense: Number(summary.expense) || 0,
        net: Number(summary.net) || 0,
      });
    } catch (err) {
      console.error("Failed to load summary statistics:", err);
    }
  };

  useEffect(() => {
    fetchSummaryStats();
  }, [JSON.stringify(extraParams), refreshTrigger]);

  const handleEdit = (id) => {
    setSelectedTxId(id);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/v1/transactions/${id}`);
      message.success("Transaction deleted successfully");
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to delete transaction",
      );
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "transaction_date",
      key: "transaction_date",
      showSorter: true,
      width: "15%",
      render: (val) => dayjs(val).format("YYYY-MM-DD"),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      showSearch: true,
      showSorter: true,
      width: "20%",
      render: (val, record) => (
        <Space>
          <span>{val}</span>
          <Tag color={record.category_type === "income" ? "success" : "error"}>
            {record.category_type === "income" ? "Income" : "Expense"}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      showSearch: true,
      width: "25%",
      render: (val) => val || "-",
    },
    {
      title: "Link Account",
      key: "link",
      width: "20%",
      render: (_, record) => {
        if (record.asset_id) {
          return <Tag color="blue">Asset: {record.asset_name}</Tag>;
        }
        if (record.liability_id) {
          return <Tag color="warning">Liability: {record.liability_name}</Tag>;
        }
        return "-";
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      showSorter: true,
      align: "right",
      width: "15%",
      render: (val, record) => {
        const isIncome = record.category_type === "income";
        return (
          <span
            style={{
              color: isIncome ? "#52c41a" : "#f5222d",
              fontWeight: "bold",
            }}
          >
            {isIncome ? "+" : "-"} {numeral(val).format("0,0")}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          />
          <Popconfirm
            title="Are you sure you want to delete this transaction?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHeader breadCrumb={["Cashflow"]} />

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "1.5em" }}>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <Statistic
              title="Total Income"
              value={stats.income}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              formatter={(val) => numeral(val).format("0,0")}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <Statistic
              title="Total Expense"
              value={stats.expense}
              precision={0}
              valueStyle={{ color: "#cf1322" }}
              formatter={(val) => numeral(val).format("0,0")}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <Statistic
              title="Net Cashflow"
              value={stats.net}
              precision={0}
              valueStyle={{ color: stats.net >= 0 ? "#3f8600" : "#cf1322" }}
              formatter={(val) =>
                `${val >= 0 ? "+" : ""}${numeral(val).format("0,0")}`
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Filter and Action Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1em",
          flexWrap: "wrap",
          gap: "1em",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Segmented
            options={[
              { label: "Week", value: "week" },
              { label: "Month", value: "month" },
              { label: "Year", value: "year" },
              { label: "Range", value: "range" },
              { label: "All", value: "all" },
            ]}
            value={filterType}
            onChange={(val) => setFilterType(val)}
            style={{ padding: "4px", borderRadius: "8px" }}
          />

          {filterType !== "all" &&
            (filterType === "range" ? (
              <DatePicker.RangePicker
                value={selectedRange}
                onChange={(dates) => setSelectedRange(dates)}
                allowClear={false}
              />
            ) : (
              <DatePicker
                picker={filterType}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                allowClear={false}
              />
            ))}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            icon={<SettingOutlined />}
            onClick={() => setCategoryOpen(true)}
          >
            Categories
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedTxId(null);
              setFormOpen(true);
            }}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <ListingTable
        key={refreshTrigger}
        columns={columns}
        endpoint="/v1/transactions"
        extraParams={extraParams}
      />

      {/* Forms & Drawers */}
      <TransactionForm
        open={formOpen}
        transactionId={selectedTxId}
        onClose={() => setFormOpen(false)}
        onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <CategoryDrawer
        open={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        onCategoriesUpdated={() => setRefreshTrigger((prev) => prev + 1)}
      />
    </>
  );
}
