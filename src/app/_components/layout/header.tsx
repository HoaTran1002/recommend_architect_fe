import { Layout, Menu, Input, Row, Col } from 'antd';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';

interface ItemHeader {
  key: string;
  label: string;
  path: string;
}

const { Header } = Layout;

const itemsHeader: ItemHeader[] = [
  {
    key: '1w',
    label: 'Home',
    path: '/',
  },
  {
    key: 'd2',
    label: 'Courses',
    path: '/pages/courses',
  },
  {
    key: 'v3',
    label: 'Learning',
    path: '/pages/learning',
  }
  ,
  {
    key: '3f',
    label: 'Cart',
    path: '/pages/cart',
  },
  {
    key: '6ov',
    label: 'Profile',
    path: '/pages/profile',
  },
  {
    key: 'd4',
    label: 'Login',
    path: '/auth/login',
  },
  {
    key: '5v',
    label: 'Signup',
    path: '/auth/signup',
  },

];

export default function HeaderCustomize() {
  return (
    <Header className='sticky top-0 z-10'>
      <Row justify="space-around" align="middle">
        <Col flex="0.5">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            style={{ width: '100%', maxWidth: 500 }}
          />
        </Col>
        <Col flex={0.2}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} >
            {itemsHeader.map((item) => (
              <Menu.Item key={item.key}>
                <Link href={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
      </Row>
    </Header>
  );
}
