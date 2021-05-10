import React, { useState } from 'react';
import { connect } from 'umi';
import adminStyles from '@/asset/css/admin.css';
import { appName } from '@/config';
import { Avatar, Image, Layout } from 'antd';
import Add_Edit_BookModal from '@/pages/components/Add_Edit_BookModal';
import AdminSider from '@/pages/components/AdminSider';
import BookList from '@/pages/components/BookList';
import { BookRecordValue } from '@/pages/admin/data';
import bookImg from '@/asset/imgs/book.png';

const { Header, Content, Footer } = Layout;

const books = [
  {
    id: 1,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 2,
    cover_uri: '/image/book1',
    title: 'python',
    author: 'jack',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 30,
    retail_price: 25.5,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 3,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 47.5,
    retail_price: 36,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 4,
    cover_uri: '/image/book1',
    title: 'Java',
    author: 'nick',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 5,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 45.8,
    retail_price: 32.5,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 6,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 55.0,
    retail_price: 37.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 7,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 8,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 9,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 30,
    retail_price: 25.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 10,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 40.5,
    retail_price: 30.2,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
];

const List = () => {
  const SiderMenuSelectedKeys = '1';

  //添加书Modal是否可见
  const [add_edit_BookModalVisible, setAdd_edit_BookModalVisible] = useState(
    false,
  );
  const [bookRecord, setBookRecord] = useState<BookRecordValue | undefined>(
    undefined,
  );

  //点击添加按钮
  const clickAddButton = () => {
    setAdd_edit_BookModalVisible(true);
    setBookRecord(undefined);
  };
  //取消提交
  const onCancelBookModal = () => {
    setAdd_edit_BookModalVisible(false);
  };
  //提交
  const onSubmitBookModal = (bookRecord: BookRecordValue) => {
    console.log('Received values of form: ', bookRecord);
    setAdd_edit_BookModalVisible(false);
    setBookRecord(bookRecord);
  };
  //删除书
  const deleteBookConfirm = (bookRecord: BookRecordValue) => {
    console.log('deleteBookConfirm = ', bookRecord);
  };
  // 编辑书
  const editBookRecord = (bookRecord: BookRecordValue) => {
    setAdd_edit_BookModalVisible(true);
    setBookRecord(bookRecord);
    console.log('editBookRecord', bookRecord);
  };
  return (
    <React.Fragment>
      <Layout className={adminStyles.admin}>
        <AdminSider SiderMenuSelectedKeys={SiderMenuSelectedKeys} />
        <Layout className={adminStyles.rightLayout}>
          <Header className={adminStyles.layout_header}>
            管理员页面
            <Avatar
              size={35}
              alt="头像"
              src={<Image src={bookImg} />}
              className={adminStyles.adminUser_avatar}
            />
            <a className={adminStyles.adminUser_logout}>退出登录</a>
            <a className={adminStyles.adminUser_logoff}>注销</a>
          </Header>
          <Content className={adminStyles.layout_content}>
            <BookList
              books={books}
              clickAddButton={clickAddButton}
              deleteBookConfirm={deleteBookConfirm}
              editBookRecord={editBookRecord}
            />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {appName} ©2021 Created by zqn
          </Footer>
        </Layout>
      </Layout>
      <Add_Edit_BookModal
        add_edit_BookModalVisible={add_edit_BookModalVisible}
        onSubmitBookModal={onSubmitBookModal}
        onCancelBookModal={onCancelBookModal}
        bookRecord={bookRecord}
      />
    </React.Fragment>
  );
};

export default connect((state) => {
  console.log(state);
  return {};
})(List);
