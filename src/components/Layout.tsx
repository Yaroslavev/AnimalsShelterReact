import React from 'react';
import { HomeFilled, ProductFilled, UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router'
const { Header, Content } = Layout;

const items: MenuProps['items'] = [
  {
    key: 1,
    icon: <HomeFilled />,
    label: <Link to="/">Home</Link>
  },
  {
    key: 2,
    icon: <UnorderedListOutlined />,
    label: <Link to="/animals">Animals</Link>
  },
  {
    key: 3,
    icon: <ProductFilled />,
    label: <Link to="/add">Add animal</Link>
  }
];

const App: React.FC = () => {
  return (
    <Layout className='Layout'>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '50px 48px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;