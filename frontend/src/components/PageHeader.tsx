import { Typography } from "antd";
import React from "react";

export type PageHeaderProps = {
  // The title of the page
  title: string;

  // The subtitle of the page
  subTitle: string;
};

export const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  subTitle,
}) => {
  const { Title } = Typography;
  return (
    <>
      <Title level={2}>{title}</Title>
      <Title level={4}>{subTitle}</Title>
    </>
  );
};
