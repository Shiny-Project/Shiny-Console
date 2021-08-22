import React from 'react';
import { Card, Spin, Table, Button, Divider, Popconfirm } from 'antd';
import { ConfigItem } from 'types/dashboard';
import JSONViewer from 'components/Common/JSONViewer';
import CreateConfigForm from './CreateConfigForm';
import EditConfigForm from './EditConfigForm';

interface Props {
    isLoading: boolean;
    configList: ConfigItem[];
    nowEditingConfig: ConfigItem;
    createConfigModalVisible: boolean;
    createConfigModalLoading: boolean;
    editConfigModalVisible: boolean;
    editConfigModalLoading: boolean;
    createConfig: (key: string, value: string, contentType: string) => void;
    deleteConfig: (key: string) => void;
    editConfig: (key: string, value: string, contentType: string) => void;
    getConfigList: () => void;
    showCreateConfigModal: () => void;
    hideCreateConfigModal: () => void;
    showEditConfigModal: (configItem: ConfigItem) => void;
    hideEditConfigModal: () => void;
}
interface State { }

class Config extends React.Component<Props, State> {
    configColumns = [{
        title: 'Key',
        dataIndex: 'key',
        key: 'key'
    }, {
        title: 'Value',
        key: 'value',
        render: (text: string, record: ConfigItem) => {
            return record.contentType === 'json' ? <JSONViewer json={record.value} /> : record.value;
        }
    }, {
        title: '操作',
        key: 'operations',
        render: (text: string, record: ConfigItem) => {
            return (
                <div>
                    <Button
                        type="link"
                        onClick={() => {
                            this.props.showEditConfigModal(record);
                        }}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteConfig(record.key);
                        }}
                    >
                        <Button
                            type="link"
                            className="danger-text"
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            );
        }
    }];

    componentDidMount() {
        this.props.getConfigList();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="设置项列表">
                    <Table
                        dataSource={this.props.configList}
                        columns={this.configColumns}
                        pagination={false}
                    />
                    <Divider />
                    <Button
                        onClick={() => {
                            this.props.showCreateConfigModal();
                        }}
                    >
                        新增
                    </Button>
                </Card>
                <CreateConfigForm
                    visible={this.props.createConfigModalVisible}
                    loading={this.props.createConfigModalLoading}
                    onSubmit={this.props.createConfig}
                    onCancel={this.props.hideCreateConfigModal}
                />
                <EditConfigForm
                    visible={this.props.editConfigModalVisible}
                    loading={this.props.editConfigModalLoading}
                    onSubmit={this.props.editConfig}
                    onCancel={this.props.hideEditConfigModal}
                    configItem={this.props.nowEditingConfig}
                />
            </Spin>
        );
    }
}

export default Config;