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
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { PlusOutlined } from "@ant-design/icons";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
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
import axios from "axios";
const { Meta } = Card;

function Feed() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteFeed, setDeleteFeed] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [feedData, setFeedData] = useState([]);
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

  useEffect(() => {
    GetAllFeeds();
  }, []);

  const GetAllFeeds = async () => {
    const result = await axios.get(
      "http://localhost:3000/feeds/getFeedsByTag/Elzian%20Agro"
    );
    setFeedData(result.data.Result);
    console.log(result.data.Result);
  };

  const handleDeleteClick = () =>{}
  return (
    <>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Button
                type="primary"
                className="ant-full-box"
                icon={<PlusOutlined />}
                onClick={showModal}
                style={{ color: "white" }}
              >
                Add Feed
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
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3} justifyContent="center">
            {feedData.map((item, index) => {
              return (
                <Grid item>
                  <Card
                    hoverable
                    style={{
                      minWidth: 500,
                    }}
                    cover={
                      <img height="350px" alt="example" src={item.imageUrl} />
                    }
                  >
                    <Meta title={item.tags} description={item.message} />
                    <Grid container justifyContent="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          type="primary"
                          color="primary"
                          onClick={showUpdateModal}
                        >
                          Update
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="primary"
                          danger
                          onClick={() => {
                            setDeleteFeed(true);
                          }}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
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
                <Form.Item name={["user", "email"]} label="Image">
                  <Input type="file" />
                </Form.Item>
              </Form>
            </Modal>

            <Dialog
              aria-labelledby="dialog-title"
              open={deleteFeed}
              onClose={() => setDeleteFeed(false)}
              hideBackdrop
              PaperProps={{
                elevation: 0,
                sx: {
                  boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
                },
              }}
            >
              <DialogTitle id="dialog-title">
                Do you really want to delete?
              </DialogTitle>
              <DialogActions>
                <Button type="primary"  onClick={() => setDeleteFeed(false)}>Cancel</Button>
                <Button type="primary" danger onClick={() => handleDeleteClick()} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Feed;
