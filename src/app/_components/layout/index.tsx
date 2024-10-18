"use client";

import { Layout } from 'antd';
import FooterCustomize from './footer';
import HeaderCustomize from './header';
import Breadcrumbs from '../breadcrumb/breadCrumbs';
import React from 'react';
import ContentComponent from './content';

const ClientLayout = ({ children }:{children:React.ReactNode}) => (
  <Layout>
    <HeaderCustomize />
    
      <ContentComponent>
      {/* <Breadcrumbs /> */}
        {children}
      </ContentComponent>

    <FooterCustomize />
  </Layout>
);

export default ClientLayout;
