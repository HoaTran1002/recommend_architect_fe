import { Layout } from "antd";
import React from "react";

export default function ContentComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout.Content>
      <div className="min-h-screen max-w-screen-2xl mx-auto mt-8 flex flex-col justify-center items-center p-4">
        {children}
      </div>
    </Layout.Content>
  );
}
