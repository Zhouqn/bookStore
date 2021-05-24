import React, { useState, FC, useEffect } from 'react';
import { connect, Dispatch, Loading, history, Link } from 'umi';
import adminStyles from '@/asset/css/admin.css';
// import { appName } from '@/config';
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
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Add_Edit_BookModal from '@/components/admin/Add_Edit_BookModal';
import AdminSider from '@/components/admin/AdminSider';
import BookList from '@/components/admin/BookList';
import { bookRecordValue, FormValues } from '@/pages/data';
import { UserModelState } from '@/models/user';
import { BookModelState } from '@/models/book';
import bookImg from '@/asset/imgs/book.png';
// import moment from 'moment';
// import { singleUserType } from '@/pages/data';
// import { admin_addBookRecord, admin_editBookRecord } from '@/services/book';
import { getUserInfo } from '@/services/user';

const { Header, Content, Footer } = Layout;

interface ListProps {
  // bookListLoading: boolean;
  // books: bookRecordValue[];
  // page: number;
  // page_size: number;
  // total_count: number;
  // dispatch: Dispatch;
  // isLogin: boolean;
  // isAdmin: boolean;
  // userInfo: singleUserType | {};
}

const AdminBookList: FC<ListProps> = (props) => {
  const {
    // bookListLoading,
    // books,
    // page,
    // page_size,
    // total_count,
    // dispatch,
    // isLogin,
    // isAdmin,
    // userInfo,
  } = props;
  //判断用户状态
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;
  const judgeState = async () => {
    setLoading(true);
    await getUserInfo().then((value) => {
      console.log('getUserInfo_value = ', value);
      if (value.code === 0) {
        setIsLogin(true);
        if (value.data.role === '2') {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    // setLoading(true)
    judgeState();
  }, []);

  //确认退出
  const onConfirmLogoff = () => {
    message.success('退出成功');
  };
  //取消退出
  const onCancelLogoff = () => {
    message.error('取消退出');
  };

  //5秒后页面跳转
  const timeChange = () => {
    // 获取初始时间
    let time = document.getElementById('timeChange');
    // 获取到id为timeChange标签中的数字时间
    if (time) {
      if (parseInt(time.innerHTML) === 0) {
        // 等于0时清除计时，并跳转该指定页面
        history.push('/user/login');
      } else {
        time.innerHTML = String(parseInt(time.innerHTML) - 1);
      }
    }
  };
  const timeCall = () => {
    // 1000毫秒调用一次
    window.onload = () => {
      window.setInterval(() => {
        timeChange();
      }, 1000);
    };
  };

  return loading ? (
    <Spin
      indicator={antIcon}
      style={{ position: 'relative', marginLeft: '50%', marginTop: '20%' }}
    />
  ) : (
    <React.Fragment>
      <Layout className={adminStyles.admin}>
        <AdminSider />
        <Layout className={adminStyles.rightLayout}>
          <Header className={adminStyles.layout_header}>
            管理员页面
            <Avatar
              size={35}
              alt="头像"
              src={<Image src={bookImg} />}
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
          <Footer style={{ textAlign: 'center' }}>
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
          {timeCall()}
        </div>
      )}
    </React.Fragment>
  );
};

export default connect(
  ({
    user,
    book,
    loading,
  }: {
    user: UserModelState;
    book: BookModelState;
    loading: Loading;
  }) => {
    return {
      // bookListLoading: loading.models.book,
      // books: book.books,
      // page: book.page,
      // page_size: book.page_size,
      // total_count: book.total_count,
      // isLogin: user.isLogin,
      // isAdmin: user.isAdmin,
      // userInfo: user.userInfo,
    };
  },
)(AdminBookList);
