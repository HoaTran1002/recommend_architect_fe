/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Đảm bảo rằng bạn sử dụng client component
import React, { useEffect, useState } from "react";
import { Button, Table, Space, Modal, Form, Input, notification, Select } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  releaseDate?: string;
  isActive: boolean;
  tags?: string[];
  categoryId: string;
  enrollmentCount?: number;
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
}

interface Category {
  _id: string;
  name: string;
}

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/home");
    } else {
      fetchProducts();
      fetchCategories();
    }
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/product");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      notification.error({ message: "Lỗi khi lấy sản phẩm!" });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      notification.error({ message: "Lỗi khi lấy danh mục!" });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Không xác định";
  };

  const handleAddProduct = () => {
    form.resetFields();
    setEditingProduct(null);
    setSelectedCategoryId(undefined); // Reset category selection
    setIsModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    form.setFieldsValue({ ...product });
    setEditingProduct(product);
    setSelectedCategoryId(product.categoryId); // Set the selected category for editing
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");
      notification.success({ message: "Xóa sản phẩm thành công!" });
      fetchProducts();
    } catch (error) {
      notification.error({ message: "Có lỗi xảy ra khi xóa sản phẩm!" });
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      values.price = Number(values.price);
      values.enrollmentCount = values.enrollmentCount || 0;
      values.rating = values.rating || 0;
      values.ratingCount = values.ratingCount || 0;
      values.discount = values.discount || 0;
      values.viewCount = values.viewCount || 0;
      values.prerequisites = values.prerequisites || [];
      values.duration = values.duration || "0 hours";
      values.language = values.language || "English";
      values.purchaseCount = values.purchaseCount || 0;
      values.popularityScore = values.popularityScore || 0;
      values.videoPreviewUrl = values.videoPreviewUrl || "";
      values.learningObjectives = values.learningObjectives || [];
      values.certificate = values.certificate || false;
      values.refundPolicy = values.refundPolicy || "";
      values.targetAudience = values.targetAudience || [];
    
      if (typeof values.tags === "string") {
        values.tags = values.tags.split(",").map((tag: string) => tag.trim());
      }

      const method = editingProduct ? "PATCH" : "POST";
      const url = editingProduct
        ? `http://localhost:3000/product/${editingProduct._id}`
        : "http://localhost:3000/product/";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, categoryId: selectedCategoryId }), // Use selectedCategoryId here
      });
      if (!response.ok) throw new Error("Failed to save product");

      notification.success({ message: editingProduct ? "Cập nhật sản phẩm thành công!" : "Thêm sản phẩm thành công!" });
      setIsModalVisible(false);
      fetchProducts();
    } catch (error) {
      notification.error({ message: "Có lỗi xảy ra khi thêm/cập nhật sản phẩm!" });
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value); // Update the selected category id
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Danh mục",
      key: "categoryId",
      render: (_: any, record: Product) => <span>{getCategoryName(record.categoryId)}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button onClick={() => handleEditProduct(record)}>Chi tiết</Button>
          <Button type="danger" onClick={() => handleDeleteProduct(record._id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <Button type="primary" onClick={handleAddProduct}>Thêm sản phẩm</Button>
      <Table columns={columns} dataSource={products} rowKey="_id" />

      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="releaseDate" label="Ngày phát hành">
            <Input type="date" />
          </Form.Item>
          <Form.Item name="isActive" label="Kích hoạt" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Input placeholder="Chia cách bằng dấu phẩy" />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn một danh mục!" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              options={categories.map((category) => ({
                label: category.name,
                value: category._id,
              }))}
              value={selectedCategoryId} // Bind the value to selectedCategoryId
              onChange={handleCategoryChange} // Call handleCategoryChange on change
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsPage;
