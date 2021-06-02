import React, { FC } from 'react';
import { connect, Dispatch, Loading, history, Link } from 'umi';
import adminStyles from '@/asset/css/admin.css';
import {
  Avatar,
  Image,
  Layout,
  message,
  Popconfirm,
  Modal,
  Result,
  Divider,
  Spin,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AdminSider from '@/components/admin/AdminSider';
import { UserModelState } from '@/models/user';
import defaultAvatarImg from '@/asset/imgs/avatar.png';
import { userAllType } from '@/pages/data';
import { timeCall } from '@/config';

const { Header, Content, Footer } = Layout;

interface ListProps {
  dispatch: Dispatch;
  userModelLoading: boolean;
  isLogin: boolean;
  isAdmin: boolean;
  admin_sider_menu: string;
  admin_info_menu: string;
  userInfo: userAllType;
}

const AdminBookList: FC<ListProps> = (props) => {
  const {
    dispatch,
    userModelLoading,
    isLogin,
    isAdmin,
    admin_sider_menu,
    userInfo,
  } = props;

  //加载图标
  const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;

  //确认退出
  const onConfirmLogoff = () => {
    dispatch({
      type: 'user/goLogoff',
      payload: {},
    });
  };
  //取消退出
  const onCancelLogoff = () => {
    message.error('取消退出');
  };

  //5秒后页面跳转
  window.onload = () => {
    if (!isLogin) {
      timeCall();
    }
  };

  return userModelLoading ? (
    <Spin
      indicator={antIcon}
      style={{ position: 'relative', marginLeft: '50%', marginTop: '20%' }}
    />
  ) : (
    <React.Fragment>
      <Layout className={adminStyles.admin}>
        <AdminSider admin_sider_menu={admin_sider_menu} />
        <Layout className={adminStyles.rightLayout}>
          <Header className={adminStyles.layout_header}>
            管理员页面
            <Avatar
              size={35}
              alt="头像"
              src={
                <Image
                  src={
                    userInfo && userInfo.avatar
                      ? userInfo.avatar
                      : defaultAvatarImg
                  }
                />
              }
              className={adminStyles.adminUser_avatar}
            />
            <Popconfirm
              title="确定退出吗?"
              onConfirm={onConfirmLogoff}
              onCancel={onCancelLogoff}
              okText="Yes"
              cancelText="No"
            >
              <a className={adminStyles.adminUser_logoff}>退出登录</a>
            </Popconfirm>
          </Header>
          <Content className={adminStyles.layout_content}>
            {props.children}
          </Content>
          <Footer style={{ textAlign: 'center', width: '1720px' }}>
            京ICP备2021015788号©2021
          </Footer>
        </Layout>
      </Layout>

      {isLogin && isAdmin ? null : (
        <div>
          <div className={adminStyles.verifyModal} />
          <Modal visible={true} footer={false} closable={false}>
            {isLogin ? (
              <Result
                status="warning"
                title="此页面为管理员页面，当前权限不够，请先进行管理员登录！"
              />
            ) : (
              <Result status="warning" title="您当前没有登录，请先进行登录！" />
            )}
            <Divider />
            <div style={{ color: 'grey' }}>
              请稍后，<span id="timeChange">5</span>秒后会自动跳转到登录页面！
              <Link to="/user/login">去登陆</Link>
            </div>
          </Modal>
        </div>
      )}
    </React.Fragment>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => {
    return {
      userModelLoading: loading.models.user,
      isLogin: user.isLogin,
      isAdmin: user.isAdmin,
      admin_sider_menu: user.admin_sider_menu,
      admin_info_menu: user.admin_info_menu,
      userInfo: user.userInfo,
    };
  },
)(AdminBookList);
