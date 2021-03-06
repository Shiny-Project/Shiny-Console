import { Timeline } from "antd";
import React, { useMemo } from "react";
import { ShinyEventDetail, ShinyPushJobLog } from "types/dashboard";
import TimeDiff from "./TimeDiff";

interface Props {
    event: ShinyEventDetail;
}

interface PushJobItemProps {
    log: ShinyPushJobLog;
    startTime: Date;
}

const PushJobChannelTextMap = {
    twitter: "Twitter",
    weibo: "微博",
};

const PushJobStatusTextMap = {
    job_created: "创建",
    finished: "完成",
    upload_image: "开始上传图片",
    upload_image_success: "上传图片成功",
    retry: "重试",
};

const PushJobStatusClassNameMap = {
    job_created: "info",
    finished: "success",
    upload_image: "info",
    upload_image_success: "success",
    retry: "error",
};

const PushJobStatusColorNameMap = {
    job_created: "blue",
    finished: "green",
    upload_image: "blue",
    upload_image_success: "green",
    retry: "red",
};

function PushJobItem(props: PushJobItemProps) {
    const { log, startTime } = props;
    const logTime = new Date(log.time ?? log.createdAt);
    return (
        <Timeline.Item color={PushJobStatusColorNameMap[log.status]}>
            <span>{PushJobChannelTextMap[log.channel]}推送任务 </span>
            <span className={PushJobStatusClassNameMap[log.status]}>
                {PushJobStatusTextMap[log.status]}
            </span>
            <span> / </span>
            <TimeDiff startTime={startTime} time={logTime} />
            <div className="time">{logTime.toISOString()}</div>
            {PushJobStatusColorNameMap[log.status] === "red" && (
                <div className="error-log">{log.info}</div>
            )}
        </Timeline.Item>
    );
}

function EventTimeline(props: Props) {
    const { event } = props;
    const { jobs } = event;
    const startTime = new Date(event.event.createdAt);
    const sortedLogs = useMemo(() => {
        const result: ShinyPushJobLog[] = [];
        if (jobs.length > 0) {
            const logs = Array.from(event.jobs, (job) => job.logs)
                .flat()
                .sort(
                    (a, b) => {
                        const timeA = a.time ?? a.createdAt;
                        const timeB = b.time ?? b.createdAt;
                        return Date.parse(timeA) - Date.parse(timeB)
                    }
                );
            result.push(...logs);
        }
        return result;
    }, [event.jobs, jobs.length]);

    return (
        <Timeline>
            <Timeline.Item>
                事件创建{" / "}
                <TimeDiff startTime={startTime} time={startTime} />
                <div className="time">{startTime.toISOString()}</div>
            </Timeline.Item>
            {sortedLogs.length > 0 &&
                sortedLogs.map((log) => (
                    <PushJobItem startTime={startTime} log={log} key={log.id} />
                ))}
            <Timeline.Item>现在</Timeline.Item>
        </Timeline>
    );
}

export default EventTimeline;
