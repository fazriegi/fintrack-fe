import { InputNumber, Space, theme } from "antd";
import { CURRENCY, FORMATNUMBER } from "src/pkg/constant";

const InputNumeric = ({
  label = "",
  defaultValue = 0,
  inputStyle = {},
  labelUp = false,
  useCurrency = false,
  ...props
}) => {
  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();
  return (
    <div
      style={{
        display: labelUp ? "block" : "flex",
        alignItems: labelUp ? "initial" : "center",
        gap: "8px",
        ...props?.style,
      }}
    >
      {Boolean(label) && (
        <label
          style={{
            margin: 0,
            lineHeight: "32px",
            whiteSpace: "nowrap",
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}

      <div style={{ flex: 1 }}>
        <Space.Compact style={{ width: "100%" }}>
          {useCurrency && (
            <span
              style={{
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                background: colorBgContainer,
                border: `1px solid ${colorBorder}`,
                borderRight: "none",
                borderRadius: "6px 0 0 6px",
                fontSize: 14,
              }}
            >
              {CURRENCY}
            </span>
          )}

          <InputNumber
            {...props}
            defaultValue={defaultValue}
            formatter={FORMATNUMBER}
            parser={(value) => (value ? value.replace(/[^\d.-]/g, "") : "")}
            style={{
              width: "100%",
              cursor: "text",
              borderRadius: "0 6px 6px 0",
              ...inputStyle,
            }}
          />
        </Space.Compact>
      </div>
    </div>
  );
};

export default InputNumeric;
