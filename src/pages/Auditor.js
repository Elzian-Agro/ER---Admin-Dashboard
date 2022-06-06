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

import React , {useState , useEffect } from 'react'
import { Content } from 'antd/lib/layout/layout';
import { Table, Row, Col } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Modal, Button, Card, Form, Input, Avatar, Typography } from 'antd';

import { MdEmail, MdPhone }  from "react-icons/md";

const { Title } = Typography;

const Auditor = () =>{
  const [data, setdata] = useState([]);
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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const headers = {
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NTU1NTEzfQ.Kv2cEkCU-F9w_Gd_ajB2zfiUW66G6WPg7dPznedIRC0',
    };
    
    const res = await axios.get(`http://127.0.0.1:3000/users`, {headers});
    console.log(res)
    setdata(
      res.data.Result.map((row) => ({
        id: row.userID,
        fullName: row.fullName,
        qualification: row.qualification,
        imageUri: row.imageUri,
        contactNumber: row.contactNumber,
        email: row.email,
        address: row.address,
        type: row.userType,
        userName: row.userName,
        DOB: row.DOB,
      }))
    );
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName,setFullName] = useState("");

  const showModal = (record) => {
    console.log(record);
    setFullName(record.fullName);
    setmodaldata(record);
    console.log(modaldata, fullName);
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
    const headers = {
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NTU1NTEzfQ.Kv2cEkCU-F9w_Gd_ajB2zfiUW66G6WPg7dPznedIRC0',
    };
    axios.delete(
      `http://localhost:3000/feeds/deleteUser/${auditorID}`
    ).then((req,res) => {
      setIsModalVisible(false)
    });
  };

  const handleUpdatelick = (auditorID) => {
    console.log(auditorID)
    const headers = {
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUwNTU5NDExfQ.-uL0RCokz4AuN0eozRI_SP4jmz58p2bA41vpBAYlLQo',
    };

    const user = {
      "userName": modaldata.userName,
      "email": modaldata.email,
      "fullName": modaldata.fullName,
      "imageUri": modaldata.imageUri,
      "address": modaldata.address,
      "contactNumber": modaldata.contactNumber,
      "DOB": modaldata.DOB,
      "qualification": modaldata.qualification
  }

    axios.put(
      `http://127.0.0.1:3000/users/updateUser/${auditorID}`,user,{headers}
    ).then((req,res) => {
      setIsModalVisible(false)
    });
  };

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
                  // initialValues={{
                  //   modifier: 'public',
                  // }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input name="fullName" placeholder={modaldata.fullName} value={modaldata.fullName}
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
                    },
                  ]}
                >
                  <Input name="qualification" placeholder={modaldata.qualification} value={modaldata.qualification}
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
                    },
                  ]}
                >
                  <Input name="contactNumber" placeholder={modaldata.contactNumber} value={modaldata.contactNumber}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      contactNumber: event.target.value
                    })
                  }}/>
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
                  <Input name="email" placeholder={modaldata.email} value={modaldata.email}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      email: event.target.value
                    })
                  }}/>
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
                  <Input name="address" placeholder={modaldata.address} value={modaldata.address}
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
                    },
                  ]}
                >
                  <Input name="type" placeholder={modaldata.type} value={modaldata.type}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      type: event.target.value
                    })
                  }}
                  />
                </Form.Item>
              </Form>
      </Modal>
      </>
  );
};

export default Auditor;






















// import { useState, useEffect } from "react"
// import axios from "axios";
// import {
//     Row,
//     Col,
//     Card,
//     Table,
//     Avatar,
//     Typography,
//     Modal,
//     Button,
//     Form,
//     Input,
//   } from "antd";

//   import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
//   import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
//   import Grid from "@mui/material/Grid";
  
  
//   const { Title } = Typography;
  
//   // table code start
//   const columns = [
//     {
//       title: "AUDITOR NAME",
//       dataIndex: "name",
//       key: "name",
//       width: "22%",
//     },
  
//     {
//       title: "CONTACT NUMBER",
//       key: "contact",
//       dataIndex: "contact",
//     },
//     {
//       title: "ADDRESS",
//       key: "address",
//       dataIndex: "address",
//     },
//       {
//         title: "USER TYPE",
//         key: "type",
//         dataIndex: "type",
//       },
//     //   {
//     //     title: "",
//     //     key: "action",
//     //     dataIndex: "action",
//     //   },
//   ];
  
//   const rows = [];
  
//   function Auditor() {
//     const [data, setData] = useState([]);
//     const [modaldata, setmodaldata] = useState([]);
//     const { Meta } = Card;

//     const setRows = (data) => {
//         data.forEach((item,index) => {
//             let object = {
//                 key: index,
//                 name: (
//                   <>
//                     <Avatar.Group>
//                       <Avatar
//                         className="shape-avatar"
//                         shape="square"
//                         size={40}
//                         src={item.imageUri}
//                       ></Avatar>
//                     <div className="avatar-info">
//                         <Title level={5}>{item.fullName}</Title>
//                         <p>{item.qualification}</p>
//                     </div>
//                     </Avatar.Group>
//                   </>
//                 ),
            
//                 contact: (
//                   <>
//                     <div className="author-info">
//                       <CallOutlinedIcon />
//                       <Title level={5}>{item.contactNumber}</Title>
//                       <EmailOutlinedIcon />
//                       <Title level={5}>{item.email}</Title>
//                     </div>
//                   </>
//                 ),
//                 address: (
//                   <>
//                     <div className="ant-employed">
//                     <Title level={5}>{item.address}</Title>
//                     </div>
//                   </>
//                 ),
//                 type: (
//                     <>
//                       <div className="ant-employed">
//                       <Title level={5}>{item.userType}</Title>
//                       <Button type="primary" className="tag-primary" onClick={showModal}>
//                         Edit
//                       </Button>
//                       </div>
//                     </>
//                 ),
//               };

//               rows.push(object);
//         })
//     }

//     useEffect(() => {
//     const headers = {
//         'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NTU1NTEzfQ.Kv2cEkCU-F9w_Gd_ajB2zfiUW66G6WPg7dPznedIRC0',
//       };
      
//     axios.get('http://127.0.0.1:3000/users/', {headers})
//     .then((res) => {
//         setData(res.data);
//         console.log(res.data);
//         setRows(res.data.Result);
//     })
//     .catch((error) => {
//         console.error(error)
//         console.log('check err')
//     })
    
//      }, []);

//      const [isModalVisible, setIsModalVisible] = useState(false);

//      const showModal = (record) => {
//        console.log(record);
//        setmodaldata(record);
//        setIsModalVisible(true);
//      };
   
//      const handleOk = () => {
//        setIsModalVisible(false);
//      };
   
//      const handleCancel = () => {
//        setIsModalVisible(false);
//      };
   
  
//     return (
//       <>
//         <div className="tabled">
//           <Row gutter={[24, 0]}>
//             <Col xs="24" xl={24}>
//               <Card
//                 bordered={false}
//                 className="criclebox tablespace mb-24"
//                 title="Auditors"
//               >
//                 <div className="table-responsive">
//                   <Table
//                     columns={columns}
//                     dataSource={rows}
//                     pagination={false}
//                   />
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//         <Modal
//         title="Basic Modal"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <p>Name: vjhbk</p>
//         <p>Email: vjh</p>
//         <p>Address:yujvhkb</p>
//       </Modal>
//       </>
//     );
//   }
  
//   export default Auditor;