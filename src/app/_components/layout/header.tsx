"use client";

import { Layout, Menu, Input, Row, Col } from "antd";
import Link from "next/link";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface ItemHeader {
  key: string;
  label: string;
  path: string;
}

const { Header } = Layout;

const itemsHeader: ItemHeader[] = [
  { key: "1w", label: "Home", path: "/" },
  { key: "6ov", label: "Profile", path: "/pages/profile" },
  { key: "d4", label: "Login", path: "/auth/login" },
  { key: "5v", label: "Signup", path: "/auth/signup" },
];

const HeaderCustomize: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/pages/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken"); // Xóa token
    Cookies.remove("refreshToken"); // Xóa refresh token
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    router.push("/"); // Chuyển hướng về trang Home
  };

  return (
    <Header className="sticky top-0 z-10">
      <Row justify="space-around" align="middle">
        <Col flex="0.5">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: "100%", maxWidth: 500 }}
          />
        </Col>
        <Col flex={0.2}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            {itemsHeader.map((item) => {
              // Ẩn các tab không cần thiết nếu chưa đăng nhập
              if (!isLoggedIn && [ "6ov"].includes(item.key)) {
                return null;
              }

              // Kiểm tra xem có phải là nút Login/Signup hay không
              if (isLoggedIn && (item.key === "d4" || item.key === "5v")) {
                return null;
              }

              return (
                <Menu.Item key={item.key}>
                  <Link href={item.path}>{item.label}</Link>
                </Menu.Item>
              );
            })}
            {isLoggedIn && (
              <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderCustomize;
