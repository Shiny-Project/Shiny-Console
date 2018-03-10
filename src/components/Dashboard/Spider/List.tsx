import React from 'react';
import { SpiderListResponse, Spider } from '@/types/dashboard';
import { Spin, Card, Table, Button, Divider, Popconfirm, Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

export interface Props {
    spiderList: SpiderListResponse;
    isLoading: boolean;
    frequencyUpdateModalVisible: boolean;
    frequencyUpdateLoading: boolean;
    nowEditingSpider: Spider;
    getSpiderList: () => void;
    deleteSpider: (spiderId: number) => void;
    showFrequencyUpdateModal: (spiderId: number) => void;
    hideFrequencyUpdateModal: () => void;
}
export interface State {

}

export interface FrequencyUpdateFormProps {
    visible: boolean;
    frequency: number;
    onCancel: () => void;
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

class FrequencyUpdateForm extends React.Component<FrequencyUpdateFormProps & FormComponentProps> {
    render() {
        const { visible, onCancel, onSubmit, frequency, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                onCancel={onCancel}
                onOk={onSubmit}
                title="修改刷新频率"
            >
                <Form layout="vertical">
                    <Form.Item label="刷新频率(秒)">
                        {getFieldDecorator('frequency', {
                            rules: [{ required: true }],
                            initialValue: frequency
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedFrequencyUpdateForm = Form.create<FrequencyUpdateFormProps>()(FrequencyUpdateForm);

class List extends React.Component<Props & FormComponentProps, State> {
    spiderListColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '路径',
        dataIndex: 'path',
        key: 'path'
    }, {
        title: '刷新间隔(秒)',
        key: 'interval',
        render: (text: string, record: Spider) => {
            const spiderInfo = JSON.parse(record.info);
            return <span>{spiderInfo.expires}秒</span>;
        }
    }, {
        title: '操作',
        key: 'actions',
        render: (text: string, record: Spider): JSX.Element => {
            return (
                <div>
                    <a 
                        onClick={() => {
                            this.props.showFrequencyUpdateModal(record.id);
                    }}
                    >
                        修改刷新频率
                    </a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteSpider(record.id);
                        }}
                    >
                        <a href="javascript:;" className="danger-text">删除</a>
                    </Popconfirm>
                </div>
            );
        }
    }];
    componentDidMount() {
        this.props.getSpiderList();
    }
    handleFrequencyUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="Spider 定义管理">
                    <Table
                        dataSource={this.props.spiderList}
                        columns={this.spiderListColumns}
                        pagination={false}
                        rowKey={'id'}
                    />
                </Card>
                <WrappedFrequencyUpdateForm
                    // @ts-ignore
                    form={this.props.form}
                    visible={this.props.frequencyUpdateModalVisible} 
                    onSubmit={this.handleFrequencyUpdate}
                    onCancel={this.props.hideFrequencyUpdateModal}
                    frequency={(() => {
                        if (this.props.nowEditingSpider.info !== undefined) {
                            const spiderInfo = JSON.parse(this.props.nowEditingSpider.info);
                            return spiderInfo.expires as number;
                        } else {
                            return 0;
                        }
                    })()}
                />
            </Spin>
        );
    }
}

export default Form.create<Props>()(List);