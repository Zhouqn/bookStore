import React, { FC, useState, useEffect } from 'react';
import { Button, Modal, Form, Input, DatePicker, Upload, message } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { BookRecordValue } from '@/pages/admin/data';
import moment from 'moment';

interface Add_Edit_BookModalProps {
  add_edit_BookModalVisible: boolean;
  onSubmitBookModal: (values: BookRecordValue) => void;
  onCancelBookModal: () => void;
  bookRecord: BookRecordValue | undefined;
}

const Add_Edit_BookModal: FC<Add_Edit_BookModalProps> = (props) => {
  //Model
  const {
    add_edit_BookModalVisible,
    onSubmitBookModal,
    onCancelBookModal,
    bookRecord,
  } = props;
  const [form] = Form.useForm();
  const layoutFrom = {
    labelCol: { span: 5 },
    wrapperCol: { span: 21 },
  };

  useEffect(() => {
    if (bookRecord === undefined) {
      console.log('useEffectAddBookRecord', bookRecord);
      form.resetFields();
    } else {
      form.setFieldsValue({
        title: bookRecord.title,
        author: bookRecord.author,
        pub: bookRecord.pub,
        published_time: moment(bookRecord.published_time),
        price: bookRecord.price,
        retail_price: bookRecord.retail_price,
        description: bookRecord.description,
        rate: bookRecord.rate,
      });
      console.log('useEffectEditBookRecord', bookRecord);
    }
  }, [add_edit_BookModalVisible]);

  //提交
  const submitBookModalOnOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmitBookModal(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
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
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJpgOrPng || !isLt2M) {
        message.error('只能上传JPG/PNG格式!且图片必须小于2MB!');
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
      visible={add_edit_BookModalVisible}
      title={
        bookRecord ? `当前编辑的编号为 ${bookRecord.id} 的书籍` : '添加新书'
      }
      okText="提交"
      cancelText="取消"
      onCancel={onCancelBookModal}
      onOk={submitBookModalOnOk}
      forceRender
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
        {/*<Form.Item*/}
        {/*  name="number"*/}
        {/*  label="书id"*/}
        {/*  rules={[{ required: true, message: '书id不能为空!' }]}*/}
        {/*>*/}
        {/*  <Input />*/}
        {/*</Form.Item>*/}
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
          name="price"
          label="原价"
          rules={[{ required: true, message: '原价不能为空!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="retail_price"
          label="零售价"
          rules={[{ required: true, message: '零售价不能为空!' }]}
        >
          <Input />
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

export default Add_Edit_BookModal;
