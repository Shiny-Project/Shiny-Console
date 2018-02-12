import * as React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

export interface Props {

}

class Sider extends React.Component<Props, {}> {
  constructor(props: Props, context: object) {
    super(props);
  }
  render() {
    return (
      <Menu
        style={{ width: '100%' }}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="0">
          <Link to="/dashboard/overview">概览</Link>
        </Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="cloud" /><span>服务器</span></span>}>
            <Menu.Item key="1">
              <Link to="/dashboard/server/nodes">服务器节点管理</Link>
            </Menu.Item>
            <Menu.Item key="2">API 密钥对管理(开发中)</Menu.Item>
        </SubMenu>
        <Menu.Item key="3">
          <Link to="/dashboard/realtime">实时</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sider;