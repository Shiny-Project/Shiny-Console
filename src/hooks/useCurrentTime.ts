import { useEffect, useCallback, useState } from "react";
import dayjs from "dayjs";

interface Props {
    format?: string;
}

const useCurrentTime = (props: Props = {}) => {
    const { format = "HH:mm:ss" } = props;
    const [timeText, setTimeText] = useState(dayjs().format(format));
    const onTimeUpdate = useCallback(() => {
        setTimeText(dayjs().format(format));
    }, [format]);
    useEffect(() => {
        const timer = setInterval(onTimeUpdate, 1000);
        onTimeUpdate();
        return () => {
            clearInterval(timer);
        };
    }, [onTimeUpdate]);
    return timeText;
};

export default useCurrentTime;
