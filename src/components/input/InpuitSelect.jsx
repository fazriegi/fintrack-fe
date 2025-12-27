import { message, Select } from "antd";
import { useEffect, useState } from "react";
import api from "src/pkg/api";

export default function InputSelect({
  selectLabel = "",
  selectValue = "",
  datasource = "",
  payload = {},
  listOptions = [],
  ...props
}) {
  const [options, setOptions] = useState(listOptions);
  const [loading, setLoading] = useState(false);

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const response = await api.get(datasource);

      const respBody = response?.data;

      if (respBody?.is_success) {
        const temp = respBody?.data?.map((item) => ({
          value: item[selectLabel],
          label: item[selectValue],
        }));
        setOptions(temp);
      }
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      message.error(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (datasource !== "") {
      fetchOptions();
    }
  }, []);

  return (
    <Select
      loading={loading}
      showSearch={{ optionFilterProp: "label" }}
      options={options}
      {...props}
    />
  );
}
