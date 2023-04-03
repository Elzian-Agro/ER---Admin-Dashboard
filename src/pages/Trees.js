import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import moment from 'moment';
import "antd/dist/antd.css";
import {
  Modal,
  Button,
  Card,
  Input,
  Typography,
  Table,
  Row,
  Col,
  Space,
  Image,
} from "antd";

import service from "./../services/data-service";
import Map from "../components/map";
import { SearchOutlined } from "@ant-design/icons";
import { makeStyles } from "@mui/styles";

const { Title } = Typography;
const  useStyles = makeStyles({
  headerSearch: {
    width: "220px",
    borderRadius: "7px",
    marginRight: "10px",
    marginLeft: "10px",
  },
});

const Trees = () => {
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  //const [AuditorName, setAuditorName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  //const [sortedInfo, setSortedInfo] = useState({});

  const {
    getPlantedTrees,
    // deletePlantedTree,
    // updatePlantedTree,
    // getLandOwnerById,
    // getAuditorById,
  } = service();


  //Tree table
  const columns = [
    {
      title: "Unit Tree Number",
      key: "unit tree no",
      dataIndex: "unit tree no",
      render: (index, record) => (
        <>
          <Title className="hoverCursor" level={5}>{record.lifeForceUnitTreeNo}</Title>
        </>
      ),
    },
    {
      title: "Tree Species",
      key: "tree species",
      dataIndex: "tree species",
      render: (index, record) => (
        <>
          <Title className="hoverCursor" level={5}>{record.treeSpecies}</Title>
        </>
      ),
    },
    {
      title: "Landowner Registration Number",
      key: "landowner reistration no",
      dataIndex: "landowner reistration no",
      render: (index, record) => (
        <>
          <Title className="hoverCursor" level={5}>{record.landOwnerRegisterNo}</Title>
        </>
      ),
    },
    {
      title: "Date Of Planting",
      key: "date of planting",
      dataIndex: "date of planting",
      render: (index, record) => (
        <>
          <Title className="hoverCursor" level={5}>{record.dateofPlanting}</Title>
        </>
      ),
    },
    {
      title: "Auditor ID",
      key: "auditor id",
      dataIndex: "auditor id",
      render: (index, record) => (
        <>
          <Title className="hoverCursor" level={5}>{record.creatorID}</Title>
        </>
      ),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const res = await getPlantedTrees();
      setdata(
        res.map(
          ({
            treeID,
            creatorID,
            landOwnerID,
            landOwnerRegisterNo,
            lifeForceUnitTreeNo,
            treeSpecies,
            dateofPlanting,
            createdAt,
            longitude,
            latitude,
            imageUrl,
          }) => ({
            key: treeID,
            treeID,
            creatorID,
            landOwnerID,
            landOwnerRegisterNo,
            lifeForceUnitTreeNo,
            treeSpecies,
            dateofPlanting,
            createdAt,
            longitude,
            latitude,
            imageUrl,
          })
        )
      );
      setTableData(
        res.map(
          ({
            treeID,
            creatorID,
            landOwnerID,
            landOwnerRegisterNo,
            lifeForceUnitTreeNo,
            treeSpecies,
            dateofPlanting,
            createdAt,
            longitude,
            latitude,
          }) => ({
            key: treeID,
            treeID,
            creatorID,
            landOwnerID,
            landOwnerRegisterNo,
            lifeForceUnitTreeNo,
            treeSpecies,
            dateofPlanting,
            createdAt,
            longitude,
            latitude,
          })
        )
      );
    
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // useEffect(() => {
  //   async function fetchData() {
  //     const landOwner = await getLandOwnerById(modaldata.landOwnerID || null);
  //     const auditor = await getAuditorById(modaldata.creatorID || null);
  //     setLandOwnerName(landOwner);
  //     setAuditorName(auditor);
  //   }
  //   fetchData();
  // }, [getLandOwnerById, modaldata.landOwnerID]);
  

  const {
    treeID,
    creatorID,
    landOwnerID,
    landOwnerRegisterNo,
    lifeForceUnitTreeNo,
    treeSpecies,
    dateofPlanting,
    createdAt,
    longitude,
    latitude,
    imageUrl,
  } = modaldata;
 

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const handleConfirmDelete = async () => {
  //   await deletePlantedTree(treeID);
  //   handleDeleteModalCancel();
  //   handleCancel();
  // };

  // const handleDeleteModalCancel = () => {
  //   setIsDeleteModalVisible(false);
  // };


  //if (!admin) return null;


  /* 
    Create search box
    Usage: Web Application
  */
  const handleonChange = (e) => {
    const searchKey = e.target.value.toLowerCase();
    if (searchKey === "") {
      setdata(tableData);
    } else {
      const filteredData = tableData.filter((item) => {
        const unitTree = item.lifeForceUnitTreeNo ? item.lifeForceUnitTreeNo.toLowerCase() : '';
        const landOwnerRegiNo = item.landOwnerRegisterNo ? item.landOwnerRegisterNo.toLowerCase() : '';
        const treesSpecies = item.treeSpecies ? item.treeSpecies.toLowerCase() : '';
        return (
          unitTree.includes(searchKey) ||
          landOwnerRegiNo.includes(searchKey) ||
          treesSpecies.includes(searchKey)
        );
      });
      setdata(filteredData);
    }
  };


  return (
    <>
      <Content>
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Trees"
              extra={
                <>
                  <Input
                    className={classes.headerSearch}
                    placeholder="Search Planted Trees..."
                    prefix={<SearchOutlined />}
                    onChange={handleonChange}
                  />
                </>
              }
            >
              <Table
                dataSource={data.sort((a,b) =>moment(a.dateofPlanting) - moment(b.dateofPlanting))} pagination={{pageSize: 9}}
                columns={columns}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setIsModalVisible(true);
                      setmodaldata(record);
                    },
                  };
                }}
              />
            </Card>
          </Col>
        </Row>
      </Content>

    {/*  
      Tree data modal 
  */}
      <Modal
        // eslint-disable-next-line no-useless-concat
        title={"Tree Details" + (" ") + "(" +treeSpecies+ ")"}
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
        width={1000}
        style={{
          textAlign: "center"
        }}
        footer={[
          // <Button
          //   key="delete"
          //   type="danger"
          //   onClick={() => setIsDeleteModalVisible(true)}
          // >
          //   Delete
          // </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Row gutter={[16, 16]}>
          <Col md={12} xs={24}>
            <Map lat={latitude} lon={longitude} />
          </Col>

          <Col md={12} xs={24}>
          <Space direction="vertical">

              {/* add image */}
              <div key={10}>
                <Image
                  width={100}
                  src={imageUrl}
                />
              </div>

              <div key={0}>
                Tree ID : &nbsp;&nbsp;<b>{treeID}</b>
              </div>
              <div key={1}>
                Tree species : &nbsp;&nbsp;<b>{treeSpecies}</b>
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
              {/* <div key={5}>
                landOwner Name : &nbsp;&nbsp;<b>{landOwnerName}</b>
              </div> */}

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
      </Modal>

      {/* Delete Modal */}
      {/* <Modal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        destroyOnClose
        width={500}
        footer={[
          <Button key="back" onClick={handleDeleteModalCancel}>
            Cancel
          </Button>,
          <Button type="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>,
        ]}
      >
        Are you sure You want to delete <b>{treeID}</b> ?
      </Modal>       
    */}
    </>
  );
};

export default Trees;
