import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  Button,
  Form,
  Input,
  Radio,
  App,
  Tag,
  Select,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "src/pkg/api";

export default function CategoryDrawer({ open, onClose, onCategoriesUpdated }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all"); // "all" | "income" | "expense"

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/v1/transactions/categories");
      setCategories(res.data?.data || []);
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to fetch categories",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setSearchText("");
      setFilterType("all");
      fetchCategories();
    }
  }, [open]);

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesType = filterType === "all" || cat.base_type === filterType;
    return matchesSearch && matchesType;
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await api.post("/v1/transactions/categories", {
        name: values.name,
        base_type: values.base_type,
      });
      message.success("Category added successfully");
      form.resetFields();
      fetchCategories();
      if (onCategoriesUpdated) onCategoriesUpdated();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to add category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/v1/transactions/categories/${id}`);
      message.success("Category deleted successfully");
      fetchCategories();
      if (onCategoriesUpdated) onCategoriesUpdated();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <Drawer title="Manage Categories" width={420} open={open} onClose={onClose}>
      <div style={{ marginBottom: "1.5em" }}>
        <h3>Add New Category</h3>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ base_type: "income" }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input category name!" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input placeholder="Category Name" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Item name="base_type" style={{ marginBottom: 0 }}>
              <Radio.Group>
                <Radio value="income">Income</Radio>
                <Radio value="expense">Expense</Radio>
              </Radio.Group>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={submitting}
            >
              Add
            </Button>
          </div>
        </Form>
      </div>

      <hr
        style={{
          border: "0",
          borderTop: "1px solid #303030",
          margin: "1.5em 0",
        }}
      />

      <h3>Categories List</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <Input
          placeholder="Search categories..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ flex: 1 }}
        />
        <Select
          value={filterType}
          onChange={(val) => setFilterType(val)}
          style={{ width: "120px" }}
          options={[
            { label: "All Types", value: "all" },
            { label: "Income", value: "income" },
            { label: "Expense", value: "expense" },
          ]}
        />
      </div>

      <List
        loading={loading}
        dataSource={filteredCategories}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(item.id)}
              />,
            ]}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>{item.name}</span>
              <Tag color={item.base_type === "income" ? "success" : "error"}>
                {item.base_type === "income" ? "Income" : "Expense"}
              </Tag>
            </div>
          </List.Item>
        )}
      />
    </Drawer>
  );
}
