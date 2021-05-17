import React, { FC, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { Image, message, Rate, List, Comment, Divider } from 'antd';
import {
  FormOutlined,
  EditOutlined,
  FileTextOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { appName } from '@/config';
import noBookCover from '@/asset/imgs/noBookCover.png';
import userStyles from '@/asset/css/user.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserModelState } from '@/models/user';
import LoginModal from '@/components/user/loginModal';
import { FormValues } from '@/pages/data';

const bookRecord = {
  id: 20,
  cover_uri: '/images/book',
  cover_url: 'http://api/images/book',
  title: 'python之旅',
  authors: 'hello',
  pub: 'hello',
  pub_date: '2021-5-20',
  price: 15.8,
  retail_price: 11.3,
  describe: 'hello',
  rate: 2.1,
  comment_count: 50,
};

const data = [
  {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    like_count: 1000,
    is_like: true,
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: '2020年3月21日 14:26:55',
  },
  {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    like_count: 0,
    is_like: false,
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: '2020年3月21日 14:26:57',
  },
];

interface BookMsgProps {
  dispatch: Dispatch;
  isLogin: boolean;
}

const desc = ['差', '较差', '一般', '好', '很好'];

const BookMsg: FC<BookMsgProps> = (props) => {
  const { isLogin, dispatch } = props;
  const [rateValue, setRateValue] = useState(0);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loginModalLoading, setLoginModalLoading] = useState(false);

  //评分
  const rateHandleChange = (rateValue: number) => {
    // console.log(rateValue)
    if (isLogin) {
      setRateValue(rateValue);
    } else {
      setLoginModalVisible(true);
    }
  };

  //提交登录
  const submitLoginModal = (formValues: FormValues) => {
    console.log('submitLoginModal_formValues = ', formValues);
    setLoginModalVisible(false);
    // setLoginModalLoading(true) //连接到后台启用
    // message.success("登陆成功")
  };
  //Modal 取消登录
  const LoginModalHandleCancel = () => {
    setLoginModalVisible(false);
    message.error('已取消');
  };

  //点赞评论
  const isLikeComment = () => {};

  return (
    <React.Fragment>
      <Header isLogin={isLogin} />
      {/*上半部分*/}
      <div className={userStyles.bookMsg_middle}>
        <div className={userStyles.bookMsg}>
          <div className={userStyles.bookMsg_bookTitle}>{bookRecord.title}</div>
          <div className={userStyles.bookMsg_BookInfos}>
            <Image
              className={userStyles.bookMsg_bookCover}
              alt="暂无图片"
              src={bookRecord.cover_url}
              fallback={noBookCover}
            />
            <div className={userStyles.bookMsg_partBookInfo}>
              <div>作者： {bookRecord.authors}</div>
              <div>出版社： {bookRecord.pub}</div>
              <div>出版时间： {bookRecord.pub_date}</div>
              <div>
                原价：
                <span
                  style={{
                    textDecoration: 'line-through',
                    marginRight: '5px',
                    color: 'red',
                  }}
                >
                  {bookRecord.price}
                </span>
              </div>
              <div>现价：{bookRecord.retail_price}</div>
            </div>
            <div className={userStyles.bookMsg_bookRate}>
              <div style={{ fontSize: '15px' }}>
                {appName}评分：
                {bookRecord.rate ? null : (
                  <span style={{ color: 'grey' }}>暂无评分</span>
                )}
              </div>
              {bookRecord.rate ? (
                <span
                  style={{ fontSize: '25px', position: 'relative', top: '3px' }}
                >
                  {bookRecord.rate}
                </span>
              ) : null}
              <Rate
                style={{ marginLeft: '15px' }}
                value={bookRecord.rate}
                allowHalf
                disabled
              />
            </div>
          </div>
          <div className={userStyles.bookMsg_doRate}>
            <FormOutlined style={{ marginRight: '5px' }} />
            <span>评价：</span>
            <span>
              <Rate
                tooltips={desc}
                onChange={rateHandleChange}
                value={rateValue}
                disabled={!!rateValue}
              />
              {rateValue ? (
                <span style={{ marginLeft: '10px' }}>
                  {desc[rateValue - 1]}
                </span>
              ) : (
                ''
              )}
            </span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <EditOutlined style={{ marginRight: '5px' }} />
            <span>写评论</span>
          </div>

          <div style={{ marginTop: '30px' }}>
            <Divider />
            <span style={{ fontSize: '17px', color: '#6969d4' }}>
              <FileTextOutlined style={{ marginRight: '5px' }} />
              描述：
            </span>
            <div style={{ margin: '5px 60px' }}>{bookRecord.describe}</div>
          </div>
        </div>
        <div style={{ width: '1000px', margin: 'auto' }}>
          <Divider />
        </div>
        {/*下半部分 书评*/}
        <div className={userStyles.bookMsg_comment}>
          <div style={{ fontSize: '20px', color: '#6969d4' }}>书评：</div>
          <List
            className="comment_list"
            header={`${data.length} 条评论`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
                <div className={userStyles.bookMsg_like_delete}>
                  <span className={userStyles.bookMsg_comment_delete}>
                    删除
                  </span>{' '}
                  {/*判断是不是当前用户，再显示删除*/}
                  <div className={userStyles.bookMsg_comment_like}>
                    <HeartOutlined
                      style={{
                        color: item.like_count ? 'red' : '',
                        marginRight: '7px',
                      }}
                      className={userStyles.bookMsg_commentLikeIcon}
                      onClick={isLikeComment}
                    />
                    {item.like_count
                      ? `${item.like_count > 999 ? '999+' : item.like_count}`
                      : ''}
                  </div>
                </div>
                <Divider />
              </li>
            )}
          />
        </div>
      </div>
      <Footer />
      <LoginModal
        submitLoginModal={submitLoginModal}
        LoginModalHandleCancel={LoginModalHandleCancel}
        loginModalVisible={loginModalVisible}
        loginModalLoading={loginModalLoading}
      />
    </React.Fragment>
  );
};

export default connect(({ user }: { user: UserModelState }) => {
  return {
    isLogin: user.isLogin,
  };
})(BookMsg);
