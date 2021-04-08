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
};

const PushJobStatusClassNameMap = {
    job_created: "info",
    finished: "success",
};

const PushJobStatusColorNameMap = {
    job_created: "blue",
    finished: "green",
};

function PushJobItem(props: PushJobItemProps) {
    const { log, startTime } = props;
    const logTime = new Date(log.createdAt);
    return (
        <Timeline.Item color={PushJobStatusColorNameMap[log.status]}>
            <span>{PushJobChannelTextMap[log.channel]}推送任务 </span>
            <span className={PushJobStatusClassNameMap[log.status]}>
                {PushJobStatusTextMap[log.status]}
                {" / "}
            </span>
            <TimeDiff startTime={startTime} time={logTime} />
            <div className="time">{logTime.toISOString()}</div>
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
                    (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
                );
            result.push(...logs);
        }
        return result;
    }, [event.jobs, jobs.length]);
    console.log(sortedLogs);
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
