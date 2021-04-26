import React from "react";
import {connect} from 'umi'
import { Form, Input, Button, } from 'antd';
import styles from '../index.less'
import Header from "@/pages/components/Header";
import Footer from "@/pages/components/Footer";


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const middleLayout = {
  wrapperCol: { offset: 8, span: 16},
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className={styles.login}>
      <Header/>
      <div className={styles.login_form}>
        <Form className={styles.login_form_test}
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名不能为空！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密&emsp;码"
            name="password"
            rules={[{ required: true, message: '密码不能为空！' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...middleLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="button" onClick={onReset}>
              重置表单
            </Button>
            <Button type="primary" htmlType="button">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer/>
    </div>
  )
}

export default connect()(Login)


