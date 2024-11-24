import React from "react";
import { Row, Col, Card } from "antd";
import { PageHeader, TaskList } from "../components";

interface ITodoListProps {}

export const TodoList: React.FunctionComponent<ITodoListProps> = () => {
  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 20]}
      className="todos-container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <PageHeader
          title="Task List"
          subTitle="To add a task, just fill the form below and click in add task."
        />
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card>
          <TaskList />
        </Card>
      </Col>
    </Row>
  );
};
