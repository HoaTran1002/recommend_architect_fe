"use client";

import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import CourseGridCustomize from "./components/courseGrid";
import { ICourse } from "@/app/api/recommendationService";
import Cookies from "js-cookie";
import Link from "next/link";

interface RecommendedCoursesResponse {
  recommendedProducts: ICourse[];
  nextCursor: string | null;
  hasMore: boolean;
}

const Home: React.FC = () => {
  const [recommendedIs, setRecommendedCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Thêm trạng thái đăng nhập
  const userId = "6721db26b2ebae2aa08b16c0";

  useEffect(() => {
    const token = Cookies.get("accessToken"); // Kiểm tra xem có token không
    setIsLoggedIn(!!token); // Cập nhật trạng thái đăng nhập
  }, []);

  const fetchRecommendedCourses = async (cursor?: string) => {
    try {
      if (cursor) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(
        `http://localhost:3000/recommendation/${userId}?cursor=${cursor ?? ""}`
      );
      if (!response.ok)
        throw new Error("Có lỗi xảy ra khi tải khóa học được gợi ý");

      const data: RecommendedCoursesResponse = await response.json();

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
    // Chỉ gọi fetchRecommendedCourses nếu người dùng đã đăng nhập
    if (isLoggedIn) {
      fetchRecommendedCourses();
    } else {
      // Reset lại trạng thái khi đăng xuất
      setRecommendedCourses([]);
      setNextCursor(null);
      setHasMore(true);
    }
  }, [isLoggedIn, userId]);

  // Sự kiện cuộn để tự động tải thêm
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollTop + windowHeight >= documentHeight - 50 &&
      hasMore &&
      !loadingMore
    ) {
      fetchRecommendedCourses(nextCursor || undefined);
    }
  };

  // Thêm event listener cho scroll
  useEffect(() => {
    if (isLoggedIn) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoggedIn, nextCursor, hasMore, loadingMore]); // Đảm bảo clean-up luôn xảy ra

  // Yêu cầu đăng nhập nếu chưa đăng nhập
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">
          Bạn cần đăng nhập để xem nội dung này.
        </h1>
        <p>
          <Link href="/auth/login">Đăng nhập</Link> hoặc{" "}
          <Link href="/auth/signup">Đăng ký</Link>
        </p>
      </div>
    );
  }

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
        <CourseGridCustomize data={recommendedIs} />
      </div>

      {loadingMore && (
        <div className="flex justify-center mt-4">
          <Spin size="small" tip="Đang tải thêm..." />
        </div>
      )}

      {!hasMore && !loading && (
        <p className="text-center text-gray-500 mt-4">
          Không còn sản phẩm nào để đề xuất.
        </p>
      )}
    </div>
  );
};

export default Home;
