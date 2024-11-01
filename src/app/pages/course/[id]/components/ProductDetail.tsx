import React, { useEffect, useState } from 'react';
import {  Avatar, Row, Card } from 'antd';
import { ICourse } from '@/app/api/recommendationService';
import Meta from 'antd/es/card/Meta';
import CourseGridCustomize from '@/app/pages/home/components/courseGrid';

interface ProductDetailProps {
  product: ICourse;
  onAddToCart: (product: ICourse) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/category/670f5c1ddbc9a007de46aa78`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRelatedProducts(data);
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      } finally {
        setLoading(false);
      }
    };

    if (product.category) {
      fetchRelatedProducts();
    }
  }, [product.category]);

  return (
    <div style={{ padding: '20px' }}>
      <Card
        style={{ width: 600 }}
        cover={
          <img
            alt={product.title || 'Product Image'}
            src={product.pathImage}
          />
        }
      >
        <Meta
          avatar={<Avatar src={product.avatar} />}
          title={product.title}
          description={product.description}
        />
        <p>Video:</p>
        <iframe
          width="100%"
          height="315"
          src={product.videoUrl} // Đảm bảo rằng videoUrl được định nghĩa trong ICourse
          title={product.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Card>

      <h2>Sản phẩm liên quan</h2>
      {loading ? (
        <div>Loading related products...</div>
      ) : (
        <Row gutter={16}>
          {<CourseGridCustomize data={relatedProducts}/>}
        </Row>
      )}
    </div>
  );
};

export default ProductDetail;
