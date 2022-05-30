/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { PlusOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
const { Meta } = Card;

function Feed() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };
  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Button
                type="dashed"
                className="ant-full-box"
                icon={<PlusOutlined />}
                onClick={showModal}
              >
                <span className="click">Add Feed</span>
              </Button>
              <Modal
                title="Add New Feed"
                visible={isModalVisible}
                onCancel={handleCancel}
              >
                <Form {...layout}>
                  <Form.Item
                    name={["user", "name"]}
                    label="Title"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name={["user", "mobileNo"]} label="Tag">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["user", "email"]}
                    label="Image"
                    // rules={[
                    //   {
                    //     type: "file",
                    //   },
                    // ]}
                  >
                    <Input type="file" />
                  </Form.Item>
                </Form>
              </Modal>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Card
                hoverable
                style={{
                  minWidth: 350,
                }}
                cover={
                  <img
                    height="300px"
                    alt="example"
                    src="data:image/png;base64,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"
                  />
                }
              >
                <Meta title="Feed" description="Feed Description add here" />
                <Grid container justifyContent="flex-end" spacing={1}>
                  <Grid item>
                    <Button onClick={showUpdateModal}>Update</Button>
                    <Modal
                      title="Update Feed"
                      visible={isUpdateModalVisible}
                      onCancel={handleUpdateCancel}
                    >
                      <Form {...layout}>
                        <Form.Item
                          name={["user", "name"]}
                          label="Title"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item name={["user", "mobileNo"]} label="Tag">
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={["user", "email"]}
                          label="Image"
                          rules={[
                            {
                              type: "file",
                            },
                          ]}
                        >
                          <Input type="file" />
                        </Form.Item>
                      </Form>
                    </Modal>
                  </Grid>
                  <Grid item>
                    <Button>Delete</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item>
              <Card
                hoverable
                style={{
                  minWidth: 350,
                }}
                cover={
                  <img
                    height="300px"
                    alt="example"
                    src="data:image/png;base64,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"
                  />
                }
              >
                <Meta title="Feed" description="Feed Description add here" />
                <Grid container justifyContent="flex-end" spacing={1}>
                  <Grid item>
                    <Button>Update</Button>
                  </Grid>
                  <Grid item>
                    <Button>Delete</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item>
              <Card
                hoverable
                style={{
                  minWidth: 350,
                }}
                cover={
                  <img
                    height="300px"
                    alt="example"
                    src="data:image/png;base64,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"
                  />
                }
              >
                <Meta title="Feed" description="Feed Description add here" />
                <Grid container justifyContent="flex-end" spacing={1}>
                  <Grid item>
                    <Button>Update</Button>
                  </Grid>
                  <Grid item>
                    <Button>Delete</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Feed;
