import React, { FC, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import adminStyles from '@/asset/css/admin.css';

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
  // const [verifyFlag, setVerifyFlag] = useState(false)
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
      <div className={adminStyles.adminUser_contentRight}>
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
            hasFeedback
          >
            <Input.Password
              onBlur={(e) => {
                onBlurVerifyPassword(e);
              }}
              onChange={(e) => {
                onChangeVerifyPassword(e);
              }}
            />
            <div style={{ display: verifyTrueFlag ? '' : 'none' }}>
              <CheckCircleOutlined style={{ color: 'darkgreen' }} />
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
            <div style={{ display: verifyFalseFlag ? '' : 'none' }}>
              <CloseCircleOutlined style={{ color: 'red' }} />
              <a style={{ color: 'red', marginLeft: '5px', cursor: 'default' }}>
                密码错误
              </a>
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
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认新密码"
            dependencies={['password']}
            hasFeedback
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
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default ChangePassword;
