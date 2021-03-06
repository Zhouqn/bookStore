import adminStyles from '@/asset/css/admin.css';
import bookImg from '@/asset/imgs/book.png';
import { appName } from '@/config';
import { Layout, Menu } from 'antd';
import { AlignCenterOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import React, { FC } from 'react';
const { Sider } = Layout;

interface AdminSiderProps {
  admin_sider_menu: string;
}

const AdminSider: FC<AdminSiderProps> = (props) => {
  const { admin_sider_menu } = props;
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
        <img
          alt=""
          src={bookImg}
          className={adminStyles.logoImg}
          // onClick={goToIndex}
        />
        {/*<a onClick={goToIndex}>{appName}</a>*/}
        <a>{appName}</a>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        selectedKeys={[admin_sider_menu]}
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
          <Link to="/admin/info/basicInfo">个人中心</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;
