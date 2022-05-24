import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Button, Typography, Card, Form, Input, Checkbox } from "antd";

import logo1 from "../assets/images/logos-facebook.svg";
import logo2 from "../assets/images/logo-apple.svg";
import logo3 from "../assets/images/Google__G__Logo.svg.png";

import AuthHeader from "../components/layout/Auth-Header";
import AuthFooter from "../components/layout/Auth-Footer";

import AuthService from "../services/auth-service";

const { Title } = Typography;
const { Content } = Layout;

export default class SignUp extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
      // POST method
      AuthService.signup(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <div className="layout-default ant-layout layout-sign-up">
          <AuthHeader />
          <Content className="p-0">
            <div className="sign-up-header">
              <div className="content">
                <Title>Sign Up</Title>
                <p className="text-lg">
                  Use these awesome forms to login or create new account in your
                  project for free.
                </p>
              </div>
            </div>

            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Register With</h5>}
              bordered="false"
            >
              <div className="sign-up-gateways">
                <Button type="false">
                  <img src={logo1} alt="logo 1" />
                </Button>
                <Button type="false">
                  <img src={logo2} alt="logo 2" />
                </Button>
                <Button type="false">
                  <img src={logo3} alt="logo 3" />
                </Button>
              </div>
              <p className="text-center my-25 font-semibold text-muted">Or</p>
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
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input placeholder="Passwoed" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree the{" "}
                    <a href="#pablo" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%", backgroundColor: "green" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Already have an account?{" "}
                <Link to="/sign-in" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
            </Card>
          </Content>
          <AuthFooter />
        </div>
      </>
    );
  }
}
