import { Button, Form, Grid, Input, message, Space, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "src/components/GlassCard";
import api from "src/pkg/api";

const { useBreakpoint } = Grid;

export default function SignIn() {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (formData) => {
    setIsSubmit(true);
    try {
      const response = await api.post("/api/v1/login", {
        username: formData.username,
        password: formData.password,
      });

      const respBody = response?.data;

      if (respBody?.is_success) {
        localStorage.setItem("USER", JSON.stringify(respBody?.data?.user));
        message.success(respBody?.message);
        navigate("/");
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
    <div className="auth-wrapper">
      <GlassCard
        style={
          screens.sm
            ? { padding: "4em", width: "20em" }
            : { padding: "3em", width: "100%" }
        }
      >
        <Typography.Title
          level={3}
          style={{ marginBottom: "2em", textAlign: "center" }}
        >
          Welcome Back
        </Typography.Title>
        <Form
          name="login"
          style={{ marginTop: "2em" }}
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input type="text" maxLength={50} />
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
              New here? <Link to="/signup">Create an account!</Link>
            </Typography.Text>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "2em" }}
              loading={isSubmit}
              block
            >
              Login
            </Button>
          </Space>
        </Form>
      </GlassCard>
    </div>
  );
}
