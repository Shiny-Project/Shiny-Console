import React from 'react';

interface Props {
    time: Date | string;
}
interface State {
    diffMode: boolean;
}
class TimeDiff extends React.Component<Props, State> {
    state: State = {
        diffMode: true
    };
    diffText = (time: Date) => {
        let result = '';
        let diff = new Date().valueOf() - time.valueOf();
        let suffix = diff <= 0 ? '后' : '前';
        diff = Math.abs(Math.round(diff / 1000));
        if (diff < 60) {
            result = `${diff.toString()}秒`;
            return `${result}${suffix}`;
        } else if (diff >= 60 && diff < 3600) {
            result = `${Math.floor(diff / 60)}分${diff - Math.floor(diff / 60) * 60}秒`;
            return `${result}${suffix}`;
        } else if (diff >= 3600 && diff < 86400) {
            result = `${Math.floor(diff / 3600)}小时${Math.round((diff - Math.floor(diff / 3600) * 3600) / 60)}分`;
            return `${result}${suffix}`;
        } else {
            return '很久以前';
        }
    }
    render() {
        const diffTime = typeof this.props.time === 'string' ? new Date(this.props.time) : this.props.time;
        if (this.state.diffMode) {
            return (
                <a
                    onClick={() => {
                        this.setState({
                            diffMode: !this.state.diffMode
                        });
                    }}
                >
                    {this.diffText(diffTime)}
                </a>
            );
        } else {
            return (
                <a
                    onClick={() => {
                        this.setState({
                            diffMode: !this.state.diffMode
                        });
                    }}
                >
                    {diffTime.toISOString()}
                </a>
            );
        }
    }
}

export default TimeDiff;