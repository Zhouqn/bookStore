import React from "react";
import {connect} from 'umi'
import { Form, Input, Button, Checkbox} from 'antd';
import { UserOutlined, LockOutlined,  } from '@ant-design/icons';
import styles from '../index.less'
import bookImg from '../../asset/imgs/book.png'
import WelcomeHeader from "@/pages/components/WelcomeHeader";
import Footer from "@/pages/components/Footer";


const Login = () => {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };


  return (
    <div className={styles.login}>
      <WelcomeHeader/>
      <div className={styles.loginForm_title}>
        <img alt="" src={bookImg} className={styles.login_bookImg}/>
        欢迎登陆XX图书系统
      </div>
      <div className={styles.login_form}>
        <Form
          name="normal_login"
          style={{maxWidth:400, margin:"auto"}}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            // style={{marginTop:"10px"}}
            name="username"
            rules={[{ required: true, message: '用户名不能为空 !' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            style={{marginTop:"20px"}}
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

            <a className="login-form-forgot" href="" style={{float:"right",}}>
              忘记密码
            </a>
          </Form.Item>

          <Form.Item style={{fontSize:"15px",}} >
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%",}}>
              登 录
            </Button>
            还没有账号?请先进行<a href="">注册</a>
          </Form.Item>
        </Form>
      </div>
      <Footer/>
    </div>
  )
}

export default connect()(Login)

