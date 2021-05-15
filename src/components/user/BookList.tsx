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
  // console.log('user_BookList_books = ', books);

  const clickBookCover = (bookRecord: bookRecordValue) => {
    console.log('bookRecord = ', bookRecord);
  };

  return (
    <React.Fragment>
      <Divider style={{ backgroundColor: 'lightgray' }} />
      <div className={userStyles.bookRecords}>
        {books
          ? books.map((bookRecord, i) => {
              return (
                <div key={i} className={userStyles.bookRecord}>
                  <Tooltip
                    placement="right"
                    title={() => {
                      return (
                        <div>
                          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                            {bookRecord.title}
                            {bookRecord.rate}
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
                      alt="暂无封面"
                      src={bookRecord.cover_uri}
                      className={userStyles.bookList_bookCover}
                      fallback={noBookCover}
                      // placeholder={true}
                      onClick={() => clickBookCover(bookRecord)}
                      preview={false}
                    />
                  </Tooltip>
                  <div className={userStyles.bookList_bookTitle}>
                    {bookRecord.title}
                  </div>
                  <div style={{ fontSize: '13px' }}>{bookRecord.authors}</div>
                </div>
              );
            })
          : null}
      </div>
    </React.Fragment>
  );
};

export default BookList;
