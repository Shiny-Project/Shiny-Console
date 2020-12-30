import * as React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';

const FormItem = Form.Item;

export interface Props {
    handleLogin: (userName: string, passwor: string) => void;
}

export interface State {
    userName: string;
    password: string;
}

class LoginForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        };
    }

    public handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            userName: event.target.value,
        });
    }

    public handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            password: event.target.value,
        });
    }

    public handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.props.handleLogin(this.state.userName, this.state.password);
    }

    render() {
        return (
            <Form onSubmit={e => this.handleSubmit(e)} >
                <FormItem>
                    <Input 
                           placeholder="Email" 
                           onChange={e => this.handleUsernameChange(e)} 
                    />
                </FormItem>
                <FormItem>
                    <Input placeholder="Password" type="password" onChange={e => this.handlePasswordChange(e)} />
                </FormItem>
                <FormItem>
                    <Button 
                        htmlType="submit"
                    >
                        Login
                    </Button>
                </FormItem>
                <FormItem>
                    <div className="lyric">
                        "ありがとう" 廻る地球 貴方と私は進む<br />
                        握る手離れても 終わらない絆がある<br />
                        幾千も 永遠を重ね
                    </div>
                </FormItem>
            </Form>
        );
    }
}

export default LoginForm;