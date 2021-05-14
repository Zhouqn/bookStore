import React, { FC } from 'react';
import { Divider, Image, Tooltip } from 'antd';
import userStyles from '@/asset/css/user.css';
import noBookCover from '@/asset/imgs/noBookCover.png';
import { bookRecordValue } from '@/pages/data';

interface NewBooksProps {
  books: bookRecordValue[];
}

const BookList: FC<NewBooksProps> = (props) => {
  const { books } = props;
  console.log('user_BookList_books = ', books);

  return (
    <React.Fragment>
      <Divider style={{ backgroundColor: 'lightgray' }} />
      <div className={userStyles.new_hot_Books}>
        {books.map((bookRecord, i) => {
          return (
            <div key={i} className={userStyles.new_hot_BookRecord}>
              <Tooltip
                placement="right"
                title={() => {
                  return (
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {bookRecord.title}
                      </p>
                      <div>作者：{bookRecord.authors}</div>
                      <div>出版社：{bookRecord.pub}</div>
                      <div>出版日期：{bookRecord.pub_date}</div>
                      <div>
                        原价：
                        <span style={{ textDecoration: 'line-through' }}>
                          {bookRecord.price}
                        </span>
                      </div>
                      <div>零售价：{bookRecord.retail_price}</div>
                      <div className={userStyles.tooltipDescribe}>
                        描述：{bookRecord.describe}
                      </div>
                    </div>
                  );
                }}
              >
                <Image
                  alt="bookCover"
                  src={bookRecord.cover_uri}
                  fallback={noBookCover}
                />
              </Tooltip>
              <div className={userStyles.bookTitle}>{bookRecord.title}</div>
              <div style={{ fontSize: '13px' }}>{bookRecord.authors}</div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default BookList;
