import adminStyles from '@/asset/css/admin.css';
import bookImg from '@/asset/imgs/book.png';
import { appName } from '@/config';
import { Layout, Menu } from 'antd';
import { AlignCenterOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import React from 'react';
const { Sider } = Layout;

interface AdminSiderProps {
  SiderMenuSelectedKeys: string;
}

const AdminSider = (props: AdminSiderProps) => {
  const { SiderMenuSelectedKeys } = props;
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className={adminStyles.logo}>
        <img alt="" src={bookImg} className={adminStyles.logoImg} />
        <p>{appName}</p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[SiderMenuSelectedKeys]}
      >
        <Menu.Item
          key="1"
          icon={
            <AlignCenterOutlined
              style={{ fontSize: '18px', marginRight: '25px' }}
            />
          }
          style={{ fontSize: '15px', marginTop: '50px' }}
        >
          <Link to="/admin/book/list">书列表</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={
            <UserOutlined style={{ fontSize: '18px', marginRight: '25px' }} />
          }
          style={{ fontSize: '15px', marginTop: '50px' }}
        >
          <Link to="/admin/adminUser">个人中心</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;
