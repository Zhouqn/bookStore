import React, { useState } from 'react';
import { connect } from 'umi';
import adminStyles from '@/asset/css/admin.css';
import { appName } from '@/config';
import { Layout, Avatar, Image, Menu, message } from 'antd';
import { SnippetsOutlined, EditOutlined } from '@ant-design/icons';
import AdminSider from '@/components/admin/AdminSider';
import AdminInfo from '@/components/admin/AdminInfo';
import ChangePassword from '@/components/admin/ChangePassword';
const { Header, Content, Footer } = Layout;

import bookImg from '@/asset/imgs/book.png'; //头像之后会是从数据库取出

const adminUser = () => {
  const SiderMenuSelectedKeys = '2';

  //菜单的选择 基本信息/修改密码
  const [menuFlag, setMenuFlag] = useState(true);
  const adminInfoMenu = () => {
    setMenuFlag(true);
  };
  const changePasswordMenu = () => {
    setMenuFlag(false);
  };

  //修改密码
  const [verifyTrueFlag, setVerifyTrueFlag] = useState(false);
  const [verifyFalseFlag, setVerifyFalseFlag] = useState(false);

  const onBlurVerifyPassword = (e: any) => {
    console.log('onBlurVerifyPassword: ', e.target.value);
    const { value } = e.target;
    if (value === '123123') {
      setVerifyFalseFlag(false);
      setVerifyTrueFlag(true);
    } else if (value === '') {
      setVerifyFalseFlag(false);
    } else {
      setVerifyFalseFlag(true);
    }
  };
  const onChangeVerifyPassword = (e: any) => {
    console.log('onChangeVerifyPassword: ', e.target.value);
    const { value } = e.target;
    setVerifyFalseFlag(false);
    setVerifyTrueFlag(false);
  };
  const onFinishChangePassword = (values: any) => {
    if (verifyTrueFlag) {
      console.log('onFinishChangePassword: ', values);
    } else {
      message.error('请先验证旧密码');
    }
  };

  return (
    <React.Fragment>
      <Layout className={adminStyles.admin}>
        <AdminSider SiderMenuSelectedKeys={SiderMenuSelectedKeys} />
        <Layout className={adminStyles.rightLayout}>
          <Header className={adminStyles.layout_header}>
            管理员页面
            <Avatar
              size={35}
              alt="头像"
              src={<Image src={bookImg} />}
              className={adminStyles.adminUser_avatar}
              // style={{border:'1px solid', backgroundColor:"lightgrey", marginLeft:"10px"}}
            />
            <a className={adminStyles.adminUser_logout}>退出登录</a>
            <a className={adminStyles.adminUser_logoff}>注销</a>
          </Header>
          <Content className={adminStyles.layout_content}>
            <div className={adminStyles.adminUser_content}>
              <div className={adminStyles.adminUser_contentLeft}>
                <Menu
                  defaultSelectedKeys={['1']}
                  mode="inline"
                  style={{ textAlign: 'center', width: '50%' }}
                >
                  <Menu.Item
                    key="1"
                    icon={<SnippetsOutlined />}
                    onClick={adminInfoMenu}
                  >
                    基本信息
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<EditOutlined />}
                    onClick={changePasswordMenu}
                  >
                    修改密码
                  </Menu.Item>
                </Menu>
              </div>
              {/*管理员信息*/}
              <div style={{ display: menuFlag ? '' : 'none' }}>
                <AdminInfo />
              </div>
              {/*修改密码*/}
              <div
                style={{ display: menuFlag ? 'none' : '' }}
                className={adminStyles.adminUser_contentRight}
              >
                <ChangePassword
                  onFinishChangePassword={onFinishChangePassword}
                  onChangeVerifyPassword={onChangeVerifyPassword}
                  onBlurVerifyPassword={onBlurVerifyPassword}
                  verifyTrueFlag={verifyTrueFlag}
                  verifyFalseFlag={verifyFalseFlag}
                />
              </div>
            </div>
          </Content>
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
