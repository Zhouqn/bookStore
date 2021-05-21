import React, { FC } from 'react';
import { connect } from 'umi';
import { UserModelState } from '@/models/user';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import userStyles from '@/asset/css/user.css';
import { Menu } from 'antd';
import {
  EditOutlined,
  SnippetsOutlined,
  OrderedListOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import AdminInfo from '@/components/admin/AdminInfo';

interface UserInfoProps {
  isLogin: boolean;
}

const commonUser: FC<UserInfoProps> = (props) => {
  const { isLogin } = props;
  return (
    <React.Fragment>
      <Header isLogin={isLogin} />
      <div className={userStyles.commonUser_content}>
        <div className={userStyles.commonUser_content_menu}>
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            style={{ textAlign: 'center' }}
          >
            <Menu.Item key="1" icon={<SnippetsOutlined />}>
              基本信息
            </Menu.Item>
            <Menu.Item key="2" icon={<EditOutlined />}>
              修改密码
            </Menu.Item>
            <Menu.Item key="3" icon={<OrderedListOutlined />}>
              评论过的书籍
            </Menu.Item>
            <Menu.Item key="4" icon={<PlusCircleOutlined />}>
              点赞过的评论
            </Menu.Item>
          </Menu>
        </div>
        <div className={userStyles.commonUser_content_info}>
          <AdminInfo />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default connect(({ user }: { user: UserModelState }) => {
  return {
    isLogin: user.isLogin,
  };
})(commonUser);
