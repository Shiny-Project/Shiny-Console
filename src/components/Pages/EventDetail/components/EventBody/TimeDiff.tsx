import React from 'react';
import './index.css';

interface Props {
    startTime: Date;
    time: Date;
}

function TimeDiff(props: Props) {
    const { time, startTime } = props;
    const diff = Math.round((time.valueOf() - startTime.valueOf()) / 1000);
    return <span className="time-diff" title={time.toISOString()}>T+{diff}{diff !== 0 && 's'}</span>
}

export default TimeDiff;