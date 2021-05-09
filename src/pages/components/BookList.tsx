import React, { FC } from 'react';
import { Button, Divider, Input, Popconfirm, Rate, Select } from 'antd';
import bookCover from '@/asset/imgs/bookCover.png';
import adminStyles from '@/asset/css/admin.css';
import { BookRecordValue } from '@/pages/admin/data';
const { Search } = Input;
const { Option } = Select;

interface BookListProps {
  books: BookRecordValue[];
  clickAddButton: () => void;
  editBookRecord: (book: BookRecordValue) => void;
  deleteBookConfirm: (book: BookRecordValue) => void;
}

const BookList: FC<BookListProps> = (props) => {
  const { books, clickAddButton, editBookRecord, deleteBookConfirm } = props;
  return (
    <React.Fragment>
      <div className={adminStyles.book_contentTop}>
        {/*这里是搜索添加*/}
        <div className={adminStyles.book_contentSearch}>
          <Search
            placeholder="通过书编号查询书"
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
        {books.map((book, i) => {
          return (
            <div key={i} className={adminStyles.oneRecord}>
              <div className={adminStyles.oneBookRecord}>
                <img alt="book" src={bookCover} />
                <div className={adminStyles.bookAut_and_pub}>
                  <div>
                    <a style={{ fontSize: '15px' }}>{book.title}</a>
                    <Rate
                      className={adminStyles.bookRate}
                      allowHalf
                      // defaultValue={4.3}
                      value={book.rate}
                    />
                    &emsp;{book.rate}
                  </div>
                  <div>作者: {book.author}</div>
                  <div>出版社: {book.pub}</div>
                  <div>出版时间: ""</div>
                  <div className={adminStyles.bookDescribe}>
                    {book.description}
                  </div>
                </div>
              </div>
              <div className={adminStyles.bookAction}>
                <a onClick={() => editBookRecord(book)}>编辑</a>
                <Popconfirm
                  title="确定删除吗?"
                  okText="确认"
                  cancelText="取消"
                  onConfirm={() => deleteBookConfirm(book)}
                >
                  <a>删除</a>
                </Popconfirm>
              </div>
              <Divider style={{ borderColor: 'lightgray' }} dashed />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default BookList;
