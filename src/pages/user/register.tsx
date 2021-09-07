import { Form, Input, Button, Radio, message } from 'antd';
import { connect, Link, Dispatch } from 'umi';
import styles from '@/asset/css/user.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import bookImg from '@/asset/imgs/book.png';
import React, { FC } from 'react';
import { useState } from 'react';
import { appName } from '@/config';
import { UserModelState } from '@/models/user';
import { FormValues, userAllType } from '@/pages/data';
// @ts-ignore
import md5 from 'md5';

interface RegisterProps {
  dispatch: Dispatch;
  isLogin: boolean;
  userInfo: userAllType;
}

const Register: FC<RegisterProps> = (props) => {
  const { dispatch, isLogin, userInfo } = props;
  const [value, setValue] = useState(1);
  const onFinish = (values: FormValues) => {
    dispatch({
      type: 'user/goRegister',
      payload: {
        username: values.username,
        password: md5(values.password),
        gender: `${values.gender}`,
      },
    });
  };

  const onGenderChange = (e: any) => {
    setValue(e.target.value);
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
    <div className={styles.register}>
      <Header
        isLogin={isLogin}
        onConfirmLogoff={onConfirmLogoff}
        onCancelLogoff={onCancelLogoff}
        userInfo={userInfo}
      />
      <div className={styles.register_middle}>
        <div className={styles.registerForm_middle}>
          <div className={styles.registerForm_title}>
            <img alt="" src={bookImg} className={styles.register_bookImg} />
            欢迎注册{appName}
          </div>
          <div className={styles.register_form}>
            <Form
              name="nest-messages"
              onFinish={onFinish}
              size="large"
              style={{ maxWidth: '450px', margin: 'auto' }}
              initialValues={{ gender: 1 }}
            >
              <Form.Item
                name="username"
                label="用&nbsp;&nbsp;户&nbsp;&nbsp;名"
                rules={[
                  {
                    required: true,
                    message: '用户名不能为空！',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="密&emsp;&emsp;码"
                rules={[
                  {
                    required: true,
                    message: '请输入您的密码！',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: '请确认你的密码！',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('密码不正确！'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="gender"
                label="性&emsp;&emsp;别:"
                style={{ marginLeft: '10px' }}
              >
                <Radio.Group onChange={onGenderChange} value={value}>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '25%', marginLeft: '45%' }}
                >
                  提交
                </Button>
              </Form.Item>
              <p style={{ marginLeft: '45%' }}>
                已有账号?去<Link to="/user/login">登录</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(({ user }: { user: UserModelState }) => {
  return {
    isLogin: user.isLogin,
    userInfo: user.userInfo,
  };
})(Register);
