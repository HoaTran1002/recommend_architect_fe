import React from "react";
import { List } from "antd";
import CardCustomize from "@/app/_components/card/cardCourse";
import { ICourse } from "@/app/api/recommendationService";

interface CourseGridCustomizeProps {
  data: ICourse[];
}

const CourseGridCustomize: React.FC<CourseGridCustomizeProps> = ({ data }) => (
  <List
    grid={{ gutter: 10, column: 5 }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <CardCustomize
          avatar={item.avatar}
          title={item.title}
          description={item.description}
          pathImage={item.pathImage}
        />
      </List.Item>
    )}
  />
);

export default CourseGridCustomize;
