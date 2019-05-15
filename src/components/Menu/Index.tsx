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
        defaultOpenKeys={['server-menu', 'spider-menu', 'push-menu']}
        mode="inline"
      >
        <Menu.Item key="overview">
          <Link to="/dashboard/overview">概览</Link>
        </Menu.Item>
        <SubMenu key="server-menu" title={<span><Icon type="cloud" /><span>服务器</span></span>}>
          <Menu.Item key="server-nodes">
            <Link to="/dashboard/server/nodes">服务器节点管理</Link>
          </Menu.Item>
          <Menu.Item key="server-applications">
            <Link to="/dashboard/server/applications">节点密钥对管理</Link>
          </Menu.Item>
          <Menu.Item key="server-config">
            <Link to="/dashboard/server/config">全局设置项管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="spider-menu" title={<span><Icon type="api" /><span>爬虫</span></span>}>
          <Menu.Item key="spider-list">
            <Link to="/dashboard/spider/list">爬虫定义管理</Link>
          </Menu.Item>
          <Menu.Item key="spider-identity">
            <Link to="/dashboard/spider/identity">爬虫统一凭据管理</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="realtime">
          <Link to="/dashboard/realtime">{<span><Icon type="line-chart" /><span>实时</span></span>}</Link>
        </Menu.Item>
        <SubMenu key="push-menu" title={<span><Icon type="rocket" /><span>推送</span></span>}>
          <Menu.Item key="push-account">
            <Link to="/dashboard/push/account">推送渠道账号管理</Link>
          </Menu.Item>
          <Menu.Item key="push-history">
            <Link to="/dashboard/push/history">推送历史（旧）</Link>
          </Menu.Item>
          <Menu.Item key="push-rules">
            <Link to="/dashboard/push/rule">推送规则</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Sider;