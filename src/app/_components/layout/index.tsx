"use client"
import { Layout, Menu } from 'antd';
import React from 'react';
import FooterCustomize from './footer';
import BreadcrumbCustomize from './breadcrumb';
import HeaderCustomize from './header';

const { Content } = Layout;

const ClientLayout: React.FC<{children:React.ReactNode}> = ({children}) => (
  <Layout className="layout">
    <HeaderCustomize></HeaderCustomize>
    <Content style={{ padding: '0 50px' }}>
      <BreadcrumbCustomize></BreadcrumbCustomize>
      <div className="site-layout-content">{children}</div>
    </Content>
    <FooterCustomize></FooterCustomize>
  </Layout>
);

export default ClientLayout;
