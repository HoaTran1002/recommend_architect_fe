"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  recommendProductsWhenSearch,
  SearchResponse,
} from "@/app/api/recommendationService";
import CourseGridCustomize from "./components/courseGrid";
import { Spin, Alert, Select } from "antd";
import { useSearchParams } from "next/navigation";
import ClientLayout from "@/app/_components/layout";

interface Category {
  _id: string;
  name: string;
}

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  const [results, setResults] = useState<SearchResponse["data"]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>(null); 
  const [scrollLoading, setScrollLoading] = useState<boolean>(false); 
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined); 
  const [categories, setCategories] = useState<Category[]>([]); 

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchData = useCallback(async () => {
    if (loading || scrollLoading || (!hasMore && !cursor)) return; 

    setScrollLoading(true);
    try {
      setLoading(true);
      const response: SearchResponse = await recommendProductsWhenSearch(
        searchTerm,
        cursor,
        selectedCategory 
      );
      setResults((prev) => [...prev, ...response.data]);
      setCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); 
      setScrollLoading(false); 
    }
  }, [loading, scrollLoading, cursor, searchTerm, selectedCategory, hasMore]);

  useEffect(() => {
    fetchCategories(); 
  }, []);

  useEffect(() => {
   
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]); 
  useEffect(() => {
    if (selectedCategory) {
      setResults([]);
      setCursor(null);
      setHasMore(true);
      fetchData();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5 && !scrollLoading) {
        if (!selectedCategory) {
          fetchData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData, scrollLoading, selectedCategory]); 

  return (
    <ClientLayout>
      <div>
        <h1>Kết quả tìm kiếm cho: {searchTerm}</h1>
        <Select
          placeholder="Chọn danh mục"
          onChange={setSelectedCategory} 
          style={{ width: 200, marginBottom: 20 }}
        >
          {categories.map((category) => (
            <Select.Option key={category._id} value={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
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
        {loading && <Spin tip="Đang tải sản phẩm..." />}
        {!hasMore && results.length > 0 && (
          <Alert
            message="Đã hết sản phẩm."
            type="info"
            showIcon
            style={{ marginTop: 20 }}
          />
        )}
      </div>
    </ClientLayout>
  );
};

export default SearchPage;
