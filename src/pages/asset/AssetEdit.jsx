import { ConfigProvider, Form, message, Modal, theme } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssetForm from "src/components/modules/assets/AssetForm";
import api from "src/pkg/api";
import { ExclamationCircleFilled } from "@ant-design/icons";

export default function AssetEdit() {
  const [form] = Form.useForm();

  const { id } = useParams();

  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (formData) => {
    setIsSubmit(true);
    try {
      formData.purchase_price = formData.purchase_price ?? 0;

      const response = await api.put(`/api/v1/asset/${id}`, formData);

      const respBody = response?.data;

      if (respBody?.is_success) {
        message.success(respBody?.message);
        navigate("/assets");
      }
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      message.error(apiMessage);
    } finally {
      setIsSubmit(false);
    }
  };

  const onDelete = () => {
    ConfigProvider.config({
      theme: { algorithm: theme.darkAlgorithm },
    });

    Modal.confirm({
      title: "Are you sure you want to delete this asset?",
      icon: <ExclamationCircleFilled />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: handleDelete,
    });
  };

  const handleDelete = async () => {
    setIsSubmit(true);
    try {
      const response = await api.delete(`/api/v1/asset/${id}`);

      const respBody = response?.data;

      if (respBody?.is_success) {
        message.success(respBody?.message);
        navigate("/assets");
      }
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      message.error(apiMessage);
    } finally {
      setIsSubmit(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/v1/asset/${id}`);

      const respBody = response?.data;

      if (respBody?.is_success) {
        form.setFieldsValue(respBody.data);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AssetForm
      onFinish={onFinish}
      isSubmit={isSubmit}
      isLoading={isLoading}
      form={form}
      breadcrumbs={["Assets", "Edit"]}
      type="edit"
      onDelete={onDelete}
    />
  );
}
