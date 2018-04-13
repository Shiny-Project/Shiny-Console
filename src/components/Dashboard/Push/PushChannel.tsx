import React from 'react';

interface Props {
    channel: string;
}

class PushChannel extends React.Component<Props> {
    render() {
        switch (this.props.channel) {
            case 'weibo':
                return <span>微博</span>;
            default: 
                return <span>{this.props.channel || '未知'}</span>;
        }
    }
}

export default PushChannel;