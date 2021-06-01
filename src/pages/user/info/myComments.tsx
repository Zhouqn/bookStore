import React, { FC, useEffect, useState } from 'react';
import { List, Avatar, Space, Divider } from 'antd';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import userStyles from '@/asset/css/user.css';
import noBookCoverImg from '@/asset/imgs/noBookCover.png';
import { connect } from 'umi';
import { UserModelState } from '@/models/user';
import { userAllType } from '@/pages/data';

const listData: any = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

// interface MyCommentsProps{
//   userInfo: userAllType,
//
// }

const MyComments: FC = () => {
  // useEffect()

  return (
    <div className={userStyles.comments_list}>
      <div className={userStyles.comments_list_title}>
        当前有{listData.length}个评论
        <CommentOutlined style={{ marginLeft: '5px' }} />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
          total: listData.length,
          hideOnSinglePage: true,
          showTotal: (total) => {
            return `共 ${total} 条`;
          },
        }}
        dataSource={listData}
        /*item是评论类型，后面再设具体类型格式*/
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={HeartOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <span>删除评论</span>,
            ]}
            extra={
              <img
                width={110}
                height={160}
                alt="logo"
                src={noBookCoverImg}
                style={{ border: '1px solid lightgrey' }}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

// export default connect(({user}: {user: UserModelState}) => {
//   return{
//     userInfo: user.userInfo
//   }
// })(MyComments);
export default connect()(MyComments);
