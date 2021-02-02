import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import './index.css';

function CurrentTime() {
    const [timeText, setTimeText] = useState(dayjs().format("HH:mm:ss"));
    const onTimeUpdate = useCallback(() => {
        setTimeText(dayjs().format("HH:mm:ss"));
    }, []);
    useEffect(() => {
        const timer = setInterval(onTimeUpdate, 1000);
        onTimeUpdate();
        return () => {
            clearInterval(timer);
        };
    }, [onTimeUpdate]);
    return <div className="current-time">{timeText}</div>;
}

export default CurrentTime;
