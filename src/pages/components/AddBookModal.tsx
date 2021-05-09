import React, { useState, FC } from 'react';
import { Button, Modal, Form, Input, DatePicker, Upload, message } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { BookRecordValue } from '@/pages/admin/data';

interface AddBookModalProps {
  addBookModalVisible: boolean;
  onAddBook: (values: BookRecordValue) => void;
  onCancelAddBook: () => void;
}

const AddBookModal: FC<AddBookModalProps> = (props) => {
  //Model
  const { addBookModalVisible, onAddBook, onCancelAddBook } = props;
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

  //Model Form
  const [form] = Form.useForm();
  const layoutFrom = {
    labelCol: { span: 5 },
    wrapperCol: { span: 21 },
  };

  //From Item
  //上传封面
  const [bookCoverLoading, setBookCoverLoading] = useState(false);
  const bookCoverFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const bookCoverUploadConfig = {
    beforeUpload: (file: any) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传JPG/PNG格式!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片必须小于2MB!');
      }
      return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
    },
    onChange: (info: any) => {
      console.log(info.fileList);
      if (info.file.status === 'uploading') {
        setBookCoverLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        setBookCoverLoading(false);
      }
    },
  };
  //选择日期
  const dateTimeConfig = {
    rules: [{ type: 'object' as const, required: true, message: '选择时间!' }],
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
      <Form form={form} name="form_in_modal" {...layoutFrom}>
        <Form.Item
          name="cover_uri"
          label="上传书封面"
          rules={[{ required: true, message: '请上传书封面!' }]}
          valuePropName="fileList"
          getValueFromEvent={bookCoverFile}
        >
          <Upload
            name="bookCover"
            listType="picture"
            maxCount={1}
            // action="/upload.do"
            {...bookCoverUploadConfig}
          >
            <Button
              icon={bookCoverLoading ? <LoadingOutlined /> : <UploadOutlined />}
            >
              上传
            </Button>
            <span style={{ color: 'grey' }}>
              只能上传png和jpg格式文件, 大小不超过2M
            </span>
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
        <Form.Item
          name="author"
          label="作者"
          rules={[{ required: true, message: '作者不能为空!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pub"
          label="出版社"
          rules={[{ required: true, message: '出版社不能为空!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="published_time"
          label="出版日期"
          {...dateTimeConfig}
          rules={[{ required: true, message: '请选择出版日期!' }]}
        >
          <DatePicker placeholder="选择出版日期" />
        </Form.Item>
        <Form.Item
          name="description"
          label="信息描述"
          rules={[{ required: true, message: '请对此书进行简单描述!' }]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
