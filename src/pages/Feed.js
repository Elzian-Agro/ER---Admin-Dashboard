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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { Card, Button, Modal, Form, Input, notification} from "antd";
import { makeStyles } from "@mui/styles";
import axios from "axios";
//import { useCookies } from "react-cookie";
// import React, { useState, useEffect } from 'react';
// import { Token } from "@mui/icons-material";

const { Meta } = Card;
const useStyles = makeStyles({
  featuredButton: {
    fontSize: "12px",
    width: "80px",
  },
});
function Feed() {
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteFeed, setDeleteFeed] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [updateSelectedFile, setUpdateSelectedFile] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateTag, setUpdateTag] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [insertMessage, setInsertMessage] = useState("");
  const [insertTag, setInsertTag] = useState("");
  const [focused, setFocused] = useState(true);

  //const cookies = useCookies(["token"]);

  axios.defaults.headers = {
    "Content-Type": "application/json",
    //"x-auth-token": cookies[0].token,
    "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA"
  };
  
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
  }

 

  const openNotificationWithIcon = (type,message,title) => {

    if(type==="success"){
      notification[type]({
        message: title,
        description: message,
      });
    }else{
      notification[type]({
        message: title,
        description:message,
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

  useEffect(() => {
    GetAllFeeds();
    // const fetchFeeds = async () => {
    //   const res = await fetch("http://localhost:4000/feeds/");
    //   const data = await res.json();
    //   console.log(data);
    // }
    // fetchFeeds();
  }, [isModalVisible, isUpdateModalVisible, deleteFeed]);

  const GetAllFeeds = async () => {
    const result = await axios.get(
      "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000/feeds/"
    );
    setFeedData(result.data.Result);
  };

  const fileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleDeleteClick = async () => {

    try {await axios
      .delete(
                `http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000/feeds/deleteFeed/${selectedId}`
              ).then((res) => res);
      setDeleteFeed(false);
    } catch (error) {
      setDeleteFeed(false);
    }
  };

  // const handleDeleteClick = async () => {
  //   try {
  //     await axios
  //       .delete(
  //         `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/deleteFeed/${selectedId}`
  //       )
  //       .then((res) => res);
  //     setDeleteFeed(false);
  //   } catch (error) {
  //     alert("err");
  //     setDeleteFeed(false);
  //   }
  // };

  //Add Feed
  const AddFeedHandler = async () => {
    const formData = new FormData();
    formData.append("imageUrl", selectedFile);
    formData.append("message", insertMessage);
    formData.append("tags", insertTag);
    formData.append("published", "Yes");
    try {
      await axios.post(
        "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000/feeds/add",
        formData
      );
      openNotificationWithIcon('success',"Feed Added Successfully")
      setIsModalVisible(false);
    } catch (error) {
      openNotificationWithIcon('error',"Something Went Wrong Please Check","Error")
    }
  };

  const UpdateFeedHandler = async () => {
    const formData = new FormData();
    formData.append("imageUrl", updateSelectedFile);
    formData.append("message", updateDescription);
    formData.append("tags", updateTag);
    formData.append("published", "Yes");

    try {
      await axios
        .put(
          `http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
          formData,
          {
            imageUrl: selectedFile,
            message: updateDescription,
            tags: updateTag,
          },
          {
            headers: {
              "x-auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA",
            },
          }
        )
        .then((response) => {
          openNotificationWithIcon('success',"Feed Added Successfully")
          setFeedData(response.data);
        });
    } catch (error) {
      setIsUpdateModalVisible(false);
      openNotificationWithIcon('error',"Something Went Wrong Please Check","Error")
      // alert("err");
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
                onOk={AddFeedHandler}
                destroyOnClose={true}
              >
                <Form {...layout}>
                  <Form.Item
                    name="name"
                    label="Title"
                    
                    rules={[
                      {
                        required: true,
                        pattern : "^[A-Za-z0-9].{2,16}$",
                        message : "Title Should be 3-16 characters and shouldn't include any special character!", 
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      value={insertMessage}
                      onChange={(event) => setInsertMessage(event.target.value)}
                      onBlur = {handleFocus}
                focused = {focused.toString()}
                    />
                  </Form.Item>
                  <Form.Item 
                  name={["user", "tag"]} 
                  label="Tag" 
                  rules={[
                    {
                      required: true,
                      message: "Tag Cannot be Empty"
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
                  label="Image">
                    <Input 
                    type="file" 
                    accept = "image/*"
                    onChange={fileHandler} />
                    <img src={selectedFile} alt="img" />
                  </Form.Item>
                </Form>
              </Modal>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3} justifyContent="center">
            {feedData.map((item) => (
              <Grid item key={item.id} id={item.id}>
                <Card
                  hoverable
                  style={{
                    minWidth: 380,
                  }}
                  cover={
                    <img height="300px" alt="example" src={item.imageUrl} />
                  }
                >
                  <Meta title={item.tags} description={item.message} />
                  <Grid container justifyContent="flex-end" spacing={1}>
                    <Grid item>
                      <Button
                        className={classes.featuredButton}
                        type="primary"
                        color="primary"
                        onClick={() => {
                          showUpdateModal();
                          setUpdateTag(item.insertTag);
                          setUpdateDescription(item.insertMessage);
                          setSelectedFile(item.selectedFile);
                          setSelectedId(item.id);
                        }}
                        // onClick={}
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
              title="Update Feed"
              visible={isUpdateModalVisible}
              onCancel={handleUpdateCancel}
              onOk={UpdateFeedHandler}
            >
              <Form {...layout}>
                <Form.Item
                  name={["user", "name"]}
                  label="Title"
                  rules={[
                    {
                      required: true,
                      pattern : "^[A-Za-z0-9].{2,16}$",
                      message:"Title Should be 3-16 characters and shouldn't include any special character!", 
                    },
                  ]}
                >
                  <Input
                    type="text"
                    value={updateDescription}
                    onChange={(event) =>
                      setUpdateDescription(event.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item 
                name={["user", "tag"]} 
                label="Tag">
                  <Input
                    type="text"
                    value={updateTag}
                    onChange={(event) => setUpdateTag(event.target.value)}
                  />
                </Form.Item>
                <Form.Item 
                name={["user", "image"]} 
                label="Image">
                  <Input
                    type="file"
                    value={updateSelectedFile}
                    onChange={(event) =>
                      setUpdateSelectedFile(event.target.value)
                    }
                  />
                  <img src={selectedFile} alt="img" />
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
                  onClick={() => handleDeleteClick()}
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
