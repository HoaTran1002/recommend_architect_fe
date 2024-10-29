"use client";
import React from "react";
import { Button, Form, Input, Checkbox, Select, InputNumber, message } from "antd";
import axios from 'axios';
import Cookies from 'js-cookie';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {

      console.log("Submitted Values: ", values);
  

      const response = await axios.post('http://localhost:3000/auth/signup', {
        email: values.email,
        userName: values.userName,
        password: values.password,
        passwordConfirm: values.confirm,
      });
  
      Cookies.set('accessToken', response.data.accessToken);
      Cookies.set('refreshToken', response.data.refreshToken);
  
      window.location.href = '/';
      
      message.success('Đăng ký thành công!');
    } catch (error: any) {
      console.error("Registration Error: ", error.response?.data);
      message.error('Đăng ký thất bại: ' + error.response?.data.message || 'Lỗi không xác định');
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ prefix: "84" }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { type: "email", message: "The input is not valid E-mail!" },
          { required: true, message: "Please input your E-mail!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="userName"
        label="User Name"
        rules={[{ required: true, message: "Please input your User Name!", whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input />
      </Form.Item>

      <Form.Item name="phoneNumber" label="Phone Number">
        <Input />
      </Form.Item>

      <Form.Item
        name="age"
        label="Age"
        rules={[{ type: "number", min: 0, max: 120, message: "Please enter a valid age!" }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name="gender" label="Gender">
        <Select placeholder="Select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item name="preferredCategories" label="Preferred Categories">
        <Select mode="multiple" placeholder="Select preferred categories">
          <Option value="electronics">Electronics</Option>
          <Option value="fashion">Fashion</Option>
          <Option value="books">Books</Option>
          <Option value="sports">Sports</Option>
          <Option value="home">Home</Option>
        </Select>
      </Form.Item>

      <Form.Item name="interests" label="Interests">
        <Select mode="tags" placeholder="Add your interests">
        </Select>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[{
          validator: (_, value) =>
            value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
        }]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
