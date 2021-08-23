import React, { useEffect, useState } from "react";
import { Card, Table, Spin, Popconfirm, Button, Divider } from "antd";
import useRequest from "hooks/useRequest";
import useErrorState from "hooks/useErrorState";
import JSONViewer from "components/Common/JSONViewer";
import { deleteEffect, getEffectList, createEffect } from "./service";
import { EffectItem, EffectType } from "./types";
import CreateEffectForm, { CreateEffectFormValues } from "./CreateEffectForm";

const EffectIndex: React.FC = () => {
    const [effects, loading] = useRequest(getEffectList);
    const [effectList, setEffectList] = React.useState<EffectItem[]>([]);
    const { raiseError } = useErrorState();
    const [createEffectFormVisible, setCreateEffectFormVisible] =
        useState(false);
    const [createEffectFormLoading, setCreateEffectFormLoading] =
        useState(false);
    const effectTableColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Key",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Value",
            key: "value",
            render: (text: string, record: EffectItem) => {
                return record.contentType === "json" ? (
                    <JSONViewer json={record.value} />
                ) : (
                    record.value
                );
            },
        },
        {
            title: "说明",
            dataIndex: "desc",
            key: "desc",
        },
        {
            title: "有效期",
            key: "expiration",
            render: (text: string, record: EffectItem) => {
                return record.type === EffectType.PERMANENT ? (
                    <i>永久有效</i>
                ) : (
                    <span>
                        {record.start} - {record.end}
                    </span>
                );
            },
        },
        {
            title: "操作",
            key: "operation",
            render: (text: string, record: EffectItem) => (
                <Popconfirm
                    title="危险操作确认"
                    onConfirm={() => {
                        onDelete(record.key);
                    }}
                >
                    <Button type="link" className="danger-text">
                        删除
                    </Button>
                </Popconfirm>
            ),
        },
    ];
    useEffect(() => {
        setEffectList(effects);
    }, [effects]);
    const onDelete = async (key: string) => {
        try {
            await deleteEffect(key);
            setEffectList(effectList.filter((effect) => effect.key !== key));
        } catch (e) {
            raiseError(e);
        }
    };
    const createFormSubmit = async (values: CreateEffectFormValues) => {
        try {
            const createdForm = await createEffect(values);
            setEffectList(effects.concat([createdForm]));
            setCreateEffectFormLoading(true);
            setCreateEffectFormVisible(false);
        } catch (e) {
            raiseError(e);
        } finally {
            setCreateEffectFormLoading(false);
        }
    };
    return (
        <Spin spinning={loading}>
            <Card title="全局效果管理">
                <Table
                    dataSource={effectList}
                    columns={effectTableColumns}
                    pagination={false}
                />
                <Divider />
                <Button
                    onClick={() => {
                        setCreateEffectFormVisible(true);
                    }}
                >
                    创建全局效果
                </Button>
                <CreateEffectForm
                    visible={createEffectFormVisible}
                    loading={createEffectFormLoading}
                    onCancel={() => {
                        setCreateEffectFormVisible(false);
                    }}
                    onSubmit={createFormSubmit}
                />
            </Card>
        </Spin>
    );
};

export default EffectIndex;
