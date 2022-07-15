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
import axios from "axios";
import { useCookies } from "react-cookie";
// import { Token } from "@mui/icons-material";

const { Meta } = Card;

function Fee() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteFeed, setDeleteFeed] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
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
  }, [deleteFeed, isModalVisible]);

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
    // console.log(cookies.token);
    // const token = cookies.token;

    // try {
    //   await axios.delete(
    //     `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/deleteFeed/${selectedId}`
    //   );
    //   setDeleteFeed(false);
    // } catch (error) {
    //   setDeleteFeed(false);
    // }
    axios({
      method: "put",
      url: `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/deleteFeed/${selectedId}`,

      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA",
      },
    })
      .then(() => {
        const deleteFeed = feedData.filter((feed) => feed.id !== selectedId);
        setFeedData(deleteFeed);
      })
      .catch((err) => {
        console.log(err);
      });

    setDeleteFeed(false);
  };

  //Add Feed
  const AddFeedHandler = async () => {
    console.log(cookies[0].token);
    const formData = new FormData();
    formData.append("imageUrl", selectedFile);
    formData.append("message", insertMessage);
    formData.append("tags", insertTag);
    formData.append("published", "Yes");
    console.log("this is form data", selectedFile);
    try {
      await axios.post(
        "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/add",
        formData
      );
      setIsModalVisible(false);
    } catch (error) {
      alert("Error Occcured");
    }
  };
  // Pop up ok button for update
  const UpdateFeedHandler = async () => {
    console.log(updateTag);
    console.log(updateDescription);
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("imageUrl", selectedFile);
    formData.append("message", updateDescription);
    formData.append("tags", updateTag);
    formData.append("published", "Yes");
    console.log("this is form data", selectedFile);
    const feedDetail = {
      imageUrl: selectedFile,
      message: updateDescription,
      tags: updateTag,
    };
    // try {
    //   await axios.put(
    //     {
    //       "x-auth-token":
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA",
    //     },
    //     `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
    //     {
    //       imageUrl: selectedFile,
    //       message: updateDescription,
    //       tags: updateTag,
    //     },
    //     alert("sadd")
    //   );
    //   setIsModalVisible(false);
    // } catch (error) {
    //   alert("err");
    // }
    axios({
      method: "put",
      url: `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
      data: feedDetail,
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA",
      },
    }).then(() => {
      const updateFeed = feedData.map((feed) => {
        if (feed.id === selectedId) {
          return feedDetail;
        }
        return feed;
      });
      setFeedData(updateFeed);
    });

    setIsUpdateModalVisible(false);
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
                      placeholder={insertMessage}
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
                    <img src={selectedFile} />
                    {/* <Input type="file" accept="image/*" /> */}
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
                          type="primary"
                          color="primary"
                          onClick={() => {
                            showUpdateModal();
                            setUpdateTag(item.tags);
                            setUpdateDescription(item.message);
                            setSelectedFile(item.imageUrl);
                            setSelectedId(item.id);
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
              );
            })}
            <Modal
              title="Update Feed"
              visible={isUpdateModalVisible}
              onCancel={handleUpdateCancel}
              onOk={UpdateFeedHandler}
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
                  hasFeedback
                >
                  <Input
                    placeholder={updateDescription}
                    defaultValue={updateDescription}
                    onChange={(event) =>
                      setUpdateDescription(event.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item name={["user", "mobileNo"]} label="Tag" hasFeedback>
                  <Input
                    placeholder={updateTag}
                    defaultValue={updateTag}
                    onChange={(event) => setUpdateTag(event.target.value)}
                  />
                </Form.Item>
                <Form.Item name={["user", "email"]} label="Image" hasFeedback>
                  <Input type="file" onChange={fileHandler} />
                  <img src={selectedFile} />
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

export default Fee;
// /*!
//   =========================================================
//   * Muse Ant Design Dashboard - v1.0.0
//   =========================================================
//   * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
//   * Copyright 2021 Creative Tim (https://www.creative-tim.com)
//   * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
//   * Coded by Creative Tim
//   =========================================================
//   * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */
// import { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import { PlusOutlined } from "@ant-design/icons";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogActions from "@mui/material/DialogActions";
// import { Card, Button, Modal, Form, Input, message } from "antd";
// import { makeStyles } from "@mui/styles";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// // import { Token } from "@mui/icons-material";

// const { Meta } = Card;
// const useStyles = makeStyles({
//   mainHeading: {
//     fontWeight: "bold",
//     fontSize: 18,
//   },

//   tableHeading: {
//     fontWeight: "bold",
//   },

//   tableContainer: {
//     boxShadow: "0 2px 6px rgb(0 0 0 / 0.25)",
//   },

//   featuredButton: {
//     fontSize: "12px",
//     width: "80px",
//   },

//   approveButton: {
//     backgroundColor: "green",
//   },

//   formTextField: {
//     marginBottom: "20px",
//     marginRight: "10px",
//     marginLeft: "10px",
//     width: "400px",
//   },

//   headerSearch: {
//     width: "300px",
//     borderRadius: "5px",
//     marginRight: "10px",
//     marginLeft: "10px",
//   },
// });
// function Feed() {
//   const classes = useStyles();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [deleteFeed, setDeleteFeed] = useState(false);
//   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
//   const [data, setData] = useState([]);
//   const [selectedId, setSelectedId] = useState("");
//   const [updateMessage, setUpdateMessage] = useState("");
//   const [updateTag, setUpdateTag] = useState("");
//   const [updateImageUrl, setUpdateImageUrl] = useState("");
//   const [selectedFile, setSelectedFile] = useState();
//   const [message, setMessage] = useState("");
//   const [imageUrl, setImageUrl] = "";
//   const [tags, setTags] = "";
//   // const [insertTag, setInsertTag] = useState("");
//   const [searchFeed, setSearchFeed] = useState("");

//   const cookies = useCookies(["token"]);

//   axios.defaults.headers = {
//     "Content-Type": "application/json",
//     "x-auth-token": cookies[0].token,
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };
//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };
//   const showUpdateModal = () => {
//     setIsUpdateModalVisible(true);
//   };
//   const handleUpdateCancel = () => {
//     setIsUpdateModalVisible(false);
//   };
//   const layout = {
//     labelCol: {
//       span: 6,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };

//   useEffect(() => {
//     GetAllFeeds();
//   }, [deleteFeed, isUpdateModalVisible]);

//   const GetAllFeeds = async () => {
//     const result = await axios.get(
//       "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/"
//     );
//     setData(result.data.Result);
//   };

//   const handleDeleteClick = async () => {
//     // console.log(cookies.token);
//     // const token = cookies.token;

//     try {
//       await axios.delete(
//         `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/deleteFeed/${selectedId}`
//       );
//       setDeleteFeed(false);
//     } catch (error) {
//       setDeleteFeed(false);
//     }
//   };

//   //Add Feed
//   const AddFeedHandler = async () => {
//     const formData = new FormData();
//     formData.append("imageUrl", imageUrl);
//     formData.append("title", message);
//     formData.append("tags", tags);
//     formData.append("published", "Yes");
//     console.log("this is form data", selectedFile);

//     try {
//       await axios.post(
//         "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/add"
//       );
//     } catch (error) {
//       alert("Error Occcured");
//     }
//   };

//   const updateFeedHandler = async () => {
//     console.log(updateTag);
//     console.log(updateMessage);
//     console.log(selectedFile);
//     const formData = new FormData();
//     // formData.append("imageUrl", selectedFile);
//     // formData.append("title", insertTitle);
//     // formData.append("tags", insertTag);

//     formData.append("imageUrl", imageUrl);
//     formData.append("title", message);
//     formData.append("tags", tags);
//     formData.append("published", "Yes");
//     console.log("this is form data", selectedFile);
//     const feedData = {
//       imageUrl: updateImageUrl,
//       message: updateMessage,
//       tags: updateTag,
//     };
//     axios({
//       method: "put",
//       url: `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
//       data: feedData,
//       headers: {
//         "x-auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA",
//       },
//     }).then(() => {
//       const updateFeed = data.map((feed) => {
//         if (feed.id === selectedId) {
//           return feedData;
//         }
//         return feed;
//       });
//       setData(updateFeed);
//     });

//     setIsUpdateModalVisible(false);
//   };

//   return (
//     <>
//       <Grid container direction="column" spacing={4}>
//         <Grid item>
//           <Grid item container justifyContent="flex-end">
//             <Grid item>
//               <Button
//                 type="primary"
//                 className="ant-full-box"
//                 icon={<PlusOutlined />}
//                 onClick={showModal}
//                 style={{ color: "white" }}
//               >
//                 Add Feed
//               </Button>
//               <Modal
//                 title="Add New Feed"
//                 visible={isModalVisible}
//                 onCancel={handleCancel}
//                 onOk={AddFeedHandler}
//               >
//                 <Form {...layout}>
//                   <Form.Item
//                     name={["user", "name"]}
//                     label="Title"
//                     rules={[
//                       {
//                         required: true,
//                       },
//                     ]}
//                   >
//                     <Input
//                       type="text"
//                       value={message}
//                       onChange={(event) => setMessage(event.target.value)}
//                     />
//                   </Form.Item>
//                   <Form.Item name={["user", "tag"]} label="Tag">
//                     <Input
//                       type="text"
//                       value={tags}
//                       onChange={(event) => setTags(event.target.value)}
//                     />
//                   </Form.Item>
//                   <Form.Item name={["user", "image"]} label="Image">
//                     <Input
//                       type="file"
//                       placeholder={updateImageUrl}
//                       value={imageUrl}
//                       onChange={(event) => setImageUrl(event.target.value)}
//                     />
//                     <img src={imageUrl} />
//                     {/* <Input type="file" accept="image/*" /> */}
//                   </Form.Item>
//                 </Form>
//               </Modal>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item>
//           <Grid container spacing={3} justifyContent="center">
//             {data
//               // .filter((item) => {
//               //   if (searchFeed === "") {
//               //     return item;
//               //   } else if (
//               //     item..toLowerCase().includes(searchFeed.toLowerCase())
//               //   ) {
//               //     return item;
//               //   }
//               //   return null;
//               // })
//               .map((item) => {
//                 return (
//                   <Grid item>
//                     <Card
//                       hoverable
//                       style={{
//                         minWidth: 380,
//                       }}
//                       cover={
//                         <img height="300px" alt="example" src={item.imageUrl} />
//                       }
//                     >
//                       <Meta title={item.tags} description={item.message} />
//                       <Grid container justifyContent="flex-end" spacing={1}>
//                         <Grid item>
//                           <Button
//                             className={classes.featuredButton}
//                             type="primary"
//                             color="primary"
//                             onClick={() => {
//                               showUpdateModal();
//                               setSelectedId(item.id);
//                               setUpdateTag(item.tags);
//                               setUpdateMessage(item.title);
//                               setUpdateImageUrl(item.imageUrl);
//                             }}
//                           >
//                             Update
//                           </Button>
//                         </Grid>
//                         <Grid item>
//                           <Button
//                             type="primary"
//                             danger
//                             onClick={() => {
//                               setDeleteFeed(true);
//                               setSelectedId(item.id);
//                             }}
//                           >
//                             Delete
//                           </Button>
//                         </Grid>
//                       </Grid>
//                     </Card>
//                   </Grid>
//                 );
//               })}
//             <Modal
//               title="Update Feed"
//               visible={isUpdateModalVisible}
//               onCancel={handleUpdateCancel}
//               onOk={updateFeedHandler}
//             >
//               <Form {...layout}>
//                 <Form.Item
//                   name="Title"
//                   label="Title"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <Input
//                     name="updateTitle"
//                     defaultValue={updateMessage}
//                     onChange={(event) => setUpdateMessage(event.target.value)}
//                   />
//                 </Form.Item>
//                 <Form.Item name="Tag" label="Tag">
//                   <Input
//                     name="updateTag"
//                     defaultValue={updateTag}
//                     onChange={(event) => setUpdateTag(event.target.value)}
//                   />
//                 </Form.Item>
//                 <Form.Item name={["user", "email"]} label="Image">
//                   <Input
//                     type="file"
//                     placeholder={updateImageUrl}
//                     value={updateImageUrl}
//                     onChange={(event) => setSelectedFile(event.target.value)}
//                   />
//                   <img src={imageUrl} />
//                 </Form.Item>
//               </Form>
//             </Modal>

//             <Dialog
//               aria-labelledby="dialog-title"
//               open={deleteFeed}
//               onClose={() => setDeleteFeed(false)}
//               hideBackdrop
//               PaperProps={{
//                 elevation: 0,
//                 sx: {
//                   boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
//                 },
//               }}
//             >
//               <DialogTitle id="dialog-title">
//                 Do you really want to delete?
//               </DialogTitle>
//               <DialogActions>
//                 <Button type="primary" onClick={() => setDeleteFeed(false)}>
//                   Cancel
//                 </Button>
//                 <Button
//                   type="primary"
//                   danger
//                   onClick={() => handleDeleteClick()}
//                   color="error"
//                 >
//                   Delete
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default Feed;
