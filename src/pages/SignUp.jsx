import { Button, Form, Grid, Input, message, Space, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "src/components/GlassCard";
import api from "src/pkg/api";

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
        navigate("/login");
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
          Welcome
        </Typography.Title>
        <Form
          name="signup-form"
          style={{ marginTop: "2em" }}
          layout="vertical"
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
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Space vertical style={{ width: "100%", textAlign: "center" }}>
            <Typography.Text>
              Already have an account? <Link to="/login">Login!</Link>
            </Typography.Text>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "2em" }}
              loading={isSubmit}
              block
            >
              Sign Up
            </Button>
          </Space>
        </Form>
      </GlassCard>
    </div>
  );
}
