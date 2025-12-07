import { Button, Form, Grid, Input, message, Space, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "src/pkg/api/api";

const { useBreakpoint } = Grid;

export default function SignUp() {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (formData) => {
    setIsSubmit(true);
    try {
      const response = await api.post("/api/v1/register", formData);

      const respBody = response?.data;

      if (respBody?.is_success) {
        message.success(respBody?.message);
        navigate("/signin");
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
    <div
      className="glass-container"
      style={
        screens.sm ? { padding: "3em", width: "100%" } : { padding: "3em" }
      }
    >
      <Typography.Title
        level={3}
        style={{ marginBottom: "2em", textAlign: "center" }}
      >
        Welcome
      </Typography.Title>
      <Form
        name="signup-form"
        style={{ marginTop: "2em" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Space vertical style={{ width: "100%", textAlign: "center" }}>
          <Typography.Text>
            Already have an account? <Link to="/signin">Sign in!</Link>
          </Typography.Text>
          <Button
            type="submit"
            htmlType="submit"
            style={{ width: 100, marginTop: "2em" }}
            loading={isSubmit}
          >
            Sign Up
          </Button>
        </Space>
      </Form>
    </div>
  );
}
