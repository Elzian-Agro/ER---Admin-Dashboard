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

    const {
        deleteFeedById,
        updateFeedById,
        addNewFeed,
      } = service();

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
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

      const handleAddFormSubmit = async () => {    
        const feedData = {
          feedName: feedName,
          feedTag: feedTag,
          image: image,
        };
        try {
          await addNewFeed(feedData);
          setIsModalVisible(false);
        } catch (error) {
          alert("Error Occcured");
          setIsModalVisible(false);
        }
      };

      const handleDeleteClick = async () => {
        try {
          await deleteFeedById(selectedId);
          setDeleteFeed(false);
        } catch (error) {
          setDeleteFeed(false);
        }
      };

      const handleUpdateClick = async () => {
        const feedData = {
            feedName: feedName,
            feedTag: feedTag,
            image: image,
        };
        try {
          await updateFeedById(selectedId, feedData);
          setIsUpdateModalVisible(false);
        } catch (error) {
          setIsUpdateModalVisible(false);
        }        
      };

      return (
        <div>
          <Box
            component="span"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            mt={1}
          >
            <h1 className={classes.mainHeading}>Land Owners</h1>
            <Input
              placeholder="Search Land Owners..."
              prefix={<SearchOutlined />}
              className={classes.headerSearch}
              onChange={(event) => {setSearchLandOwner(event.target.value)}}
            />
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              New
            </Button>
            </Box>
            </div>
            );
    




}

    