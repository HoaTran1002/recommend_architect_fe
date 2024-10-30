"use client";

import React, { useEffect, useState } from 'react';
import { Spin } from 'antd'; // Nhập component Spin từ Ant Design
import CourseGridCustomize from './components/courseGrid';

interface Course {
  avatar: string;
  title: string;
  description: string;
  pathImage: string;
}

const Home: React.FC = () => {
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const userId = "6721db26b2ebae2aa08b16c0"; 

  const fetchRecommendedCourses = async (cursor?: string) => {
    try {
      if (cursor) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
  
      const response = await fetch(`http://localhost:3000/recommendation/${userId}?cursor=${cursor ?? ''}`);
      if (!response.ok) throw new Error('Có lỗi xảy ra khi tải khóa học được gợi ý');
  
      const data = await response.json();
  
      if (data.recommendedProducts.length > 0) {
        setRecommendedCourses((prevCourses) => [
          ...prevCourses,
          ...data.recommendedProducts,
        ]);
        setNextCursor(data.nextCursor);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false); // Không còn dữ liệu để tải
      }
      
    } catch (error) {
      setError((error as Error).message);
      setHasMore(false); // Ngừng fetch khi có lỗi
    } finally {
      if (cursor) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };
  

  useEffect(() => {
    fetchRecommendedCourses();
  }, [userId]);

  // Sự kiện cuộn để tự động tải thêm
  const handleScroll = () => {
    const scrollTop = window.scrollY; // Vị trí cuộn hiện tại
    const windowHeight = window.innerHeight; // Chiều cao cửa sổ
    const documentHeight = document.documentElement.scrollHeight; // Chiều cao tài liệu

    // Nếu cuộn đến đáy trang
    if (scrollTop + windowHeight >= documentHeight - 50 && hasMore && !loadingMore) {
      fetchRecommendedCourses(nextCursor || undefined); // Sử dụng undefined khi nextCursor là null
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextCursor, hasMore, loadingMore]);

  return (
    <div className="container mx-auto p-4">
      {loading && (
        <div className="flex justify-center">
          <Spin size="large" tip="Đang tải..." />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <h1 className="text-3xl font-semibold mb-6">Khóa học gợi ý cho bạn</h1>
      <div className="mt-8">
        <CourseGridCustomize data={recommendedCourses} />
      </div>

      {loadingMore && (
        <div className="flex justify-center mt-4">
          <Spin size="small" tip="Đang tải thêm..." />
        </div>
      )}

      {!hasMore && !loading && (
        <p className="text-center text-gray-500 mt-4">Không còn sản phẩm nào để đề xuất.</p>
      )}
    </div>
  );
};

export default Home;
