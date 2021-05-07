import React, { useState } from 'react';
import { connect } from 'umi';
import { Button, Divider, Rate, Input } from 'antd';
import adminStyles from '@/asset/css/admin.css';
import bookCover from '@/asset/imgs/bookCover.png';
import { appName } from '@/config';
import bookImg from '@/asset/imgs/book.png';
import { Layout, Menu } from 'antd';
import { UserOutlined, AlignCenterOutlined } from '@ant-design/icons';
import AddBookModal from '@/pages/components/AddBookModal';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const books = [
  {
    title: '格林童话',
    pub_name: '大地出版社',
    author: '安徒生',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 4.3,
  },
  {
    title: '安徒生童话',
    pub_name: '河马出版社',
    author: '安徒生',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 4.7,
  },
  {
    title: 'python',
    pub_name: '陕西出版社',
    author: 'nick',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 3.5,
  },
  {
    title: 'Java',
    pub_name: '大地出版社',
    author: 'rose',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 4.5,
  },
  {
    title: 'JavaScript',
    pub_name: '小鹿出版社',
    author: 'jack',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 4.7,
  },
  {
    title: '格林童话',
    pub_name: '大地出版社',
    author: '安徒生',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 4.1,
  },
  {
    title: '安徒生童话',
    pub_name: '河马出版社',
    author: '安徒生',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 4.7,
  },
  {
    title: 'python',
    pub_name: '陕西出版社',
    author: 'nick',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 3.0,
  },
  {
    title: 'Java',
    pub_name: '大地出版社',
    author: 'rose',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 4.0,
  },
  {
    title: 'JavaScript',
    pub_name: '小鹿出版社',
    author: 'jack',
    text: '这本书讲了很多适合小朋友的故事, 生动有趣......',
    rate: 2.1,
  },
];

const List = () => {
  const [addBookModalVisible, setAddBookModalVisible] = useState(false);

  const clickAddButton = () => {
    setAddBookModalVisible(true);
  };
  const onCancelAddBook = () => {
    setAddBookModalVisible(false);
  };
  const onAddBook = (values: any) => {
    console.log('Received values of form: ', values);
    setAddBookModalVisible(false);
  };

  return (
    <React.Fragment>
      {/*<div className={adminStyles.bookList}>*/}
      <Layout className={adminStyles.bookList}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className={adminStyles.logo}>
            <img alt="" src={bookImg} className={adminStyles.logoImg} />
            <p>{appName}</p>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item
              key="1"
              icon={
                <AlignCenterOutlined
                  style={{ fontSize: '18px', marginRight: '25px' }}
                />
              }
              style={{ fontSize: '15px', marginTop: '50px' }}
            >
              书列表
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={
                <UserOutlined
                  style={{ fontSize: '18px', marginRight: '25px' }}
                />
              }
              style={{ fontSize: '15px', marginTop: '50px' }}
            >
              个人中心
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={adminStyles.leftLayout}>
          <Header className={adminStyles.layout_header}>管理员页面</Header>
          <Content className={adminStyles.layout_content}>
            <div className={adminStyles.contentTop}>
              {/*这里是搜索添加*/}
              <div className={adminStyles.contentSearch}>
                <Search
                  placeholder="通过书名查询书"
                  enterButton="搜&emsp;索"
                  size="large"
                  style={{ margin: '0 50px' }}
                />
                <Search
                  placeholder="通过作者查询书"
                  enterButton="搜&emsp;索"
                  size="large"
                  style={{ margin: '0 50px' }}
                />
              </div>
              <Button
                size="large"
                className={adminStyles.addButton}
                onClick={clickAddButton}
              >
                添加
              </Button>
            </div>
            <div className={adminStyles.oneLine}>
              {books.map((book, i) => {
                return (
                  <div key={i} className={adminStyles.oneRecord}>
                    <div className={adminStyles.oneBookRecord}>
                      <img alt="book" src={bookCover} />
                      <div className={adminStyles.bookAut_and_pub}>
                        <div>
                          书名: {book.title}
                          <Rate
                            className={adminStyles.bookRate}
                            allowHalf
                            // defaultValue={4.3}
                            value={book.rate}
                          />
                          &emsp;{book.rate}
                        </div>
                        <div>作者: {book.author}</div>
                        <p>出版社: {book.pub_name}</p>
                        <p className={adminStyles.bookDescribe}>{book.text}</p>
                      </div>
                    </div>
                    <Divider style={{ borderColor: 'lightgray' }} dashed />
                  </div>
                );
              })}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {appName} ©2021 Created by zqn
          </Footer>
        </Layout>
      </Layout>
      <AddBookModal
        addBookModalVisible={addBookModalVisible}
        onAddBook={onAddBook}
        onCancelAddBook={onCancelAddBook}
      />
    </React.Fragment>
  );
};

export default connect((state) => {
  console.log(state);
  return {};
})(List);
