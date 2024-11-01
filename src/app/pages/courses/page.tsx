import ListItem from "@/app/_components/list/courseCard.list";
import { Col, Row } from "antd";

export default function HomePage() {
  return (
    <Row>
      <Col span={6} pull={18}>
        col-6 col-pull-18
      </Col>
      <Col span={18} push={6}>
        <div>
          <span className="text-3xl font-bold hover:text-blue-600">
            Khóa học đề xuất cho bạn
          </span>
          <ListItem />
        </div>
      </Col>
    </Row>
  );
}
