import React from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  CalendarOutlined,
  MailOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { SubMenu } = Menu;

export const Navigation = () => {
  const history = useHistory();

  return (
    <div>
      <Menu defaultSelectedKeys={['home']} mode="horizontal" theme="light">
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          onClick={() => history.push('/')}
        >
          Главная
        </Menu.Item>
        <Menu.Item key="about" icon={<UserOutlined />}>
          Oбо мне
        </Menu.Item>
        <Menu.Item
          key="todo"
          icon={<CalendarOutlined />}
          onClick={() => history.push('/todo')}
        >
          Живой TODO список
        </Menu.Item>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Navigation Three - Submenu"
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
};
