import React from 'react';
import { Spin, Card, Table, Button, Divider, Popconfirm } from 'antd';
import { RepositoryList, Repository as RepositoryItem, Revision } from 'types/dashboard';
import TimeDiff from 'components/Common/TimeDiff';
import CreateRepositoryForm from './CreateRepositoryForm';
import EditRepositoryForm from './EditRepositoryForm';
export interface Props {
    isLoading: boolean;
    createRepositoryModalVisible: boolean;
    createRepositoryModalLoading: boolean;
    editRepositoryModalVisible: boolean;
    editRepositoryModalLoading: boolean;
    repositories: RepositoryList;
    nowEditingRepository: RepositoryItem;
    getRepositoryList: () => void;
    createRepository: (name: string, description: string) => void;
    showCreateRepositoryModal: () => void;
    hideCreateRepositoryModal: () => void;
    deleteRepository: (repositoryId: number) => void;
    showEditRepositoryModal: (repository: RepositoryItem) => void;
    hideEditRepositoryModal: () => void;
    editRepository: (repositoryId: number, name: string, description: string) => void;
}
export interface State {

}
class Repository extends React.Component<Props, State> {
    repositoryColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '仓库名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
    }, {
        title: '操作',
        key: 'operations',
        render: (text: string, record: RepositoryItem) => {
            return (
                <div>
                    <Button 
                        type="link"
                        onClick={() => {
                            this.props.showEditRepositoryModal(record);
                        }}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteRepository(record.id);
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

    revisionsColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: 'Commit ID',
        dataIndex: 'commit_id',
        key: 'commit_id'
    }, {
        title: '提交时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) => <TimeDiff time={createdAt} />
    }, {
        title: '操作',
        key: 'operations',
        render: (text: string, record: Revision) => {
            return (
                <div>
                    <a target="_blank" href={record.compare_url} rel="noopener noreferrer">比较差异</a>
                </div>
            )
        }
    }];

    revisionsRenderer = (record: RepositoryItem) => {
        return <Table dataSource={record.revisions} columns={this.revisionsColumns} rowKey="id"></Table>
    }

    componentDidMount() {
        this.props.getRepositoryList();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="仓库列表">
                    <Table 
                        dataSource={this.props.repositories} 
                        columns={this.repositoryColumns} 
                        rowKey="id"
                        expandedRowRender={this.revisionsRenderer}
                    ></Table>
                    <Button onClick={this.props.showCreateRepositoryModal}>创建新仓库</Button>
                    <CreateRepositoryForm
                        visible={this.props.createRepositoryModalVisible}
                        loading={this.props.createRepositoryModalLoading}
                        onSubmit={this.props.createRepository}
                        onCancel={this.props.hideCreateRepositoryModal}
                    />
                    <EditRepositoryForm
                        repository={this.props.nowEditingRepository}
                        visible={this.props.editRepositoryModalVisible}
                        loading={this.props.editRepositoryModalLoading}
                        onSubmit={this.props.editRepository}
                        onCancel={this.props.hideEditRepositoryModal}
                    />
                </Card>
            </Spin>
        );
    }
}

export default Repository;