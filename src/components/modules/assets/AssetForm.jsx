import { Affix, Button, Form, Grid, Input, Radio, Skeleton } from "antd";
import PageHeader from "src/components/PageHeader";
import InputSelect from "src/components/input/InpuitSelect";
import InputNumeric from "src/components/input/InputNumeric";

const { useBreakpoint } = Grid;

export default function AssetForm({
  form,
  isSubmit = false,
  isLoading = false,
  onFinish,
  breadcrumbs = ["Assets"],
  type = "add",
  onDelete,
}) {
  const screens = useBreakpoint();

  return (
    <>
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : (
        <>
          <PageHeader breadCrumb={breadcrumbs} backUrl />
          <Form
            name="asset-add"
            style={{ marginTop: "2em" }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={onFinish}
            form={form}
            initialValues={{
              status: "active",
            }}
          >
            <Form.Item
              label="Category"
              name="category_id"
              rules={[{ required: true }]}
            >
              <InputSelect
                datasource="/api/v1/asset/list-category"
                placeholder="Choose One"
                selectLabel="id"
                selectValue="name"
              />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                { required: true },
                {
                  validator: (_, value) =>
                    value > 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Amount must be greater than 0")
                        ),
                },
              ]}
            >
              <InputNumeric inputStyle={{ width: 100 }} />
            </Form.Item>
            <Form.Item
              label="Purchase Price"
              name="purchase_price"
            >
              <InputNumeric inputStyle={{ width: 150 }} useCurrency />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio.Button value="active">active</Radio.Button>
                <Radio.Button value="inactive">inactive</Radio.Button>
                <Radio.Button value="archived">archived</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Affix offsetBottom={50} style={{ marginTop: "3em" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: screens.md ? "flex-end" : "center",
                  padding: "0 16px",
                  flexWrap: "wrap",
                  gap: "1em",
                }}
              >
                {type === "edit" && (
                  <div style={{ width: screens.md ? 120 : "100%" }}>
                    <Button
                      type="default"
                      onClick={onDelete}
                      loading={isSubmit}
                      style={{ width: "100%" }}
                      danger
                    >
                      Delete
                    </Button>
                  </div>
                )}

                <div style={{ width: screens.md ? 120 : "100%" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmit}
                    style={{ width: "100%" }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Affix>
          </Form>
        </>
      )}
    </>
  );
}
