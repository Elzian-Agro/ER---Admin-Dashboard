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
import { Card, Button, Modal, Form, Input } from "antd";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useCookies } from "react-cookie";
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

  const cookies = useCookies(["token"]);

  axios.defaults.headers = {
    "Content-Type": "application/json",
    "x-auth-token": cookies[0].token,
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
  }, [isModalVisible, isUpdateModalVisible, deleteFeed]);

  const fileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const GetAllFeeds = async () => {
    const result = await axios.get(
      "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/"
    );
    setFeedData(result.data.Result);
  };

  const handleDeleteClick = async () => {
    try {
      await axios
        .delete(
          `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/deleteFeed/${selectedId}`
        )
        .then((res) => res);
      setDeleteFeed(false);
    } catch (error) {
      alert("err");
      setDeleteFeed(false);
    }
  };

  //Add Feed
  const AddFeedHandler = async () => {
    const formData = new FormData();
    formData.append("imageUrl", selectedFile);
    formData.append("message", insertMessage);
    formData.append("tags", insertTag);
    formData.append("published", "Yes");
    try {
      await axios.post(
        "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/add",
        formData
      );
      alert("Added");
      setIsModalVisible(false);
    } catch (error) {
      alert("Error Occcured");
    }
  };

  const UpdateFeedHandler = async () => {
    try {
      await axios.put(
        `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
        alert("updated"),
        console.log("done"),
        setIsUpdateModalVisible(false)
      );
    } catch (error) {
      setIsUpdateModalVisible(false);
      alert("err");
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
                    name={["user", "name"]}
                    label="Title"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      value={insertMessage}
                      onChange={(event) => setInsertMessage(event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item name={["user", "tag"]} label="Tag">
                    <Input
                      type="text"
                      value={insertTag}
                      onChange={(event) => setInsertTag(event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item name={["user", "image"]} label="Image">
                    <Input type="file" onChange={fileHandler} />
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
                        // onClick={()=>  UpdateFeedHandler()}
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
                <Form.Item name={["user", "tag"]} label="Tag">
                  <Input
                    type="text"
                    value={updateTag}
                    onChange={(event) => setUpdateTag(event.target.value)}
                  />
                </Form.Item>
                <Form.Item name={["user", "image"]} label="Image">
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
