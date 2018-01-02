import React from 'react';
import { Row, Col, Layout } from 'antd';
import Menu from '@/components/Menu/Index';
import './Index.css';
const { Header, Content } = Layout;

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <h2 className="logo">Shiny-Console</h2>
                    </Header>
                    <Content>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Menu />
                            </Col>
                            <Col span={20}>
                                <div> Indeeeeeeeeeeeeeeeex </div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Dashboard;