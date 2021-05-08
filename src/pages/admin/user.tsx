import React, { useState } from 'react';
import { connect, Link } from 'umi';
import adminStyles from '@/asset/css/admin.css';
import { appName } from '@/config';
import { Layout, Menu } from 'antd';
import AdminSider from '@/pages/components/AdminSider';
const { Header, Content, Footer, Sider } = Layout;

const adminUser = () => {
  return (
    <React.Fragment>
      <Layout className={adminStyles.admin}>
        <AdminSider />
        <Layout className={adminStyles.rightLayout}>
          <Header className={adminStyles.layout_header}>管理员页面</Header>
          <Content className={adminStyles.layout_content}></Content>
          <Footer style={{ textAlign: 'center' }}>
            {appName} ©2021 Created by zqn
          </Footer>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default connect((state) => {
  console.log(state);
  return {};
})(adminUser);
