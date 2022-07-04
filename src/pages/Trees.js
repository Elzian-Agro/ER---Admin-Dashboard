import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { Table, Row, Col, Space } from "antd";
import service from "./../services/data-service";
import "antd/dist/antd.css";
import { Modal, Button, Card, Typography } from "antd";
import Map from "../components/map";

const { Title } = Typography;

const Trees = () => {
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  const [landOwnerName, setLandOwnerName] = useState();
  const [AuditorName, setAuditorName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const {
    getPlantedTrees,
    updatePlantedTree,
    deletePlantedTree,
    getLandOwnerById,
    getAuditorById,
  } = service();

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

  useEffect(async () => {
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
  }, []);

  useEffect(async () => {
    if (!modaldata) return;
    const landOwner = await getLandOwnerById(modaldata.landOwnerRegisterNo);
    const auditor = await getAuditorById(modaldata.creatorID);
    setLandOwnerName(landOwner);
    setAuditorName(auditor);
  }, [modaldata]);

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

  const handleUpdate = (treeID) => {
    updatePlantedTree(treeID);
  };

  const handleConfirmDelete = async () => {
    const res = await deletePlantedTree(treeID);
    console.log(res);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
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
            >
              <Table
                dataSource={data}
                columns={columns}
                onRow={(record, rowIndex) => {
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
          <Button type="primary" onClick={() => handleUpdate(treeID)}>
            Update
          </Button>,
          <Button type="danger" onClick={() => setIsDeleteModalVisible(true)}>
            Delete
          </Button>,
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
              <div>
                Tree ID : &nbsp;&nbsp;<b>{treeID}</b>
              </div>
              <div>
                Tree species : &nbsp;&nbsp;<b>{treeSpecies}</b>
              </div>
              <div>
                LifeForce Unit Tree No : &nbsp;&nbsp;
                <b>{lifeForceUnitTreeNo}</b>
              </div>
              <div>
                landOwner Register No : &nbsp;&nbsp;<b>{landOwnerRegisterNo}</b>
              </div>
              <div>
                landOwner ID : &nbsp;&nbsp;<b>{landOwnerID}</b>
              </div>
              <div>
                landOwner Name : &nbsp;&nbsp;<b>{landOwnerName}</b>
              </div>
              <div>
                Auditor ID : &nbsp;&nbsp;<b>{creatorID}</b>
              </div>
              {/* <div>Auditor ID : &nbsp;&nbsp;<b>{getAuditorById(creatorID)}</b></div> */}
              <div>
                Date of planting : &nbsp;&nbsp;<b>{dateofPlanting}</b>
              </div>
              <div>
                created At : &nbsp;&nbsp;<b>{createdAt}</b>
              </div>
            </Space>
          </Col>
        </Row>
      </Modal>

      {/* Delete Modal */}
      <Modal
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
    </>
  );
};

export default Trees;
