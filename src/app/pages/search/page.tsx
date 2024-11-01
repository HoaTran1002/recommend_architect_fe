"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  recommendProductsWhenSearch,
  SearchResponse,
} from "@/app/api/recommendationService";
import CourseGridCustomize from "./components/courseGrid";
import { Spin, Alert } from "antd"; // Import cho Spin và Alert
import { useSearchParams } from "next/navigation"; // Import để sử dụng useSearchParams

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams(); // Khởi tạo searchParams
  const searchTerm = searchParams.get("query") || ""; // Lấy từ khóa tìm kiếm từ query, mặc định là chuỗi rỗng

  const [results, setResults] = useState<SearchResponse["data"]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>(null); // Để lưu trữ cursor
  const [scrollLoading, setScrollLoading] = useState<boolean>(false); // Trạng thái để quản lý việc gọi API khi cuộn

  const fetchData = useCallback(async () => {
    if (loading || scrollLoading || !hasMore || !searchTerm) return; // Ngăn không gọi nhiều lần

    setScrollLoading(true); // Bắt đầu loading cho cuộn
    try {
      setLoading(true); // Bắt đầu loading cho fetch
      const response: SearchResponse = await recommendProductsWhenSearch(
        searchTerm,
        cursor
      );
      setResults((prev) => [...prev, ...response.data]);
      setCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Kết thúc loading cho fetch
      setScrollLoading(false); // Kết thúc loading cho cuộn
    }
  }, [loading, scrollLoading, hasMore, cursor, searchTerm]); // Thêm dependencies cần thiết

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      // Kiểm tra điều kiện để gọi fetchData
      if (scrollTop + clientHeight >= scrollHeight - 5 && !scrollLoading) {
        fetchData(); // Tải thêm dữ liệu khi cuộn xuống gần cuối
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Xóa event listener khi component bị unmount
    };
  }, [fetchData, scrollLoading]); // Chạy lại khi fetchData hoặc scrollLoading thay đổi

  useEffect(() => {
    // Reset dữ liệu mỗi khi searchTerm thay đổi
    if (searchTerm) {
      setResults([]);
      setCursor(null);
      setHasMore(true);
      fetchData(); // Tải dữ liệu mới khi searchTerm thay đổi
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Kết quả tìm kiếm cho: {searchTerm}</h1>
      {searchTerm === "" && (
        <Alert
          message="Vui lòng nhập từ tìm kiếm."
          type="warning"
          showIcon
          style={{ marginTop: 20 }}
        />
      )}
      {results.length === 0 && !loading && searchTerm && (
        <Alert
          message="Không tìm thấy sản phẩm nào."
          type="info"
          showIcon
          style={{ marginTop: 20 }}
        />
      )}
      <CourseGridCustomize data={results} />
      {loading && <Spin tip="Đang tải sản phẩm..." />}{" "}
      {/* Hiển thị spinner loading */}
      {!hasMore && results.length > 0 && (
        <Alert
          message="Đã hết sản phẩm."
          type="info"
          showIcon
          style={{ marginTop: 20 }}
        />
      )}
    </div>
  );
};

export default SearchPage;
