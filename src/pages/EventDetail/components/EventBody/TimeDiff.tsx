import "./index.css";

interface Props {
    startTime: Date;
    time: Date;
}

function TimeDiff(props: Props) {
    const { time, startTime } = props;
    const diff = (time.valueOf() - startTime.valueOf()) / 1000;
    return (
        <span className="time-diff" title={time.toISOString()}>
            T+
            {diff < 10
                ? `${Math.round(diff * 1000)}${diff !== 0 ? "m" : ""}`
                : diff.toFixed(3)}
            {diff !== 0 && "s"}
        </span>
    );
}

export default TimeDiff;
