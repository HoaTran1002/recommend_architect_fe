/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/recommendation";

export interface Product {
  _id: string;
  name: string;
  description?: string;
  [key: string]: any;
}

export interface RecommendationResponse {
  recommendedProducts: Product[];
  nextCursor: string | null;
  hasMore: boolean;
}
export interface ICourse {
  _id: string;
  avatar?: string;
  pathImage?: string;
  videoUrl?:string;
  title: string;
  description: string;
  price: number;
  enrollmentCount?: number;
  releaseDate?: Date;
  isActive?: boolean;
  tags?: string[];
  rating?: number;
  ratingCount?: number;
  discount?: number;
  viewCount?: number;
  prerequisites?: string[];
  duration?: string;
  language?: string;
  purchaseCount?: number;
  popularityScore?: number;
  videoPreviewUrl?: string;
  learningObjectives?: string[];
  certificate?: boolean;
  refundPolicy?: string;
  targetAudience?: string[];
  lastUpdated?: Date;
  category: string;
}
export interface SearchResponse {
  nextCursor: string | null; 
  hasMore: boolean; 
  data: ICourse[];
}

export async function recommendProductsWhenSearch(
query: string, cursor: string | null, selectedCategory: string | undefined): Promise<SearchResponse> {
  const response = await fetch(
    `http://localhost:3000/recommendation/search?term=${query}${
      cursor ? `&cursor=${cursor}` : ""
    }`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data = await response.json();
  console.log("Response data:", data);

  return {
    data: data.products || [], 
    nextCursor: data.nextCursor || null, 
    hasMore: data.hasMore || false, 
  };
}

export const recommendProductsByCategory = async (
  userId: string,
  cursor = "",
  limit = 10
): Promise<RecommendationResponse> => {
  const response = await axios.get<RecommendationResponse>(
    `${API_BASE_URL}/category`,
    {
      params: { userId, cursor, limit },
    }
  );
  return response.data;
};

export const recommendProductsForUser = async (
  userId: string,
  renderedProducts: string[] = [],
  cursor = "",
  limit = 5
): Promise<RecommendationResponse> => {
  const response = await axios.get<RecommendationResponse>(
    `${API_BASE_URL}/${userId}`,
    {
      params: { renderedProducts, cursor, limit },
    }
  );
  return response.data;
};

export const recommendNewProducts = async (
  cursor = "",
  limit = 10
): Promise<RecommendationResponse> => {
  const response = await axios.get<RecommendationResponse>(
    `${API_BASE_URL}/new`,
    {
      params: { cursor, limit },
    }
  );
  return response.data;
};
