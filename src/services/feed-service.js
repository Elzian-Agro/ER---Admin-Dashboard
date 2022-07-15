import { useCookies } from "react-cookie";
import axios from "axios";

export default function FeedService() {
  const [cookies] = useCookies(["token"]);

  const http = axios.create({
    baseURL:
      "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": cookies.token,
    },
  });

  async function GetAllFeeds() {
    const data = await http.get("/feeds").then((res) => res.data.Result);
    return data;
  }
  async function AddFeedHandler() {
    const data = await http.put("/feeds/add").then((res) => res);
    console.log(data);
    // return data;
  }
  async function UpdateFeedHandler(Id) {
    const data = await http.put("/feeds/updateFeed/" + Id).then((res) => res);
    console.log(data);
    // return data;
  }
  async function handleDeleteClick(Id) {
    const data = await http.put("/feeds/deleteFeed/" + Id).then((res) => res);
    console.log(
      data.status === 200
        ? data.data.message
        : "Oops! something went wrong when deleting Tree"
    );
    // return data;
  }

  return {
    GetAllFeeds,
    AddFeedHandler,
    UpdateFeedHandler,
    handleDeleteClick,
  };
}
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

import service from "./../services/feed-service";

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
  const [modaldata, setmodaldata] = useState({});
  const [selectedId, setSelectedId] = useState("");
  const [updateSelectedFile, setUpdateSelectedFile] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateTag, setUpdateTag] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [insertMessage, setInsertMessage] = useState("");
  const [insertTag, setInsertTag] = useState("");

  const {
    GetAllFeeds,
    AddFeedHandler,
    UpdateFeedHandler,
    handleDeleteClick
  } = service();

  useEffect(() => {
    async function fetchData() {
      const res = await GetAllFeeds();
      setFeedData(
        res.map(
          ({
            id,
            selectedFile,
            insertMessage,
            insertTag,

          }) => ({
            key: id,
            id,
            selectedFile,
            insertMessage,
            insertTag,
          })
        )
      );
    }
    fetchData();
  }, [GetAllFeeds]);
const{
  id,
  selectedFile,
      insertMessage,
      insertTag,
} = modaldata;

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
      <Row gutter={[16, 16]}>
          <Col md={12} xs={24}>
            <Map lat={latitude} lon={longitude} />
          </Col>
          <Col md={12} xs={24}>
            <Space direction="vertical">
              <div key={0}>
                Feed ID : &nbsp;&nbsp;<b>{id}</b>
              </div>
              <div key={1}>
              selectedFile : &nbsp;&nbsp;<b>{selectedFile}</b>
              </div>
              <div key={2}>
                LifeForce Unit Tree No : &nbsp;&nbsp;
                <b>{lifeForceUnitTreeNo}</b>
              </div>
              <div key={3}>
                landOwner Register No : &nbsp;&nbsp;<b>{landOwnerRegisterNo}</b>
              </div>
              <div key={4}>
                landOwner ID : &nbsp;&nbsp;<b>{landOwnerID}</b>
              </div>
              {/* <div key={5}>landOwner Name : &nbsp;&nbsp;<b>{landOwnerName}</b></div> */}
              <div key={6}>
                Auditor ID : &nbsp;&nbsp;<b>{creatorID}</b>
              </div>
              {/* <div key={7}>Auditor ID : &nbsp;&nbsp;<b>{getAuditorById(creatorID)}</b></div> */}
              <div key={8}>
                Date of planting : &nbsp;&nbsp;<b>{dateofPlanting}</b>
              </div>
              <div key={9}>
                created At : &nbsp;&nbsp;<b>{createdAt}</b>
              </div>
            </Space>
          </Col>
        </Row>
    </Grid>
  </>
);
}

export default Feed;

