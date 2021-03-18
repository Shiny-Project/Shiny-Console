import React, { useState, useEffect } from "react";
import { Card, message } from "antd";
import { useParams } from "react-router";
import { ShinyEventDetail } from "types/dashboard";
import Loading from "components/Common/Loading";
import request from "services/request";

interface Props {}

interface UrlParams {
    id: string;
}

function EventDetail(props: Props): JSX.Element {
    const { id } = useParams<UrlParams>();
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState<ShinyEventDetail>(null);
    useEffect(() => {
        setLoading(true);
        request
            .get<ShinyEventDetail>("/Data/detail", {
                eventId: id,
            })
            .then((data) => {
                setEventData(data);
            })
            .catch((e) => {
                message.error(e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);
    return (
        <Card title="事件详情">
            {!eventData && (
                <Loading
                    isLoading={loading}
                    loadingText="数据加载中"
                    errorText="数据加载失败"
                />
            )}
        </Card>
    );
}

export default EventDetail;
