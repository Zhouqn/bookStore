import React, { FC } from 'react';
import { connect, Dispatch, Link } from 'umi';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { appName } from '@/config';
import styles from '@/asset/css/user.css';
import bookImg from '@/asset/imgs/book.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// @ts-ignore
import md5 from 'md5';
import { UserModelState } from '@/models/user';
import { FormValues, userAllType } from '@/pages/data';

interface LoginProps {
  dispatch: Dispatch;
  isLogin: boolean;
  userInfo: userAllType;
}

const Login: FC<LoginProps> = (props) => {
  const { dispatch, isLogin, userInfo } = props;

  const onFinish = (values: FormValues) => {
    console.log('Success:', values);
    dispatch({
      type: 'user/goLogin',
      payload: {
        username: values.username,
        password: md5(values.password),
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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

  return (
    <div className={styles.login}>
      <Header
        isLogin={isLogin}
        onConfirmLogoff={onConfirmLogoff}
        onCancelLogoff={onCancelLogoff}
        userInfo={userInfo}
      />

      <div className={styles.loginForm_title}>
        <img alt="" src={bookImg} className={styles.login_bookImg} />
        欢迎登陆{appName}
      </div>
      <div className={styles.login_form}>
        <Form
          name="normal_login"
          style={{ maxWidth: 400, margin: 'auto' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <Form.Item
            // style={{marginTop:"10px"}}
            name="username"
            rules={[{ required: true, message: '用户名不能为空 !' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '20px' }}
            name="password"
            rules={[{ required: true, message: '密码不能为空 !' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密&emsp;码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="" style={{ float: 'right' }}>
              忘记密码
            </a>
          </Form.Item>

          <Form.Item style={{ fontSize: '15px' }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%' }}
            >
              登录
            </Button>
            还没有账号?请先进行<Link to="/user/register">注册</Link>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default connect(({ user }: { user: UserModelState }) => {
  console.log('user = ', user);
  return {
    isLogin: user.isLogin,
    userInfo: user.userInfo,
  };
})(Login);