// const formData = new FormData();
    // formData.append("imageUrl", updateSelectedFile);
    // formData.append("message", updateDescription);
    // formData.append("tags", updateTag);
    // formData.append("published", "Yes");
    const feedDetail = {
      selectedFile: updateSelectedFile,
      insertMessage: updateDescription,
      insertTag: updateTag,
    };
    // try {
    //   await axios({
    //     method: "put",
    //     url: `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
    //     data: feedDetail,
    //     headers: {
    //       "x-auth-token":
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA",
    //     },
    //   }).then((res) => res);
    //   console.log(feedData);
    //   alert("done");
    //   setIsUpdateModalVisible(false);
    // } catch (error) {
    //   console.log(error);
    //   alert("not done");
    //   setIsUpdateModalVisible(false);
    // }

    // axios({
    //   method: "put",
    //   url: `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
    //   data: feedDetail,
    //   headers: {
    //     "x-auth-token":
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA",
    //   },
    // }).then(() => {
    //   const updateFeed = feedData.map((feed) => {
    //     if (feed.id === selectedId) {
    //       return feedDetail;
    //     }

    //     return feed;
    //   });
    //   alert("done");
    //   setFeedData(updateFeed);
    // });

     // const feedDetail = {
    //   selectedFile: updateSelectedFile,
    //   insertMessage: updateDescription,
    //   insertTag: updateTag,
    // };

    // axios.put('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
    //   .then(res => console.log(res.data));
    //   try {
    //     await updateLandOwnerById(selectedId, landData);
    //     setIsUpdateModalVisible(false);
    //   } catch (error) {
    //     setIsUpdateModalVisible(false);
    //   }

    //   getAllLandOwners();
    // };
    // try {
    //   await axios.put(
    //     `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
    //     { imageUrl: selectedFile, message: updateDescription, tags: updateTag }
    //   );
    //   setIsUpdateModalVisible(false);
    // } catch (error) {}

    // axios({
    //   method: "put",
    //   url: `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/feeds/updateFeed/${selectedId}`,
    //   data: feedDetail,
    //   headers: {
    //     "x-auth-token":
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA",
    //   },
    // }).then(() => {
    //   const updateFeed = feedData.map((feed) => {
    //     if (feed.id === selectedId) {
    //       return feedDetail;
    //     }

    //     return feed;
    //   });
    //   alert("done");
    //   setFeedData(updateFeed);
    // });

    // return(
//   <div>
//     hi
//   </div>
// )

// import { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import { PlusOutlined } from "@ant-design/icons";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogActions from "@mui/material/DialogActions";
// import { Card, Button, Modal, Form, Input } from "antd";
// import { makeStyles } from "@mui/styles";
// import axios from "axios";
// import { useCookies } from "react-cookie";

// import service from "./../services/feed-service";

// const { Meta } = Card;
// const useStyles = makeStyles({
//   featuredButton: {
//     fontSize: "12px",
//     width: "80px",
//   },
// });

// function Feed() {
//   const classes = useStyles();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [deleteFeed, setDeleteFeed] = useState(false);
//   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
//   const [feedData, setFeedData] = useState([]);
//   const [modaldata, setmodaldata] = useState({});
//   const [selectedId, setSelectedId] = useState("");
//   const [updateSelectedFile, setUpdateSelectedFile] = useState("");
//   const [updateDescription, setUpdateDescription] = useState("");
//   const [updateTag, setUpdateTag] = useState("");
//   const [selectedFile, setSelectedFile] = useState();
//   const [insertMessage, setInsertMessage] = useState("");
//   const [insertTag, setInsertTag] = useState("");

//   const {
//     GetAllFeeds,
//     AddFeedHandler,
//     UpdateFeedHandler,
//     handleDeleteClick
//   } = service();

//   useEffect(() => {
//     async function fetchData() {
//       const res = await GetAllFeeds();
//       setFeedData(
//         res.map(
//           ({
//             id,
//             selectedFile,
//             insertMessage,
//             insertTag,

//           }) => ({
//             key: id,
//             id,
//             selectedFile,
//             insertMessage,
//             insertTag,
//           })
//         )
//       );
//     }
//     fetchData();
//   }, [GetAllFeeds]);
// const{
//   id,
//   selectedFile,
//       insertMessage,
//       insertTag,
// } = modaldata;

// const showModal = () => {
//   setIsModalVisible(true);
// };
// const handleCancel = () => {
//   setIsModalVisible(false);
// };
// const showUpdateModal = () => {
//   setIsUpdateModalVisible(true);
// };
// const handleUpdateCancel = () => {
//   setIsUpdateModalVisible(false);
// };
// return (
//   <>
//     <Grid container direction="column" spacing={4}>
//       <Grid item>
//         <Grid item container justifyContent="flex-end">
//           <Grid item>
//             <Button
//               type="primary"
//               className="ant-full-box"
//               icon={<PlusOutlined />}
//               onClick={showModal}
//               style={{ color: "white" }}
//             >
//               Add Feed
//             </Button>

