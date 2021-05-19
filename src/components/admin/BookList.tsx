import React, { FC, useState } from 'react';
import {
  Button,
  Divider,
  Empty,
  Input,
  Pagination,
  Popconfirm,
  Rate,
  Select,
  Image,
  Spin,
} from 'antd';
import noBookCover from '@/asset/imgs/noBookCover.png';
import adminStyles from '@/asset/css/admin.css';
import { bookRecordValue } from '@/pages/data';
import { LoadingOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;

interface BookListProps {
  bookListLoading: boolean;
  books: bookRecordValue[];
  clickAddButton: () => void;
  clickEditBook: (book: bookRecordValue) => void;
  deleteBookConfirm: (book: bookRecordValue) => void;
  page: number;
  page_size: number;
  total_count: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

const BookList: FC<BookListProps> = (props) => {
  const {
    bookListLoading,
    books,
    clickAddButton,
    clickEditBook,
    deleteBookConfirm,
    page,
    page_size,
    total_count,
    onPageChange,
  } = props;
  //加载图标
  const bookListLoadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

  return (
    <React.Fragment>
      <div className={adminStyles.book_contentTop}>
        {/*这里是搜索添加*/}
        <div className={adminStyles.book_contentSearch}>
          <Search
            placeholder="通过id查询书"
            enterButton="搜&emsp;索"
            size="large"
            style={{ margin: '0 70px', width: '80%' }}
          />
          <Input.Group compact size="large">
            <Select defaultValue="bookAuthor" size="large">
              <Option value="bookAuthor">作&emsp;者</Option>
              <Option value="bookTitle名">书&emsp;名</Option>
            </Select>
            {/*<Input  defaultValue="input content" />*/}
            <Search
              style={{ width: '70%' }}
              placeholder="按作者/书名查询书籍"
              enterButton="搜&emsp;索"
              size="large"
            />
          </Input.Group>
        </div>
        <Button
          size="large"
          className={adminStyles.book_addButton}
          onClick={clickAddButton}
        >
          添加
        </Button>
      </div>
      {/*书列表*/}
      <div className={adminStyles.book_oneLine}>
        {bookListLoading ? (
          <Spin
            indicator={bookListLoadingIcon}
            style={{ position: 'relative', left: '47% ', top: '150px' }}
          />
        ) : total_count ? (
          books.map((bookRecord, i) => {
            return (
              <div key={i} className={adminStyles.oneRecord}>
                <div className={adminStyles.oneBookRecord}>
                  <div className={adminStyles.oneBookRecord_img}>
                    <Image
                      style={{ overflow: 'hidden' }}
                      alt="book"
                      src={bookRecord.cover_url}
                      fallback={noBookCover}
                      width="110px"
                    />
                  </div>
                  <div className={adminStyles.bookInfo}>
                    <div>
                      <span
                        style={{ fontSize: '17px', color: 'cornflowerblue' }}
                      >
                        {bookRecord.title}
                      </span>
                      <Rate
                        style={{ marginLeft: '15px' }}
                        allowHalf
                        disabled
                        value={bookRecord.rate}
                      />
                      &emsp;{bookRecord.rate ? bookRecord.rate : '暂无评分'}
                    </div>
                    <div>作者： {bookRecord.authors}</div>
                    <div>出版社： {bookRecord.pub}</div>
                    <div>出版时间： {bookRecord.pub_date}</div>
                    <div>
                      零售价：{' '}
                      <span
                        style={{
                          textDecoration: 'line-through',
                          marginRight: '5px',
                          color: 'red',
                        }}
                      >
                        {bookRecord.price}
                      </span>
                      {bookRecord.retail_price}
                    </div>
                    <div className={adminStyles.bookDescribe}>
                      描述： {bookRecord.describe}
                    </div>
                  </div>
                </div>
                <div className={adminStyles.bookAction}>
                  <a onClick={() => clickEditBook(bookRecord)}>编辑</a>
                  <Popconfirm
                    title="确定删除吗?"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => deleteBookConfirm(bookRecord)}
                  >
                    <a>删除</a>
                  </Popconfirm>
                </div>
                <Divider style={{ borderColor: 'lightgray' }} dashed />
              </div>
            );
          })
        ) : (
          <Empty
            style={{ position: 'relative', left: '47% ', top: '150px' }}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无数据"
          />
        )}
      </div>
      {total_count ? (
        <Pagination
          className={adminStyles.bookList_pagination}
          current={page}
          pageSize={page_size}
          total={total_count}
          showTotal={(total) => `共 ${total} 条`}
          onChange={onPageChange}
          pageSizeOptions={['4', '6', '8', '10', '20', '50', '100']}
          showSizeChanger
        />
      ) : null}
      {/*{total_count ? null : (*/}
      {/*  <Empty*/}
      {/*    style={{ position: 'relative', top: '200px' }}*/}
      {/*    image={Empty.PRESENTED_IMAGE_SIMPLE}*/}
      {/*    description="暂无数据"*/}
      {/*  />*/}
      {/*)}*/}
    </React.Fragment>
  );
};

export default BookList;
