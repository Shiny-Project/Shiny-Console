import * as React from "react";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;

export interface Props {
    handleLogin: (userName: string, passwor: string) => void;
}

export interface State {
    userName: string;
    password: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

class LoginForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
        };
    }

    handleSubmit = (values: LoginFormValues): void => {
        this.props.handleLogin(values.email, values.password);
    };

    render() {
        return (
            <Form onFinish={this.handleSubmit}>
                <FormItem name="email">
                    <Input placeholder="Email" />
                </FormItem>
                <FormItem name="password">
                    <Input placeholder="Password" type="password" />
                </FormItem>
                <FormItem>
                    <Button htmlType="submit">Login</Button>
                </FormItem>
                <FormItem>
                    <div className="lyric">
                        "ありがとう" 廻る地球 貴方と私は進む
                        <br />
                        握る手離れても 終わらない絆がある
                        <br />
                        幾千も 永遠を重ね
                    </div>
                </FormItem>
            </Form>
        );
    }
}

export default LoginForm;
