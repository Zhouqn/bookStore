import React, { FC } from 'react';
import { connect, Link } from 'umi';
import adminStyles from '@/asset/css/admin.css';
import { Menu } from 'antd';
import { SnippetsOutlined, EditOutlined } from '@ant-design/icons';
// import defaultAvatar from '@/asset/imgs/avatar.png'; //头像之后会是从数据库取出

interface adminUserProps {}

const adminUser: FC<adminUserProps> = (props) => {
  return (
    <React.Fragment>
      <div className={adminStyles.adminUser_content}>
        <div className={adminStyles.adminUser_contentLeft}>
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            style={{ textAlign: 'center', width: '50%' }}
          >
            <Menu.Item
              key="1"
              icon={<SnippetsOutlined />}
              // onClick={adminInfoMenu}
            >
              <Link to="/admin/info/basicInfo">基本信息</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<EditOutlined />}
              // onClick={changePasswordMenu}
            >
              <Link to="/admin/info/changePassword">修改密码</Link>
            </Menu.Item>
          </Menu>
        </div>
        {/*管理员信息*/}
        <div className={adminStyles.adminUser_contentRight}>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect((state) => {
  console.log(state);
  return {};
})(adminUser);
