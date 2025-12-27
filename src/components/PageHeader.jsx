import { Breadcrumb, theme, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined, RightOutlined } from "@ant-design/icons";

export default function PageHeader({ breadCrumb = [], backUrl = false }) {
  const navigate = useNavigate();

  const {
    token: { colorTextBase },
  } = theme.useToken();

  return (
    <Breadcrumb
      style={{ marginBottom: 12 }}
      separator={
        <Typography.Text style={{ fontSize: 15, fontWeight: 500 }}>
          /
        </Typography.Text>
      }
      items={[
        ...(backUrl
          ? [
              {
                title: (
                  <LeftCircleOutlined
                    style={{
                      cursor: "pointer",
                      color: colorTextBase,
                      marginRight: 4,
                      fontSize: 16,
                      verticalAlign: "middle",
                    }}
                    onClick={() => navigate(-1)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.7")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                ),
              },
            ]
          : []),
        ...breadCrumb.map((item) => ({
          title: (
            <Typography.Text style={{ fontSize: 15, fontWeight: 500 }}>
              {item}
            </Typography.Text>
          ),
        })),
      ]}
    />
  );
}
