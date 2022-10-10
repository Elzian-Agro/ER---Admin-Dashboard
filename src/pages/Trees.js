import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { Table, Row, Col, Space } from "antd";
import "antd/dist/antd.css";
import { Modal, Button, Card, Typography } from "antd";

import service from "./../services/data-service";
import Map from "../components/map";
//import userType from "../components/userType";

const { Title } = Typography;

const Trees = () => {
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  // const [landOwnerName, setLandOwnerName] = useState();
  // const [AuditorName, setAuditorName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const {
    getPlantedTrees,
    //deletePlantedTree,
    // updatePlantedTree,
    // getLandOwnerById,
    // getAuditorById,
  } = service();

  //const { admin } = userType();

  const columns = [
    {
      title: "UNIT TREE NUMBER",
      key: "unit tree no",
      dataIndex: "unit tree no",
      render: (index, record) => (
        <>
          <Title level={5}>{record.lifeForceUnitTreeNo}</Title>
        </>
      ),
    },
    {
      title: "TREE SPECIE",
      key: "tree specie",
      dataIndex: "tree specie",
      render: (index, record) => (
        <>
          <Title level={5}>{record.treeSpecies}</Title>
        </>
      ),
    },
    {
      title: "LANDOWNER REGISTRATION NUMBER",
      key: "landowner reistration no",
      dataIndex: "landowner reistration no",
      render: (index, record) => (
        <>
          <Title level={5}>{record.landOwnerRegisterNo}</Title>
        </>
      ),
    },
    {
      title: "DATE OF PLANTING",
      key: "date of planting",
      dataIndex: "date of planting",
      render: (index, record) => (
        <>
          <Title level={5}>{record.dateofPlanting}</Title>
        </>
      ),
    },
    {
      title: "AUDITOR ID",
      key: "auditor id",
      dataIndex: "auditor id",
      render: (index, record) => (
        <>
          <Title level={5}>{record.creatorID}</Title>
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
    // eetPlantedTreesslint-disable-next-time react-hook/exhaustive-deps
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
  return (
    <>
      <Content>
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Trees"
            >
              <Table
                dataSource={data}
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

      {/* Tree detail Modal  */}
      <Modal
        title="Tree Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
        width={1000}
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
