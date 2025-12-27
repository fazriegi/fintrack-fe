import { Button, Input, message, Space, theme } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import qs from "qs";
import SimpleTable from "./SimpleTable";
import api from "src/pkg/api";
import { SearchOutlined } from "@ant-design/icons";

const getApiParam = (params) => ({
  limit: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function ListingTable({ endpoint, columns, ...props }) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const initialPagination = {
    limit: 10,
    page: 1,
    total: 0,
  };

  const [fetchingData, setFetchingData] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [tableParams, setTableParams] = useState(initialPagination);
  const [columnSearch, setColumnSearch] = useState({});

  const searchInput = useRef(null);

  const getData = async (params = tableParams) => {
    try {
      setFetchingData(true);

      const apiParams = {
        ...getApiParam(params),
      };

      delete apiParams["total"];

      const res = await api.get(`${endpoint}?${qs.stringify(apiParams)}`);

      const respData = res?.data?.data;
      const data = respData.map((obj, idx) => ({
        ...obj,
        key: `${idx + 1}`,
      }));

      setDataList(data);
      setTableParams((prev) => ({
        ...prev,
        total: res?.data?.pagination_meta?.total ?? 0,
      }));
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      message.error(apiMessage);
    } finally {
      setFetchingData(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const sortArray = Array.isArray(sorter) ? sorter : [sorter];

    const sort = sortArray
      .filter((s) => s && s.field && s.order)
      .map((s) => `${s.field} ${s.order === "ascend" ? "asc" : "desc"}`)
      .join(", ");

    const cleanFilters = {};
    Object.keys(filters || {}).forEach((key) => {
      if (filters[key]?.length) {
        cleanFilters[key] = filters[key][0];
      }
    });

    const newParams = {
      page: pagination.current,
      limit: pagination.pageSize,
      ...cleanFilters,
    };

    if (sort !== "") newParams["sort"] = sort;

    setTableParams((prev) => ({
      ...prev,
      ...newParams,
    }));
    getData(newParams);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setColumnSearch((prev) => ({
      ...prev,
      [dataIndex]: selectedKeys[0] || "",
    }));
  };

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    setColumnSearch((prev) => {
      const newState = { ...prev };
      delete newState[dataIndex];
      return newState;
    });

    getData(initialPagination);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] || ""}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8 }}
        />

        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          >
            Search
          </Button>
          <Button
            size="small"
            onClick={() => handleReset(clearFilters, dataIndex)}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? colorPrimary : undefined }} />
    ),

    filteredValue: columnSearch[dataIndex] ? [columnSearch[dataIndex]] : null,
  });

  useEffect(() => {
    getData(tableParams);
  }, []);

  const cols = useMemo(() => {
    const colsCopy = [...columns];

    const hasNoColumn = colsCopy.some((col) => col.dataIndex === "no.");

    if (!hasNoColumn) {
      colsCopy.unshift({
        title: "No.",
        dataIndex: "no.",
        key: "no.",
        width: 40,
        fixed: "left",
        align: "center",
        render: (_, __, index) =>
          `${(tableParams.page - 1) * tableParams.limit + index + 1}.`,
      });
    }

    return colsCopy.map((col, idx) => {
      const newCol = { ...col };

      if (col?.showSearch && col.dataIndex) {
        Object.assign(newCol, getColumnSearchProps(col.dataIndex));
      }

      if (col?.showSorter && col.dataIndex) {
        newCol.sorter = { multiple: idx + 1 };
      }

      return newCol;
    });
  }, [columns, getColumnSearchProps]);

  return (
    <div style={props?.style}>
      <SimpleTable
        data={dataList}
        rowKey="key"
        bordered
        style={{ width: "100%" }}
        loading={fetchingData}
        pagination={{
          current: tableParams.page,
          pageSize: tableParams.limit,
          total: tableParams.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        tableLayout="fixed"
        columns={cols}
        {...props}
      />
    </div>
  );
}

export default ListingTable;
