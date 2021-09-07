import React, { FC } from 'react';
import { Divider, Image, Tooltip } from 'antd';
import userStyles from '@/asset/css/user.css';
import noBookCover from '@/asset/imgs/noBookCover.png';
import { bookRecordValue } from '@/pages/data';

interface NewBooksProps {
  books: bookRecordValue[];
  clickBookCover_orTitle: (bookRecord: bookRecordValue) => void;
}

const BookList: FC<NewBooksProps> = (props) => {
  const { books, clickBookCover_orTitle } = props;

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
                            <span style={{ marginLeft: '10px' }}>
                              {bookRecord.rate ? bookRecord.rate : '暂无评分'}
                            </span>
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
                      style={{ width: '110px', height: '165px' }}
                      className={userStyles.bookList_bookCover}
                      alt="暂无封面"
                      src={bookRecord.cover_url}
                      fallback={noBookCover}
                      onClick={() => clickBookCover_orTitle(bookRecord)}
                      preview={false}
                      width="100%"
                    />
                  </Tooltip>
                  <div
                    className={userStyles.bookList_bookTitle}
                    onClick={() => clickBookCover_orTitle(bookRecord)}
                  >
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
