import { Link } from "react-router-dom";
import { Layout, Button, Typography, Card, Form, Input, Checkbox } from "antd";

import AuthHeader from "../components/layout/Auth-Header";
import AuthFooter from "../components/layout/Auth-Footer";

import AuthService from "../services/auth-service";

const signupBg = true;
const { Title } = Typography;
const { Content } = Layout;

export default function SignUp() {
  const { AuthSignup } = AuthService();

  // when validation is success
  const onFinish = (values) => {
    AuthSignup(values);
  };

  // when validation is unsuccess
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <AuthHeader signupBg={signupBg} />
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
            title={<h5>Register</h5>}
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
                <Input placeholder="email" />
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
