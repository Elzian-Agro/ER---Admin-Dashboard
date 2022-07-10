import React , {useState , useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Card, Form, Input, Avatar, Typography, Select, Table, Row, Col } from 'antd';

import { MdEmail, MdPhone }  from "react-icons/md";
import { makeStyles } from "@mui/styles";

import service from "./../services/auditor-service";

import {
  SearchOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const useStyles = makeStyles({
  headerSearch: {
    width: "220px",
    borderRadius: "7px",
    marginRight: "10px",
    marginLeft: "10px"
  }
});


const Auditor = () =>{
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modaldata, setmodaldata] = useState({});

  const columns = [
    {
      title: "AUDITOR NAME",
      dataIndex: "name",
      key: "name",
      width: "22%",
      render: (index, record) => (
        <>
                    <Avatar.Group>
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
      title: "CONTACT NUMBER",
      key: "contact",
      dataIndex: "contact",
      render: (index, record) => (
        <>
            <Title level={5}> <MdPhone /> {record.contactNumber}</Title>
            <Title level={5}> <MdEmail /> {record.email}</Title>
        </>
      ),
    },
    {
      title: "ADDRESS",
      key: "address",
      dataIndex: "address",
      render: (index, record) => (
        <>
            <Title level={5}>{record.address}</Title>
        </>
      ),
    },
      {
        title: "USER TYPE",
        key: "type",
        dataIndex: "type",
        render: (index, record) => (
          <>
              <Title level={5}>{record.type}</Title>
          </>
        ),
      },
    {
      title: 'Edit User',
      dataIndex: 'id',
      key: 'id',
      render: (index, record) => (
        <Button type="primary" onClick={() => {
          showModal(record)
          }}>
          Edit
        </Button>
      ),
    },
  ];

  const {
    getAuditors,
    updateAuditors,
    deleteAuditors,
  } = service();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getAuditors();
    setdata(
      res.map((row) => ({
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
    setTableData(res.map((row) => ({
      id: row.userID,
      fullName: row.fullName,
      qualification: row.qualification,
      imageUri: row.imageUri,
      contactNumber: row.contactNumber,
      email: row.email,
      address: row.address,
      type: row.userType,
    })));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setLoading] = useState(false);

  const [fullName,setFullName] = useState("");

  const showModal = (record) => {
    setFullName(record.fullName);
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
  }

  updateAuditors(user);
  getData();
  setIsModalVisible(false);

  };

  const handleonChange = (e) => {
    const searchKey = e.target.value.toLowerCase();
    
    if (searchKey === '') {
      setdata(tableData);
    } else {
      const filteredData = tableData.filter(item =>{
          return (item.fullName.toLowerCase().includes(searchKey) ||
                  item.qualification.toLowerCase().includes(searchKey) ||
                  item.contactNumber.toLowerCase().includes(searchKey) ||
                  item.email.toLowerCase().includes(searchKey) ||
                  item.address.toLowerCase().includes(searchKey)
                  );
        })
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
            <Table dataSource={data} columns={columns}/>
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
          <Button type="danger" onClick={() => {handleDeleteClick(modaldata.id)}}>
            Delete Auditor
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleUpdatelick(modaldata.id)}>
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
                      message: "Please enter the name",
                    },
                    {
                      whitespace: true
                    },
                    { min: 3},
                  ]}
                  hasFeedback
                >
                  <Input name="fullName" placeholder={modaldata.fullName} defaultValue={modaldata.fullName}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      fullName: event.target.value
                    })
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
                      whitespace: true
                    },
                  ]}
                  hasFeedback
                >
                  <Input name="qualification" placeholder={modaldata.qualification} defaultValue={modaldata.qualification}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      qualification: event.target.value
                    })
                  }}/>
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
                      whitespace: true
                    },
                    { min: 10},
                    { max: 10},
                  ]}
                  hasFeedback
                >
                  <Input name="contactNumber" placeholder={modaldata.contactNumber} defaultValue={modaldata.contactNumber}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      contactNumber: event.target.value.toString()
                    })
                  }}/>
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
                      whitespace: true
                    },
                    { min: 5},
                  ]}
                  hasFeedback
                >
                  <Input name="address" placeholder={modaldata.address} defaultValue={modaldata.address}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      address: event.target.value
                    })
                  }}/>
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
                      whitespace: true
                    },
                  ]}
                >
                  <Select
                    name="type"
                    placeholder={modaldata.type}
                    onChange={(value) => {
                      setmodaldata({
                        ...modaldata,
                        type: value
                      })
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