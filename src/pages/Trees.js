import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { Table, Row, Col } from "antd";
import axios from "axios";
import service from "./../services/data-service";
import "antd/dist/antd.css";
import {
  Modal,
  Button,
  Card,
  Form,
  Input,
  Typography,
  DatePicker,
  Space,
} from "antd";

import { MdEmail, MdPhone } from "react-icons/md";

import moment from "moment";

const { Title } = Typography;

const Trees = () => {
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState({});

  const { getTrees } = service();

  const columns = [
    {
      title: "REGISTRATION NUMBER",
      key: "register no",
      dataIndex: "register no",
      render: (index, record) => (
        <>
          <Title level={5}>
            {record.landOwnerRegisterNo}
          </Title>
        </>
      ),
    },
    {
      title: "LATITUDE",
      key: "latitude",
      dataIndex: "latitude",
      render: (index, record) => (
        <>
          <Title level={5}>{record.latitude}</Title>
        </>
      ),
    },
    {
      title: "LONGTITUDE",
      key: "longtitude",
      dataIndex: "longtitude",
      render: (index, record) => (
        <>
          <Title level={5}>{record.longitude}</Title>
        </>
      ),
    },
    {
      title: "TREEE SPECIE",
      key: "tree specie",
      dataIndex: "tree specie",
      render: (index, record) => (
        <>
          <Title level={5}>{record.treeSpecies}</Title>
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
    // {
    //   title: "Edit User",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (index, record) => (
    //     <Button
    //       type="primary"
    //       onClick={() => {
    //         // showModal(record);
    //       }}
    //     >
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  useEffect(async () => {
    const res = await getTrees();
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
  // };

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [setLoading] = useState(false);

  // const showModal = (record) => {
  //   console.log(record);
  //   setFullName(record.fullName);
  //   setmodaldata(record);
  //   console.log(modaldata, fullName);
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setIsModalVisible(false);
  //   }, 3000);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  console.log(data
    );
  return (
    <>
      <Content>
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Auditors"
            >
              <Table dataSource={data} columns={columns} />
            </Card>
          </Col>
        </Row>
      </Content>
      <Modal
        title="Update Auditor"
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button
            type="danger"
            onClick={() => {
              // handleDeleteClick(modaldata.id);
            }}
          >
            Delete Auditor
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            // onClick={() => handleUpdatelick(modaldata.id)}
          >
            Save
          </Button>,
        ]}
      >
        <Form {...layout}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="fullName"
              placeholder={modaldata.fullName}
              value={modaldata.fullName}
              onChange={(event) => {
                setmodaldata({
                  ...modaldata,
                  fullName: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="qualification"
            label="Qualification"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="qualification"
              placeholder={modaldata.qualification}
              value={modaldata.qualification}
              onChange={(event) => {
                setmodaldata({
                  ...modaldata,
                  qualification: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="contactNumber"
              placeholder={modaldata.contactNumber}
              value={modaldata.contactNumber}
              onChange={(event) => {
                setmodaldata({
                  ...modaldata,
                  contactNumber: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="email"
              placeholder={modaldata.email}
              value={modaldata.email}
              onChange={(event) => {
                setmodaldata({
                  ...modaldata,
                  email: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="address"
              placeholder={modaldata.address}
              value={modaldata.address}
              onChange={(event) => {
                setmodaldata({
                  ...modaldata,
                  address: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="type"
            label="User Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="type"
              placeholder={modaldata.type}
              value={modaldata.type}
              onChange={(event) => {
                setmodaldata({
                  ...modaldata,
                  type: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="dob"
            label="dob"
            rules={[
              {
                required: true,
              },
            ]}
          >
            {/* <Input type= "date" name="dob" placeholder={modaldata.DOB} value={modaldata.DOB}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      DOB: event.target.value
                    })
                  }}/> */}
            <Space direction="vertical">
              <DatePicker
                name="dob"
                value={moment(modaldata.DOB)}
                onChange={(date, datestring) => {
                  console.log(date.date());
                  setmodaldata({
                    ...modaldata,
                    DOB: datestring,
                  });
                }}
              />
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Trees;
