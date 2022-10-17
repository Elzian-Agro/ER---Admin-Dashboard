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
import { useCallback } from "react";
import Grid from "@mui/material/Grid";
import { PlusOutlined } from "@ant-design/icons";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { Card, Button, Modal, Form, Input, notification } from "antd";
import { makeStyles } from "@mui/styles";
// import axios from "axios";
//import { useCookies } from "react-cookie";
// import React, { useState, useEffect } from 'react';
// import { Token } from "@mui/icons-material";
import FeedService from '../services/feed-service';
const { Meta } = Card;
const useStyles = makeStyles({
  featuredButton: {
    fontSize: "12px",
    width: "80px",
  },
});
function Feed() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteFeed, setDeleteFeed] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateTag, setUpdateTag] = useState("");
  const [insertMessage, setInsertMessage] = useState("");
  const [insertTag, setInsertTag] = useState("");
  const [focused, setFocused] = useState(true);
  const [imagePath, setImagePath] = useState();
  const [form] = Form.useForm();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonDisabled2, setButtonDisabled2] = useState(true);
  const [updateImagePath, setUpdsteImagePath] = useState();
  const [checkTempupdateImagePath, setCheckTempUpdateImagePath] = useState();

  //const cookies = useCookies(["token"]);

  const { updateFeedById, getFeedData, deleteFeedbyId, addFeedData } =
    FeedService();

  // axios.defaults.headers = {
  //   "Content-Type": "application/json",
  //   //"x-auth-token": cookies[0].token,
  //   "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA"
  // };

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

  const handleFocus = (e) => {
    setFocused(true);
  };

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

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const GetAllFeeds = useCallback(async () => {
    const res = await getFeedData();
    setData(res);
  }, [getFeedData]);
  useEffect(() => {
    GetAllFeeds();
  }, [GetAllFeeds]);

  // const fileHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const handleDeleteClick = async () => {
    try {
      await deleteFeedbyId(selectedId);
      GetAllFeeds();
      openNotificationWithIcon("success", "Feed Delete Successfully");
      setDeleteFeed(false);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Something Went Wrong Please Check",
        "Error"
      );
      setDeleteFeed(false);
    }
  };

  //Add Feed
  const handleAddFormSubmit = async () => {
    const formData = new FormData();
    formData.append("image", imagePath);
    formData.append("message", insertMessage);
    formData.append("tags", insertTag);
    formData.append("published", "Yes");
    // console.log(formData)
    try {
      await addFeedData(formData);
      GetAllFeeds();
      openNotificationWithIcon("success", "Feed Added Successfully");
      setIsModalVisible(false);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Something Went Wrong Please Check",
        "Error"
      );
    }
  };

  //Update Feed
  const UpdateFeedHandler = async () => {
    const formData = new FormData();
    formData.append("image", updateImagePath);
    formData.append("message", updateDescription);
    formData.append("tags", updateTag);
    console.log(formData);

    try {
      await updateFeedById(selectedId, formData);
      GetAllFeeds();
      openNotificationWithIcon("success", "Feed Updated Successfully");
      setIsUpdateModalVisible(false);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Something Went Wrong Please Check",
        "Error"
      );
      setIsUpdateModalVisible(false);
    }
  };

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
                onOk={() => {
                  handleAddFormSubmit();
                }}
                destroyOnClose={true}
                okButtonProps={{ disabled: buttonDisabled }}
              >
                <Form
                  {...layout}
                  form={form}
                  onFieldsChange={() => {
                    if (!insertMessage || !insertTag) {
                      setButtonDisabled(true);
                    } else if (
                      form
                        .getFieldsError()
                        .some((field) => field.errors.length > 0)
                    ) {
                      setButtonDisabled(true);
                    } else {
                      setButtonDisabled(false);
                    }
                  }}
                >
                  <Form.Item
                    name="name"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        pattern: "^[A-Za-z0-9].{2,310}$",
                        message:
                          "Description Should be 3-310 characters and shouldn't include any special character!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      value={insertMessage}
                      onChange={(event) => setInsertMessage(event.target.value)}
                      onBlur={handleFocus}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["user", "tag"]}
                    label="Tag Name"
                    rules={[
                      {
                        required: true,
                        pattern: "^[A-Za-z0-9].{3,55}$",
                        message: "Tag Should be 3-55 characters!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      value={insertTag}
                      onChange={(event) => setInsertTag(event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["user", "image"]}
                    label="Image"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      // onChange={(event) => setImagePath(event.target.files[0])
                      // }
                      onChange={(event) => {
                        setImagePath(event.target.files[0]);
                        
                      }}
                    />
                    <br />

                    {imagePath && (
                      <img src={URL.createObjectURL(imagePath)} alt="img" />
                    )}
                  </Form.Item>
                </Form>
              </Modal>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={6} justifyContent="center">
            {data.map((item) => (
              <Grid item key={item.id} id={item.id}>
                <Card
                  hoverable
                  style={{
                    // minWidth: 380,
                    // maxWidth: 500,
                    width: 420,
                    height: 465,
                    justifyContent: "center",
                  }}
                  cover={
                    <img height="245px" alt="example" src={item.imageUrl} />
                  }
                >
                  <Meta
                    title={item.tags}
                    description={item.message}
                    style={{ height: "160px" }}
                  />
                  <Grid container justifyContent="flex-end" spacing={1}>
                    <Grid item>
                      <Button
                        className={classes.featuredButton}
                        type="primary"
                        onClick={() => {
                          showUpdateModal();
                          setSelectedId(item.id);
                          setUpdateTag(item.tags);
                          setUpdateDescription(item.message);
                          setUpdsteImagePath(item.imageUrl);
                          setCheckTempUpdateImagePath(item.imageUrl);

                          form.setFieldsValue({
                            updateTag: item.tags,
                            updateDescription: item.message,
                            updateImagePath: item.imageUrl,
                          });
                        }}
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
                          setSelectedId(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
            <Modal
              title="Update The Feed"
              visible={isUpdateModalVisible}
              onCancel={handleUpdateCancel}
              onOk={() => {
                UpdateFeedHandler();
              }}
              okButtonProps={{ disabled: buttonDisabled2 }}
              destroyOnClose={true}
            >
              <Form
                autoComplete="off"
                form={form}
                onFieldsChange={() => {
                  if (
                    form
                      .getFieldsError()
                      .some((field) => field.errors.length > 0)
                  ) {
                    setButtonDisabled2(true);
                  } else {
                    setButtonDisabled2(false);
                  }
                }}
              >
                <Form.Item
                  name="updateTag"
                  label="Tag Name"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z0-9].{3,55}$",
                      message: "Tag Should be 3-55 characters!",
                    },
                    {
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateTag"
                    onChange={(event) => setUpdateTag(event.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="updateDescription"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z0-9].{2,310}$",
                      message:
                        "Description Should be 3-310 characters and shouldn't include any special character!",
                    },
                    {
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateDescription"
                    onBlur={handleFocus}
                    onChange={(event) =>
                      setUpdateDescription(event.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item name={["user", "image"]} label="Image">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setUpdsteImagePath(event.target.files[0]);
                      setButtonDisabled2(false);
                    }}
                  />
                  <br />

                  {updateImagePath === checkTempupdateImagePath ? (
                    <img src={updateImagePath} alt="img" />
                  ) : (
                    <img src={URL.createObjectURL(updateImagePath)} alt="img" />
                  )}
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
                <Button type="primary" onClick={() => setDeleteFeed(false)}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={handleDeleteClick}
                  color="error"
                >
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
