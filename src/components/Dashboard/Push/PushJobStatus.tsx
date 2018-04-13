import React from 'react';

class PushJobStatus extends React.Component<{status: string}> {
    render() {
        switch (this.props.status) {
            case 'processing': {
                return (<span>处理中</span>);
            }
            case 'success': {
                return (<span className={`status-${this.props.status}`}>已完成</span>);
            }
            default:
                return this.props.status;
        }
    }
}

export default PushJobStatus;