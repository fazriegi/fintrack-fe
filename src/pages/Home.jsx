import { Col, Row, App as AntdApp } from "antd";
import { useState, useEffect } from "react";
import AssetCard from "src/components/modules/dashboard/AssetCard";
import DebtRatioCard from "src/components/modules/dashboard/DebtRatioCard";
import LiabilityCard from "src/components/modules/dashboard/LiabilityCard";
import NetworthCard from "src/components/modules/dashboard/NetworthCard";
import api from "src/pkg/api";

const data = {
  networth: 125000000000000,
  total_assets: 1500000040300,
  total_liabilities: 1500000040300,
  networth_percentage_change: -3.23,
  asset_percentage_change: 3.23,
  liability_percentage_change: 3.23,
};

export default function Home() {
  const { message } = AntdApp.useApp();

  const [showValue, setShowValue] = useState(() => {
    const saved = localStorage.getItem("netbase_show_value");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [loading, setLoading] = useState(true);
  const [networth, setNetworth] = useState(null);

  useEffect(() => {
    localStorage.setItem("netbase_show_value", JSON.stringify(showValue));
  }, [showValue]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/v1/net-worth/current`);

      const respBody = response?.data;
      if (respBody?.is_success) {
        const data = respBody.data;
        setNetworth(data);
      }
    } catch (err) {
      const apiCode = err?.response?.data?.code;
      const apiStatus = err?.response?.data?.status;
      const apiMessage = err?.response?.data?.message;

      if (apiCode === 404) return;

      if (apiStatus && apiMessage) {
        message.error(apiMessage);
        return;
      }

      message.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={7}>
          <NetworthCard
            showValue={showValue}
            setShowValue={setShowValue}
            data={networth}
            loading={loading}
          />
        </Col>
        <Col xs={24} md={12} lg={7}>
          <AssetCard
            showValue={showValue}
            setShowValue={setShowValue}
            data={networth}
            loading={loading}
          />
        </Col>
        <Col xs={24} md={12} lg={7}>
          <LiabilityCard
            showValue={showValue}
            setShowValue={setShowValue}
            data={networth}
            loading={loading}
          />
        </Col>
        <Col xs={24} md={12} lg={3}>
          <DebtRatioCard data={networth} loading={loading} />
        </Col>
      </Row>
    </>
  );
}
