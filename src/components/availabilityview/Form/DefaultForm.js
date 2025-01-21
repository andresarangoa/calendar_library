import React from 'react';
import { Form, Input, Button } from 'antd';

const DefaultForm = ({ onFinish, initialValues }) => {
    return (
        <Form
            name="contactForm"
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please input your name!' },
                ]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    { required: true, message: 'Please input your phone number!' },
                    {
                        pattern: /^[0-9]{10,}$/,
                        message: 'Please enter a valid phone number!',
                    },
                ]}
            >
                <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item label="Date" name="date">
                <Input disabled />
            </Form.Item>

            <Form.Item label="Time" name="time">
                <Input disabled />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DefaultForm;
