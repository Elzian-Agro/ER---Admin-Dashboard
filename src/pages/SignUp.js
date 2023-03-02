import { Link } from "react-router-dom";
import {  Button, Card, Form, Input, Checkbox, notification } from "antd";
import React, { useState } from "react";

import AuthHeader from "../components/layout/Auth-Header";
import AuthFooter from "../components/layout/Auth-Footer";

import AuthService from "../services/auth-service";

const signupBg = true;
// const { Title } = Typography;
// const { Content } = Layout;

export default function SignUp() {
  const { AuthSignup } = AuthService();
  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    setAgree(!agree);
  }

  const openNotificationWithIcon = (type, message, title) => {
    if (type === "success") {
      notification[type]({
        message: title,
        description: message,
      });
    } else {
      notification[type]({
        message: title,
        description: message,
      });
    }
  };

  // when validation is success
  const onFinish = (values) => {
    AuthSignup(values);
    openNotificationWithIcon("success", "User Registered Successfully");
  };

  // when validation is unsuccess
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    openNotificationWithIcon(
      "error",
      "Something Went Wrong Please Check",
      "Error"
    );
  };

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <AuthHeader signupBg={signupBg} />
        <div className="sign-up-header">
            <Card
              // className="card-signup header-solid h-full ant-card pt-0"
              className="transparentForm"
              title={<h4>Sign Up</h4>}
              bordered="false"
            >
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    { whitespace: true },
                    { min: 8 }
                  ]}
                  hasFeedback
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item
                  name="walletID"
                  rules={[
                    { required: true, message: "Please input your Wallet ID!" },
                    { whitespace: true },
                    { min: 42 },
                    { max: 42 },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Wallet ID" />
                </Form.Item>

                <Form.Item id="agree" valuePropName="checked">
                  <Checkbox onChange={checkboxHandler}>
                    I agree the{" "}
                    <a href="#pablo" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    className="registerButton"
                    disabled={!agree}
                    // style={{ backgroundColor: "green" }}
                    // type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Already have an account ?{" "}
                <Link to="/sign-in" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
            </Card>
        </div>
        <AuthFooter />
      </div>
    </>
  );
}
