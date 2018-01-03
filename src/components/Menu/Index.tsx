import * as React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

export interface Props {

}

class Sider extends React.Component<Props, {}> {
  constructor(props: Props, context: object) {
    super(props);
    console.log(context);
  }
  render() {
    return (
      <Menu
        style={{ width: '100%' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="cloud" /><span>服务器</span></span>}>
          {/* <MenuItemGroup key="g1" title="TS处理"> */}
            <Menu.Item key="1">服务器节点管理</Menu.Item>
            <Menu.Item key="2">API 密钥对管理</Menu.Item>
          {/* </MenuItemGroup> */}
          {/* <MenuItemGroup key="g2" title="--">
            <Menu.Item key="3">--</Menu.Item>
            <Menu.Item key="4">--</Menu.Item>
          </MenuItemGroup> */}
        </SubMenu>
        {/* <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
    );
  }
}

export default Sider;