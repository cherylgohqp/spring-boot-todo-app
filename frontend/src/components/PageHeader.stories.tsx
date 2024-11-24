import React, { PropsWithChildren } from "react";

import { StoryFn } from "@storybook/react";

import { PageHeader, PageHeaderProps } from "./PageHeader";

export default {
  title: "Components/PageHeader",
  component: PageHeader,
};

export const Default = () => <PageHeader title="Title" subTitle="SubTitle" />;

export const Playground: StoryFn<PropsWithChildren<PageHeaderProps>> = (
  args,
) => <PageHeader {...args} />;

Playground.args = {
  title: "Title",
  subTitle: "SubTitle",
};

Playground.argTypes = {
  title: {
    control: { type: "text" },
  },
  subTitle: {
    control: { type: "text" },
  },
};
