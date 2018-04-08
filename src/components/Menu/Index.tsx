import * as React from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

export interface Props {

}

export interface State {
  collapsed: boolean;
}

class Sider extends React.Component<Props, State> {
  state = {
    collapsed: false,
  };

  constructor(props: Props, context: object) {
    super(props);
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
        <Menu
          style={{ marginTop: '1rem' }}
          defaultOpenKeys={['server-menu', 'spider-menu']}
          mode="inline"
        >
          <Menu.Item key="0">
            <Link to="/dashboard/overview">概览</Link>
          </Menu.Item>
          <SubMenu key="server-menu" title={<span><Icon type="cloud" /><span>服务器</span></span>}>
              <Menu.Item key="1">
                <Link to="/dashboard/server/nodes">服务器节点管理</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/dashboard/server/applications">API 密钥对管理</Link>
              </Menu.Item>
          </SubMenu>
          <SubMenu key="spider-menu" title={<span>爬虫</span>}>
            <Menu.Item key="spider-list">
              <Link to="/dashboard/spider/list">爬虫定义管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3">
            <Link to="/dashboard/realtime">实时</Link>
          </Menu.Item>
        </Menu>
    );
  }
}

export default Sider;