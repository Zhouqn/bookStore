import React, { useState } from 'react';
import { connect } from 'umi';
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  Upload,
  message,
  Select,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const Authors = [
  {
    name: 'jack',
  },
  {
    name: 'rose',
  },
  {
    name: 'mick',
  },
  {
    name: 'xiXi',
  },
  {
    name: '安徒生',
  },
];

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface AddBookModalProps {
  addBookModalVisible: boolean;
  onAddBook: (values: Values) => void;
  onCancelAddBook: () => void;
}

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG格式!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const AddBookModal: React.FC<AddBookModalProps> = (props) => {
  const { addBookModalVisible, onAddBook, onCancelAddBook } = props;
  const [form] = Form.useForm();
  const config = {
    rules: [{ type: 'object' as const, required: true, message: '选择时间!' }],
  };

  const layoutFrom = {
    labelCol: { span: 5 },
    wrapperCol: { span: 21 },
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const addBookOnOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onAddBook(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const chooseAuthor = (value: any) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal
      visible={addBookModalVisible}
      title="添加新书"
      okText="添加"
      cancelText="取消"
      onCancel={onCancelAddBook}
      onOk={addBookOnOk}
    >
      <Form
        form={form}
        // layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
        {...layoutFrom}
      >
        <Form.Item label="上传书封面">
          <Upload
            name="cover_uri"
            listType="picture-card"
            className="bookCover_uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="bookCover" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="number"
          label="书编号"
          rules={[{ required: true, message: '书编号不能为空!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="书名"
          rules={[{ required: true, message: '书名不能为空!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="author" label="作者">
          <Select style={{ width: 150 }} onChange={chooseAuthor}>
            {Authors.map((author, i) => {
              return (
                <Option key={i} value={author.name}>
                  {author.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="pub"
          label="出版社"
          rules={[{ required: true, message: '书名不能为空!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="date-picker" label="出版日期" {...config}>
          <DatePicker placeholder="选择出版日期" />
        </Form.Item>
        <Form.Item name="description" label="信息描述">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
