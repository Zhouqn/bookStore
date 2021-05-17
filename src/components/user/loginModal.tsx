import React, { FC } from 'react';
import { Link } from 'umi';
import { Modal, Form, Input, message } from 'antd';
import { FormValues } from '@/pages/data';

interface LoginModalProps {
  loginModalVisible: boolean;
  submitLoginModal: (value: FormValues) => void;
  LoginModalHandleCancel: () => void;
  loginModalLoading: boolean;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const LoginModal: FC<LoginModalProps> = (props) => {
  const {
    loginModalVisible,
    submitLoginModal,
    LoginModalHandleCancel,
    loginModalLoading,
  } = props;
  const [form] = Form.useForm();

  //提交
  const loginModalHandleOk = () => {
    form.submit();
  };
  const loginFormOnFinish = () => {
    form
      .validateFields()
      .then((values) => {
        submitLoginModal(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        message.error('请检查你的表单是否填写正确');
      });
  };
  //提交失败
  const loginFormFinishFailed = (errorInfo: any) => {
    console.log('提交失败:', errorInfo);
  };

  return (
    <React.Fragment>
      <Modal
        title="您还未登录，请先登录"
        forceRender
        visible={loginModalVisible}
        okText="登录"
        cancelText="取消"
        onOk={loginModalHandleOk}
        onCancel={LoginModalHandleCancel}
        confirmLoading={loginModalLoading}
      >
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={loginFormOnFinish}
          onFinishFailed={loginFormFinishFailed}
          size="large"
        >
          <Form.Item
            label="用户名："
            name="username"
            rules={[{ required: true, message: '用户名不能为空！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码："
            name="password"
            rules={[{ required: true, message: '密码不能为空！' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        <div style={{ marginLeft: '120px', color: 'grey' }}>
          还没有账号？先进行<Link to="/user/register">注册</Link>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default LoginModal;