//             <Modal
//               title="Add New Feed"
//               visible={isModalVisible}
//               onCancel={handleCancel}
//               onOk={AddFeedHandler}
//               destroyOnClose={true}
//             >
//               <Form {...layout}>
//                 <Form.Item
//                   name={["user", "name"]}
//                   label="Title"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <Input
//                     type="text"
//                     value={insertMessage}
//                     onChange={(event) => setInsertMessage(event.target.value)}
//                   />
//                 </Form.Item>
//                 <Form.Item name={["user", "tag"]} label="Tag">
//                   <Input
//                     type="text"
//                     value={insertTag}
//                     onChange={(event) => setInsertTag(event.target.value)}
//                   />
//                 </Form.Item>
//                 <Form.Item name={["user", "image"]} label="Image">
//                   <Input type="file" onChange={fileHandler} />
//                   <img src={selectedFile} alt="img" />
//                 </Form.Item>
//               </Form>
//             </Modal>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>
//         <Grid container spacing={3} justifyContent="center">
//           {feedData.map((item) => (
//             <Grid item key={item.id} id={item.id}>
//               <Card
//                 hoverable
//                 style={{
//                   minWidth: 380,
//                 }}
//                 cover={
//                   <img height="300px" alt="example" src={item.imageUrl} />
//                 }
//               >
//                 <Meta title={item.tags} description={item.message} />
//                 <Grid container justifyContent="flex-end" spacing={1}>
//                   <Grid item>
//                     <Button
//                       className={classes.featuredButton}
//                       type="primary"
//                       color="primary"
//                       onClick={() => {
//                         showUpdateModal();
//                         setUpdateTag(item.insertTag);
//                         setUpdateDescription(item.insertMessage);
//                         setSelectedFile(item.selectedFile);
//                         setSelectedId(item.id);
//                       }}
//                       // onClick={()=>  UpdateFeedHandler()}
//                     >
//                       Update
//                     </Button>
//                   </Grid>
//                   <Grid item>
//                     <Button
//                       type="primary"
//                       danger
//                       onClick={() => {
//                         setDeleteFeed(true);
//                         setSelectedId(item.id);
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Card>
//             </Grid>
//           ))}
//           <Modal
//             title="Update Feed"
//             visible={isUpdateModalVisible}
//             onCancel={handleUpdateCancel}
//             onOk={UpdateFeedHandler}
//           >
//             <Form {...layout}>
//               <Form.Item
//                 name={["user", "name"]}
//                 label="Title"
//                 rules={[
//                   {
//                     required: true,
//                   },
//                 ]}
//               >
//                 <Input
//                   type="text"
//                   value={updateDescription}
//                   onChange={(event) =>
//                     setUpdateDescription(event.target.value)
//                   }
//                 />
//               </Form.Item>
//               <Form.Item name={["user", "tag"]} label="Tag">
//                 <Input
//                   type="text"
//                   value={updateTag}
//                   onChange={(event) => setUpdateTag(event.target.value)}
//                 />
//               </Form.Item>
//               <Form.Item name={["user", "image"]} label="Image">
//                 <Input
//                   type="file"
//                   value={updateSelectedFile}
//                   onChange={(event) =>
//                     setUpdateSelectedFile(event.target.value)
//                   }
//                 />
//                 <img src={selectedFile} alt="img" />
//               </Form.Item>
//             </Form>
//           </Modal>

//           <Dialog
//             aria-labelledby="dialog-title"
//             open={deleteFeed}
//             onClose={() => setDeleteFeed(false)}
//             hideBackdrop
//             PaperProps={{
//               elevation: 0,
//               sx: {
//                 boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
//               },
//             }}
//           >
//             <DialogTitle id="dialog-title">
//               Do you really want to delete?
//             </DialogTitle>
//             <DialogActions>
//               <Button type="primary" onClick={() => setDeleteFeed(false)}>
//                 Cancel
//               </Button>
//               <Button
//                 type="primary"
//                 danger
//                 onClick={() => handleDeleteClick()}
//                 color="error"
//               >
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Grid>
//       </Grid>
//       <Row gutter={[16, 16]}>
//           <Col md={12} xs={24}>
//             <Map lat={latitude} lon={longitude} />
//           </Col>
//           <Col md={12} xs={24}>
//             <Space direction="vertical">
//               <div key={0}>
//                 Feed ID : &nbsp;&nbsp;<b>{id}</b>
//               </div>
//               <div key={1}>
//               selectedFile : &nbsp;&nbsp;<b>{selectedFile}</b>
//               </div>
//               <div key={2}>
//                 LifeForce Unit Tree No : &nbsp;&nbsp;
//                 <b>{lifeForceUnitTreeNo}</b>
//               </div>
//               <div key={3}>
//                 landOwner Register No : &nbsp;&nbsp;<b>{landOwnerRegisterNo}</b>
//               </div>
//               <div key={4}>
//                 landOwner ID : &nbsp;&nbsp;<b>{landOwnerID}</b>
//               </div>
//               {/* <div key={5}>landOwner Name : &nbsp;&nbsp;<b>{landOwnerName}</b></div> */}
//               <div key={6}>
//                 Auditor ID : &nbsp;&nbsp;<b>{creatorID}</b>
//               </div>
//               {/* <div key={7}>Auditor ID : &nbsp;&nbsp;<b>{getAuditorById(creatorID)}</b></div> */}
//               <div key={8}>
//                 Date of planting : &nbsp;&nbsp;<b>{dateofPlanting}</b>
//               </div>
//               <div key={9}>
//                 created At : &nbsp;&nbsp;<b>{createdAt}</b>
//               </div>
//             </Space>
//           </Col>
//         </Row>
//     </Grid>
//   </>
// );
// }

// export default Feed;
