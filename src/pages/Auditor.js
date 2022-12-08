import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Modal,
  Button,
  Card,
  Form,
  Input,
  Avatar,
  Typography,
  Select,
  Table,
  Row,
  Col,
} from "antd";

import { MdEmail, MdPhone } from "react-icons/md";
import { makeStyles } from "@mui/styles";

import service from "./../services/auditor-service";

import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

const useStyles = makeStyles({
  headerSearch: {
    width: "220px",
    borderRadius: "7px",
    marginRight: "10px",
    marginLeft: "10px",
  },
});

const Auditor = () => {
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  const [form] = Form.useForm();

  //Add new consts here
  const [fullname, setFullName] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [contactNumber, setContactNumber] = useState([]);
  const [address, setAdress] = useState([]);

  const columns = [
    {
      title: "Auditor Name",
      dataIndex: "name",
      key: "name",
      width: "22%",
      render: (index, record) => (
        <>
          <Avatar.Group key={index}>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={record.imageUri}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{record.fullName}</Title>
              <p>{record.qualification}</p>
            </div>
          </Avatar.Group>
        </>
      ),
    },

    {
      title: "Contact Number",
      key: "contact",
      dataIndex: "contact",
      render: (index, record) => (
        <>
          <div key={index}>
            <Title level={5}>
              {" "}
              <MdPhone /> {record.contactNumber}
            </Title>
            <Title level={5}>
              {" "}
              <MdEmail /> {record.email}
            </Title>
          </div>
        </>
      ),
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (index, record) => (
        <>
          <Title level={5} key={index}>
            {record.address}
          </Title>
        </>
      ),
    },
    {
      title: "User Type",
      key: "type",
      dataIndex: "type",
      render: (index, record) => (
        <>
          <Title level={5} key={index}>
            {record.type}
          </Title>
        </>
      ),
    },
    {
      title: "Edit User",
      dataIndex: "id",
      key: "id",
      render: (index, record) => (
        <Button
          key={index}
          type="primary"
          onClick={() => {
            showModal(record);

            form.setFieldsValue({
              id: record.id,
              fullName: record.fullName,
              qualification: record.qualification,
              imageUri: record.imageUri,
              contactNumber: record.contactNumber,
              email: record.email,
              address: record.address,
              userType: record.type,
            });
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const { getAuditors, updateAuditors, deleteAuditors } = service();

  const getData = async () => {
    const res = await getAuditors();
    setAllData(res);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAllData = (res) => {
    setdata(
      res.map((row) => ({
        key: row.userID,
        id: row.userID,
        fullName: row.fullName,
        qualification: row.qualification,
        imageUri: row.imageUri,
        contactNumber: row.contactNumber,
        email: row.email,
        address: row.address,
        type: row.userType,
      }))
    );
    setTableData(
      res.map((row) => ({
        key: row.userID,
        id: row.userID,
        fullName: row.fullName,
        qualification: row.qualification,
        imageUri: row.imageUri,
        contactNumber: row.contactNumber,
        email: row.email,
        address: row.address,
        type: row.userType,
      }))
    );
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  };

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

  const handleDeleteClick = (auditorID) => {
    deleteAuditors(auditorID);
    getData();
    setIsModalVisible(false);
  };

  const handleUpdatelick = (auditorID) => {
    const user = {
      id: modaldata.id,
      fullName: modaldata.fullName,
      qualification: modaldata.qualification,
      imageUri: modaldata.imageUri,
      contactNumber: modaldata.contactNumber.toString(),
      email: modaldata.email,
      address: modaldata.address,
      userType: modaldata.type.toString(),
    };

    updateAuditors(user);
    getData();
    setIsModalVisible(false);
  };

  const handleonChange = (e) => {
    const searchKey = e.target.value.toLowerCase();

    if (searchKey === "") {
      setdata(tableData);
    } else {
      const filteredData = tableData.filter((item) => {
        return (
          item.fullName.toLowerCase().includes(searchKey) ||
          item.qualification.toLowerCase().includes(searchKey) ||
          item.contactNumber.toLowerCase().includes(searchKey) ||
          item.email.toLowerCase().includes(searchKey) ||
          item.address.toLowerCase().includes(searchKey)
        );
      });
      console.log(filteredData);
      setdata(filteredData);
    }
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Auditors"
              extra={
                <>
                  <Input
                    className={classes.headerSearch}
                    placeholder="Search here..."
                    prefix={<SearchOutlined />}
                    onChange={handleonChange}
                  />
                </>
              }
            >
              <div className="table-responsive">
                <Table dataSource={data} columns={columns} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title="Update Auditor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button
            type="danger"
            onClick={() => {
              handleDeleteClick(modaldata.id);
            }}
          >
            Delete Auditor
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            disabled={!fullname || !qualification || !contactNumber || !address}
            key="submit"
            type="primary"
            onClick={() => handleUpdatelick(modaldata.id)}
          >
            Save
          </Button>,
        ]}
      >
        <Form {...layout} form={form}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter the name",
              },
              {
                whitespace: true,
              },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input
              name="fullName"
              onChange={(event) => {
                setFullName(event.target.value);
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
                message: "Please enter the qualification",
              },
              {
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input
              name="qualification"
              onChange={(event) => {
                setQualification(event.target.value);
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
                message: "Please enter the Contact number",
              },
              {
                whitespace: true,
              },
              { min: 10 },
              { max: 10 },
            ]}
            hasFeedback
          >
            <Input
              name="contactNumber"
              type='number'
              onChange={(event) => {
                setContactNumber(event.target.value);
                setmodaldata({
                  ...modaldata,
                  contactNumber: event.target.value.toString(),
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
                message: "Please enter the address",
              },
              {
                whitespace: true,
              },
              { min: 5 },
            ]}
            hasFeedback
          >
            <Input
              name="address"
              onChange={(event) => {
                setAdress(event.target.value);
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
                message: "Please enter the user type",
              },
              {
                whitespace: true,
              },
            ]}
          >
            <Select
              name="type"
              placeholder={modaldata.type}
              onChange={(value) => {
                setmodaldata({
                  ...modaldata,
                  type: value,
                });
              }}
            >
              <Select.Option value="Auditor">Auditor</Select.Option>
              <Select.Option value="Field Agent">Field Agent</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Auditor;
