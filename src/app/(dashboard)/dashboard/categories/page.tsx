/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  notification,
  Checkbox,
  Select,
  Tag,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  products: string[];
  tags: string[];
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // Lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category");
      setCategories(response.data);
    } catch (error) {
      notification.error({ message: "Lỗi khi lấy danh mục!" });
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProducts(response.data);
    } catch (error) {
      notification.error({ message: "Lỗi khi lấy sản phẩm!" });
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tags");
      setAvailableTags(response.data);
    } catch (error) {
      notification.error({ message: "Lỗi khi lấy tags!" });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchTags();
  }, []);

  const showModal = (category: Category | null) => {
    setEditingCategory(category);
    form.resetFields();
    if (category) {
      form.setFieldsValue({
        ...category,
        products: category.products || [],
        tags: category.tags || [],
      });
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();
    values.tags = values.tags || [];
    
    delete values.products;

    try {
        if (editingCategory) {
            await axios.patch(`http://localhost:3000/category/${editingCategory._id}`, values);
            notification.success({ message: "Cập nhật danh mục thành công!" });
        } else {
            await axios.post("http://localhost:3000/category", values);
            notification.success({ message: "Thêm danh mục thành công!" });
        }
        setIsModalVisible(false);
        fetchCategories();
    } catch (error) {
        notification.error({ message: "Lỗi khi thêm/cập nhật danh mục!" });
    }
};


  // Xử lý xóa danh mục
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/category/${id}`);
      notification.success({ message: "Xóa danh mục thành công!" });
      fetchCategories();
    } catch (error) {
      notification.error({ message: "Lỗi khi xóa danh mục!" });
    }
  };

  // Xử lý thêm tag mới
  const handleAddTag = () => {
    if (newTag && !availableTags.includes(newTag)) {
      setAvailableTags([...availableTags, newTag]);
      setNewTag("");
    }
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Kích hoạt" : "Không kích hoạt"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text: any, record: Category) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            danger
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
        Thêm danh mục
      </Button>
      <Table dataSource={categories} columns={columns} rowKey="_id" />

      <Modal
        title={editingCategory ? "Cập nhật danh mục" : "Thêm danh mục"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="products"
            label="Sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn ít nhất một sản phẩm!" }]}
          >
            <Select mode="multiple" allowClear>
              {products.map((product) => (
                <Select.Option key={product._id} value={product._id}>
                  {product.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onPressEnter={handleAddTag}
              placeholder="Nhập tag mới và nhấn Enter"
              style={{ marginTop: 8 }}
            />
            <div style={{ marginTop: 8 }}>
              {form.getFieldValue("tags")?.map((tag: string, index: number) => (
                <Tag key={index} closable onClose={() => {
                  const currentTags = form.getFieldValue("tags") || [];
                  form.setFieldsValue({ tags: currentTags.filter((t: string) => t !== tag) });
                }}>
                  {tag}
                </Tag>
              ))}
            </div>
          </Form.Item>
          <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoriesPage;
