import * as React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {
    render() {
        return (
            <Form>
                <FormItem>
                    <Input placeholder="Username" />
                </FormItem>
                <FormItem>
                    <Input placeholder="Password" />
                </FormItem>
                <FormItem>
                    <Button>Login</Button>
                </FormItem>
            </Form>
        );
    }
}

export default LoginForm;