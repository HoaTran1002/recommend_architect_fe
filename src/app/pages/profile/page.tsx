"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Card,
  Col,
  Row,
  Spin,
  Typography,
  List,
  Button,
  Form,
  Input,
  message,
} from "antd";
import {
  MailOutlined,
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ClientLayout from "@/app/_components/layout";
export interface User {
  email: string;
  userName: string;
  password: string;
  address?: string;
  age?: number;
  numberPhone?: string;
  gender?: string;
  active: boolean;
  searchHistory?: string[];
  refresh_token?: string;
  interests?: string[];
  preferredCategories?: string[];
  purchaseHistory?: string[];
  viewedProducts?: string[];
  recommendedProducts?: string[];
}
const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const userId = "6721db26b2ebae2aa08b16c0"; // ID người dùng

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        form.setFieldsValue(response.data); // Đặt giá trị cho form
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleUpdate = async (values: User) => {
    try {
      const token = Cookies.get("accessToken");
      await axios.put(`http://localhost:3000/user/${userId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Profile updated successfully!");
      setEditing(false);
      setUser(values);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    }
  };

  if (loading) return <Spin tip="Loading..." />;

  return (
    <ClientLayout>
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col span={12} style={{ minWidth: 800 }}>
        <Card title="User Profile" bordered={false}>
          {editing ? (
            <Form form={form} onFinish={handleUpdate}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                name="userName"
                label="User Name"
                rules={[{ required: true }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item name="address" label="Address">
                <Input prefix={<HomeOutlined />} />
              </Form.Item>
              <Form.Item name="age" label="Age">
                <Input prefix={<InfoCircleOutlined />} type="number" />
              </Form.Item>
              <Form.Item name="numberPhone" label="Phone">
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
              <Form.Item name="gender" label="Gender">
                <Input prefix={<InfoCircleOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <>
              <Title level={4}>Profile Details</Title>
              <List>
                <List.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MailOutlined style={{ marginRight: 4 }} />
                    <Text strong>Email:</Text>
                    <Text style={{ marginLeft: 8 }}>{user?.email}</Text>
                  </div>
                </List.Item>
                <List.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <UserOutlined style={{ marginRight: 4 }} />
                    <Text strong>User Name:</Text>
                    <Text style={{ marginLeft: 8 }}>{user?.userName}</Text>
                  </div>
                </List.Item>
                <List.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <HomeOutlined style={{ marginRight: 4 }} />
                    <Text strong>Address:</Text>
                    <Text style={{ marginLeft: 8 }}>
                      {user?.address || "N/A"}
                    </Text>
                  </div>
                </List.Item>
                <List.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                    <Text strong>Age:</Text>
                    <Text style={{ marginLeft: 8 }}>{user?.age || "N/A"}</Text>
                  </div>
                </List.Item>
                <List.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PhoneOutlined style={{ marginRight: 4 }} />
                    <Text strong>Phone:</Text>
                    <Text style={{ marginLeft: 8 }}>
                      {user?.numberPhone || "N/A"}
                    </Text>
                  </div>
                </List.Item>
                <List.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                    <Text strong>Gender:</Text>
                    <Text style={{ marginLeft: 8 }}>
                      {user?.gender || "N/A"}
                    </Text>
                  </div>
                </List.Item>
                <List.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CheckCircleOutlined style={{ marginRight: 4 }} />
                    <Text strong>Active:</Text>
                    <Text style={{ marginLeft: 8 }}>
                      {user?.active ? "Yes" : "No"}
                    </Text>
                  </div>
                </List.Item>
                <List.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text strong>Interests:</Text>
                    <Text style={{ marginLeft: 8 }}>
                      {" "}
                      {user?.interests?.join(", ") || "N/A"}
                    </Text>
                  </div>
                </List.Item>
                <Button type="primary" onClick={handleEdit}>
                  Edit Profile
                </Button>
              </List>
            </>
          )}
        </Card>
      </Col>
    </Row>
    </ClientLayout>

  );
};

export default Profile;
