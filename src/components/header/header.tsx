import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  AppstoreOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  CalendarOutlined,
  MailOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

import "./header.scss";
import { Navigation } from "components/navigation/navigation";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__title">Блог Максима</div>
      <Navigation />
    </div>
  );
};
