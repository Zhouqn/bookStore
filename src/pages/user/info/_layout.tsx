import React, { FC, useEffect } from 'react';
import { connect, Link, history, Loading } from 'umi';
import { UserModelState } from '@/models/user';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import userStyles from '@/asset/css/user.css';
import { Menu, Spin } from 'antd';
import {
  EditOutlined,
  SnippetsOutlined,
  UnorderedListOutlined,
  HeartOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

interface UserInfoProps {
  isLogin: boolean;
  userModelLoading: boolean;
  user_info_menu: string;
}

const commonUser: FC<UserInfoProps> = (props) => {
  const { isLogin, userModelLoading, user_info_menu } = props;
  useEffect(() => {
    history.push('/user/info/basicInfo');
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;

  return userModelLoading ? (
    <Spin
      indicator={antIcon}
      style={{ position: 'absolute', top: '40%', left: '50%' }}
    />
  ) : (
    <div className={userStyles.commonUser}>
      <Header isLogin={isLogin} />
      <div className={userStyles.commonUser_content}>
        <div className={userStyles.commonUser_content_left}>
          <div className={userStyles.commonUser_content_menu}>
            <Menu
              defaultSelectedKeys={['1']}
              selectedKeys={[user_info_menu]}
              mode="inline"
              style={{ textAlign: 'center' }}
            >
              <Menu.Item key="1" icon={<SnippetsOutlined />}>
                <Link to="/user/info/basicInfo">基本信息</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<EditOutlined />}>
                <Link to="/user/info/changePassword">修改密码</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                <Link to="/user/info/myComments">我的评论</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<HeartOutlined />}>
                <Link to="/user/info/likeComments">我的点赞</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className={userStyles.commonUser_content_right}>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => {
    return {
      isLogin: user.isLogin,
      userModelLoading: loading.models.user,
      user_info_menu: user.user_info_menu,
    };
  },
)(commonUser);
