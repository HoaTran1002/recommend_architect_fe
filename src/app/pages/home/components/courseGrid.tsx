import React from "react";
import { List } from "antd";
import CardCustomize from "@/app/_components/card/cardCourse";
import { ICourse } from "@/app/api/recommendationService";

interface CourseGridCustomizeProps {
  data: ICourse[]; // Nhận mảng sản phẩm
}

const CourseGridCustomize: React.FC<CourseGridCustomizeProps> = ({ data }) => (
  <List
    grid={{ gutter: 10, column: 5 }} // Thiết lập layout cho danh sách
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <CardCustomize data={item} /> {/* Gửi đối tượng sản phẩm vào CardCustomize */}
      </List.Item>
    )}
  />
);

export default CourseGridCustomize;
