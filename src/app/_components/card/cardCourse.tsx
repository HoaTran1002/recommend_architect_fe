import React from 'react';
import { Avatar, Card } from 'antd';
import Link from 'next/link'; // Import Link từ Next.js
import { ICourse } from '@/app/api/recommendationService';

const { Meta } = Card;

interface CardCustomizeProps {
  data: ICourse; // Nhận dữ liệu sản phẩm
}

const CardCustomize: React.FC<CardCustomizeProps> = ({ data }) => (
  <Link href={`pages/course/${data._id}`}> {/* Thêm liên kết tới trang chi tiết sản phẩm */}
    <Card
      style={{ width: 300, margin: '16px' }} // Thêm margin để card không chạm nhau
      cover={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={data.title || 'Product Image'} // Đặt alt cho hình ảnh
          src={data.pathImage}
        />
      }
    >
      <Meta
        avatar={<Avatar src={data.avatar} />}
        title={data.title}
        description={data.description}
      />
    </Card>
  </Link>
);

export default CardCustomize;
