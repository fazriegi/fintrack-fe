import { Affix, Button, Form, Grid, Input, message, Radio } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "src/components/PageHeader";
import InputSelect from "src/components/input/InpuitSelect";
import InputNumeric from "src/components/input/InputNumeric";
import api from "src/pkg/api";

const { useBreakpoint } = Grid;

export default function AssetAdd() {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (formData) => {
    setIsSubmit(true);
    try {
      const response = await api.post("/api/v1/asset/submit", formData);

      const respBody = response?.data;

      if (respBody?.is_success) {
        message.success(respBody?.message);
        navigate("/assets");
      }
    } catch (err) {
      const apiStatus = err?.response?.data?.status;
      const apiMessage = err?.response?.data?.message;

      if (apiStatus && apiMessage) {
        message.error(apiMessage);
        return;
      }

      message.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <PageHeader breadCrumb={["Assets", "Add"]} backUrl />
      <Form
        name="asset-add"
        style={{ marginTop: "2em" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        form={form}
        initialValues={{
          status: "active",
        }}
      >
        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true }]}
        >
          <InputSelect
            datasource="/api/v1/asset/list-category"
            placeholder="Choose One"
            selectLabel="id"
            selectValue="name"
          />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
          <InputNumeric inputStyle={{ width: 100 }} />
        </Form.Item>
        <Form.Item
          label="Purchase Price"
          name="purchase_price"
          rules={[{ required: true }]}
        >
          <InputNumeric inputStyle={{ width: 150 }} useCurrency />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="active">active</Radio.Button>
            <Radio.Button value="sold">sold</Radio.Button>
            <Radio.Button value="archived">archived</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Affix offsetBottom={50} style={{ marginTop: "3em" }}>
          <div
            style={{
              display: "flex",
              justifyContent: screens.md ? "flex-end" : "center",
              padding: "0 16px",
            }}
          >
            <div style={{ width: screens.md ? 120 : "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmit}
                style={{ width: "100%" }}
              >
                Save
              </Button>
            </div>
          </div>
        </Affix>
      </Form>
    </>
  );
}
