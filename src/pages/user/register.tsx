import { Form, Input, Button, Radio } from 'antd';
import {connect} from 'umi'
import styles from '../index.less'
import Header from '../components/Header'
import Footer from '../components/Footer'
import bookImg from "@/asset/imgs/book.png";
import React from "react";
import {useState} from "react";


const Register = () => {

  const [value, setValue] = useState(1);
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onChange = (e:any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className={styles.register}>
      <Header/>
      <div className={styles.registerForm_title}>
        <img alt="" src={bookImg} className={styles.register_bookImg}/>
        欢迎注册XX图书系统
      </div>
      <div className={styles.register_form}>
        <Form  name="nest-messages" onFinish={onFinish} size="large"  style={{maxWidth:"450px", margin:"auto"}} >
          <Form.Item
            name={['user', 'name']}
            label="用&nbsp;&nbsp;户&nbsp;&nbsp;名"
            rules={[
                {
                  required: true,
                  message:'用户名不能为空！'
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
          <Form.Item name="sex" label="性&emsp;&emsp;别:" style={{marginLeft:"10px"}}>
            <Radio.Group onChange={onChange} defaultValue={value} value={value}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" style={{width:"25%", marginLeft:"45%"}}>
              提交
            </Button>

          </Form.Item>
          <p style={{marginLeft:"45%"}}>已有账号?去<a>登录</a></p>
        </Form>
      </div>
      <Footer/>
    </div>
  );
};

export default connect()(Register)
