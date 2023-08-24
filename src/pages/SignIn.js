import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";

import AuthHeader from "../components/layout/Auth-Header";
import AuthFooter from "../components/layout/Auth-Footer";
import AuthService from "../services/auth-service";
import signinbg from "../assets/logos/LifeForce.png";



export default function SignIn() {

  function onChange(checked) {
    setChecked(checked);
    console.log(`switch to ${checked}`);
    console.log("remember me!!!!!")
    console.log("email", email)
    console.log("password", password)

  }

  const signupBg = false;
  const { Title } = Typography;
  const { Content } = Layout;

  const { AuthSignin } = AuthService();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  // when validation success
  const onFinish = (values) => {
    const { email, password } = values;
    setEmail(email);
    setPassword(password);
    AuthSignin(values);
    if (checked === true) {
      localStorage.setItem("email", email);
      // localStorage.setItem("password", password);
    }
    else {
      localStorage.setItem("email");
      // localStorage.setItem("password", null);
    }
  };

  // when validation unsuccess
  const onFinishFailed = (errorInfo) => {
    console.log("onFinishFailed")
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <AuthHeader signupBg={signupBg} />
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>

              <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >

                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules=
                  {[

                    {
                      required: true,
                      message: "Please input your email!",
                    },

                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>


                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules=
                  {[
                    {
                      required: true,
                      message: "Please input your password!",
                    },

                  ]}
                // hasFeedback
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                  // name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch
                    // defaultChecked

                    onChange={onChange}
                    style={{ backgroundColor: "green" }}
                  />
                  Remember me
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%", backgroundColor: "green" }}

                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="lifeforce logo" />
            </Col>
          </Row>
        </Content>
        <AuthFooter />
      </Layout>
    </>
  );
}
