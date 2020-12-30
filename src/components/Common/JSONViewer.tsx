import React from 'react';
import { CodeOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';

export interface Props {
    json: object;
    text?: string;
}

/**
 * 通用 JSON 查看器
 */
class JSONViewer extends React.Component<Props> {
    render() {
        return (
            <Button
                type="link"
                style={{
                    fontFamily: 'Consola'
                }}
                onClick={() => {
                    Modal.info({
                        title: 'JSON 查看器',
                        content: (
                            <div>
                                <pre>{String.raw`${JSON.stringify(this.props.json, null, 2)}`}</pre>
                            </div>
                        ),
                        width: '80vw',
                        icon: <CodeOutlined />,
                        maskClosable: true,
                    });
                }}
            >
                {
                    this.props.children || (JSON.stringify(this.props.json).length > 20
                        ? JSON.stringify(this.props.json).slice(0, 20) + '...'
                        : JSON.stringify(this.props.json))
                }
            </Button>
        );
    }
}

export default JSONViewer;