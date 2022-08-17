import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = () => {
  const { register } = useAuth();
  const handleSumbit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSumbit}>
      {/*       {
        user ? <div>
          登录成功，用户名:{user?.name}
          token"{user?.token}
        </div> : null
      } */}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"userName"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
