import React from "react";
import { SpiderListResponse, Spider } from "types/dashboard";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
    Spin,
    Card,
    Table,
    Divider,
    Popconfirm,
    Modal,
    Input,
    Row,
    Col,
    Button,
} from "antd";
import { FormComponentProps } from "@ant-design/compatible/lib/form";
import { WrappedFormUtils } from "@ant-design/compatible/lib/form/Form";
import TimeDiff from "components/Common/TimeDiff";
import FrequencyUpdateForm from "./FrequencyUpdateForm";

interface FormModalProps {
    visible: boolean;
    form: WrappedFormUtils;
    confirmLoading?: boolean;
    onCancel: () => void;
    onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
}

interface EditSpiderFormProps extends FormModalProps {
    spiderInfo: Spider;
}

class EditSpiderForm extends React.Component<EditSpiderFormProps> {
    render() {
        const {
            visible,
            onCancel,
            onSubmit,
            spiderInfo,
            confirmLoading,
            form,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                onCancel={onCancel}
                onOk={onSubmit}
                confirmLoading={confirmLoading}
                title="编辑"
            >
                <Form layout="vertical">
                    <Form.Item label="爬虫名">
                        {getFieldDecorator("name", {
                            rules: [{ required: true }],
                            initialValue: spiderInfo.name,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="爬虫路径">
                        {getFieldDecorator("path", {
                            rules: [{ required: true }],
                            initialValue: spiderInfo.path,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Group">
                        {getFieldDecorator("group", {
                            rules: [{ required: true }],
                            initialValue: spiderInfo.group,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="描述">
                        {getFieldDecorator("description", {
                            rules: [{ required: true }],
                            initialValue: spiderInfo.description,
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export interface Props {
    spiderList: SpiderListResponse;
    isLoading: boolean;
    confirmLoading: boolean;
    frequencyUpdateModalVisible: boolean;
    frequencyUpdateLoading: boolean;
    editSpiderModalVisible: boolean;
    editSpiderLoading: boolean;
    nowEditingSpider: Spider;
    getSpiderList: () => void;
    deleteSpider: (spiderId: number) => void;
    showFrequencyUpdateModal: (spiderId: number) => void;
    hideFrequencyUpdateModal: () => void;
    showEditSpiderModal: (spider: number) => void;
    hideEditSpiderModal: () => void;
    updateFrequency: (spiderId: number, frequency: number) => void;
    editSpider: (
        spiderId: number,
        name: string,
        description: string,
        group: string,
        path: string
    ) => void;
    showEditModal: (spiderId: number) => void;
}
export interface State {}

export interface SpiderDetailProps {
    spider: Spider;
}
class SpiderDetail extends React.Component<SpiderDetailProps> {
    render() {
        return (
            <Row>
                <Col span={2}>
                    <div className="column-label">刷新间隔</div>
                </Col>
                <Col span={10}>
                    <div>
                        <span>{this.props.spider.info.expires}秒</span>
                    </div>
                </Col>
                <Col span={2}>
                    <div className="column-label">凭证</div>
                </Col>
                <Col span={10}>
                    <div>{this.props.spider.info.identity || "无"}</div>
                </Col>
                <Col span={2}>
                    <div className="column-label">冷却</div>
                </Col>
                <Col span={10}>
                    <div>{this.props.spider.info.cooldown || "0"}秒</div>
                </Col>
            </Row>
        );
    }
}

class List extends React.Component<Props & FormComponentProps, State> {
    spiderListColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "路径",
            key: "path",
            render: (text: string, record: Spider) => {
                return record.path || "外部爬虫";
            },
        },
        {
            title: "描述",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "最后刷新",
            key: "trigger_time",
            render: (text: string, record: Spider) => {
                return <TimeDiff time={record.trigger_time} />;
            },
        },
        {
            title: "Group",
            key: "group",
            render: (text: string, record: Spider) => {
                return <span>{record.group || "default"}</span>;
            },
        },
        {
            title: "操作",
            key: "actions",
            render: (text: string, record: Spider): JSX.Element => {
                return (
                    <div>
                        <Button
                            type="link"
                            onClick={() => {
                                this.props.form.resetFields();
                                this.props.showFrequencyUpdateModal(record.id);
                            }}
                        >
                            修改刷新频率
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            type="link"
                            onClick={() => {
                                this.props.form.resetFields();
                                this.props.showEditSpiderModal(record.id);
                            }}
                        >
                            编辑
                        </Button>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="危险操作确认"
                            onConfirm={() => {
                                this.props.deleteSpider(record.id);
                            }}
                        >
                            <Button type="link" className="danger-text">
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    componentDidMount() {
        this.props.getSpiderList();
    }
    handleFrequencyUpdate = (frequency: number) => {
        this.props.updateFrequency(this.props.nowEditingSpider.id, frequency);
    };
    handleEditFormSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.editSpider(
                    this.props.nowEditingSpider.id,
                    values.name,
                    values.description,
                    values.group,
                    values.path
                );
            }
        });
    };
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="Spider 定义管理">
                    <Table
                        dataSource={this.props.spiderList}
                        columns={this.spiderListColumns}
                        pagination={false}
                        rowKey={"id"}
                        expandedRowRender={(record: Spider) => (
                            <SpiderDetail spider={record} />
                        )}
                    />
                </Card>
                <FrequencyUpdateForm
                    visible={this.props.frequencyUpdateModalVisible}
                    loading={this.props.confirmLoading}
                    onSubmit={this.handleFrequencyUpdate}
                    onCancel={this.props.hideFrequencyUpdateModal}
                    frequency={
                        this.props.nowEditingSpider.info &&
                        this.props.nowEditingSpider.info.expires
                    }
                />
                <EditSpiderForm
                    form={this.props.form}
                    visible={this.props.editSpiderModalVisible}
                    onSubmit={this.handleEditFormSubmit}
                    onCancel={this.props.hideEditSpiderModal}
                    confirmLoading={this.props.editSpiderLoading}
                    spiderInfo={this.props.nowEditingSpider}
                />
            </Spin>
        );
    }
}

export default Form.create<Props & FormComponentProps>()(List);
