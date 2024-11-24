import React from "react";
import { Form, Row, Col, Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

interface IAddTodoFormProps {
  onFormSubmit: (todo: any) => void;
  buttonLabel: string;
}

export const AddTaskForm: React.FC<IAddTodoFormProps> = ({
  onFormSubmit,
  buttonLabel,
}) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    onFormSubmit({
      name: form.getFieldValue("name"),
    });

    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={"name"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="What needs to be done?" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            {buttonLabel}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
