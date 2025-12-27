import { Form, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssetForm from "src/components/modules/assets/AssetForm";
import api from "src/pkg/api";

export default function AssetAdd() {
  const [form] = Form.useForm();

  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (formData) => {
    setIsSubmit(true);
    try {
      formData.purchase_price = formData.purchase_price ?? 0;

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
    <AssetForm
      onFinish={onFinish}
      isSubmit={isSubmit}
      form={form}
      breadcrumbs={["Assets", "Add"]}
    />
  );
}
