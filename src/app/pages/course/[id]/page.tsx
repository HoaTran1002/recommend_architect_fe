"use client"; // Đánh dấu đây là Client Component

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // Sử dụng từ next/navigation
import { ICourse } from '@/app/api/recommendationService';
import ProductDetail from './components/ProductDetail';
import ClientLayout from '@/app/_components/layout';

const ProductPage: React.FC = () => {
  const pathname = usePathname(); // Lấy pathname
  const searchParams = useSearchParams(); // Lấy searchParams
  const id = pathname.split('/').pop(); // Giả định rằng ID là phần cuối của đường dẫn

  const [product, setProduct] = useState<ICourse | null>(null); // State để lưu sản phẩm
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:3000/product/${id}`); // Gọi API để lấy sản phẩm
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProduct(data); // Lưu sản phẩm vào state
        } catch (error) {
          console.error('Có lỗi xảy ra:', error);
        } finally {
          setLoading(false); // Đặt loading thành false khi hoàn thành
        }
      };

      fetchProduct(); // Gọi hàm fetchProduct
    }
  }, [id]);


  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading trong khi đang fetch dữ liệu
  }

  if (!product) {
    return <div>Sản phẩm không tìm thấy.</div>; // Thông báo khi không tìm thấy sản phẩm
  }

  return (
    <ClientLayout>
        <ProductDetail product={product} onAddToCart={function (product: ICourse): void {
            throw new Error('Function not implemented.');
        } } />
    </ClientLayout>

  );
};

export default ProductPage;
