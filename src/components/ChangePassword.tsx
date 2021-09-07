import React, { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface ChangePasswordProps {
  onFinishChangePassword: (value: any) => void;
  onChangeVerifyPassword: (value: any) => void;
  onBlurVerifyPassword: (value: any) => void;
  verifyTrueFlag: boolean;
  verifyFalseFlag: boolean;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const ChangePassword: FC<ChangePasswordProps> = (props) => {
  const [formVerify] = Form.useForm();
  const [formRegister] = Form.useForm();
  const {
    onFinishChangePassword,
    onBlurVerifyPassword,
    onChangeVerifyPassword,
    verifyTrueFlag,
    verifyFalseFlag,
  } = props;

  return (
    <React.Fragment>
      <Form
        {...formItemLayout}
        form={formVerify}
        name="verify"
        scrollToFirstError
        size="large"
        style={{ marginLeft: '-100px', marginTop: '100px' }}
      >
        <Form.Item
          name="password"
          label="原密码"
          rules={[
            {
              required: true,
              message: '请输入原密码!',
            },
          ]}
        >
          <div style={{ display: 'flex' }}>
            <Input.Password
              placeholder="请先验证旧密码，失焦自动验证"
              onBlur={(e) => {
                onBlurVerifyPassword(e);
              }}
              onChange={(e) => {
                onChangeVerifyPassword(e);
              }}
              allowClear
              style={{ width: '380px' }}
            />
            <div
              key={1}
              style={{
                display: verifyTrueFlag ? '' : 'none',
                marginTop: '7px',
              }}
            >
              <CheckCircleOutlined
                style={{ color: 'darkgreen', marginLeft: '10px' }}
              />
              <a
                style={{
                  color: 'darkgreen',
                  marginLeft: '5px',
                  cursor: 'default',
                }}
              >
                验证成功
              </a>
            </div>
            <div
              key={2}
              style={{
                display: verifyFalseFlag ? '' : 'none',
                marginTop: '7px',
              }}
            >
              <CloseCircleOutlined
                style={{ color: 'red', marginLeft: '10px' }}
              />
              <a style={{ color: 'red', marginLeft: '5px', cursor: 'default' }}>
                密码错误
              </a>
            </div>
          </div>
        </Form.Item>
      </Form>
      <Form
        {...formItemLayout}
        form={formRegister}
        name="register"
        onFinish={onFinishChangePassword}
        scrollToFirstError
        size="large"
        style={{ marginLeft: '-100px' }}
      >
        <Form.Item
          name="password"
          label="新密码"
          rules={[
            {
              required: true,
              message: '请输入新密码!',
            },
          ]}
        >
          <Input.Password allowClear style={{ width: '380px' }} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认新密码"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请确认新密码!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('与第一次输入的密码不相同!'));
              },
            }),
          ]}
        >
          <Input.Password allowClear style={{ width: '380px' }} />
        </Form.Item>
        <Form.Item name="submit" {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" disabled={!verifyTrueFlag}>
            提交修改
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default ChangePassword;
