import useCurrentTime from "hooks/useCurrentTime";
import './index.css';

function CurrentTime() {
    const timeText = useCurrentTime();
    return <div className="current-time">{timeText}</div>;
}

export default CurrentTime;
