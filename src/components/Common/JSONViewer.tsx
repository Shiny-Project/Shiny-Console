import React from 'react';
import { Modal } from 'antd';

export interface Props {
    json: object;
}

/**
 * 通用 JSON 查看器
 */
class JSONViewer extends React.Component<Props> {
    render() {
        return (
            <a
                style={{
                    fontFamily: 'Consola'
                }}
                onClick={() => {
                    Modal.info({
                        title: 'JSON 查看器',
                        content: (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        `<pre>${JSON.stringify(this.props.json, null, 2)}</pre>`
                                }} 
                            />
                        ),
                        width: '80vw',
                        iconType: ''
                    });
                }}
            >
                {
                    JSON.stringify(this.props.json).length > 20
                        ? JSON.stringify(this.props.json).slice(0, 20) + '...'
                        : JSON.stringify(this.props.json)
                }
            </a>
        );
    }
}

export default JSONViewer;