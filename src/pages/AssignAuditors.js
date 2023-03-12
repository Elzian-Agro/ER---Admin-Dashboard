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

import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Card, Form, Input, Avatar, Typography, Select, Space, Badge, Table, Row, Col, notification } from 'antd';

import { MdEmail, MdPhone } from "react-icons/md";
import { makeStyles } from "@mui/styles";

import { SearchOutlined } from "@ant-design/icons";

import useMediaQuery from '../components/customHooks/useMediaQuery';
import AssignAuditorServices from "../services/assign-auditor-service";

const { Title } = Typography;

const useStyles = makeStyles({
  headerSearch: {
    width: "220px",
    borderRadius: "7px",
    marginRight: "10px",
    marginLeft: "10px"
  }
});
const styles={
  preventInlineText:{
    whiteSpace:'pre-line',
  }
}



/*
  This Function is created for display AssignAuditor data
  Usage: web application
*/
const AssignAuditors = () => {

  const { Option } = Select;
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [auditorData, setAuditorData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  const [getAuditorId, setGetAuditorId] = useState("");
  const {getLandOwnersGapCreateLastAuditorDate,getusers,assigningAuditors}= AssignAuditorServices()
  const [currentDate,setCurrentDate]=useState();
  const match=useMediaQuery('(max-width: 991px)')

  const getDifferenceOfDates = (assignDate,currentDate) => {
    const date1 = new Date(assignDate);
    const date2 = new Date(currentDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  
  const columns = [
    {
      title: "LAND OWNER NAME / CONTACT",
      render: (record) => (
        <React.Fragment>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={null}
            ></Avatar>
            <div className="avatar-info">
              <Title style={styles.preventInlineText} level={5}>{record.landOwnerFullname}</Title>
              <p >{record.registerNumber}</p>
            </div>
          </Avatar.Group>
          <br /> <br />
          <Title style={styles.preventInlineText} level={5} > <MdPhone /> {record.contactNumber}</Title>
          <Title style={styles.preventInlineText} level={5} > <MdEmail /> {record.email}</Title>
        </React.Fragment>
      ),
      responsive: ["xs"]
    },
    {
      title: "ASSIGN AUDITOR",
      render: (record) => (
        <React.Fragment>
          <Title style={styles.preventInlineText} level={5}> <Badge status="success" /> {record.assignAuditorname}</Title>
          <p style={{fontSize:'12px',whiteSpace:'pre-line'}}> {record.assignAuditorid}</p>
          <br />
          <Button type="primary" onClick={() => {
          showModal(record)
        }}>
          Assign
        </Button>
        </React.Fragment>
      ),
      responsive: ["xs"]
    },


    /*
      This is Assign Auditors table 
      Usage:- Web application     
    */ 
    {
      title: "Land Owner Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (index, record) => (
        <>
          <Avatar.Group>
            <div style={{height:'40px',width:'40px',margin:'10px'}}>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={null}
            ></Avatar>
            </div>
            
            <div className="avatar-info">
              <Title style={styles.preventInlineText} level={5}>{record.landOwnerFullname}</Title>
              <p style={styles.preventInlineText} >{record.registerNumber}</p>
            </div>
          </Avatar.Group>
        </>
      ),
      responsive: ["sm"]
    },

    {
      title: "Contact Number",
      key: "contact",
      dataIndex: "contact",
      width: "15%",
      render: (index, record) => (
        <>
          <Title style={styles.preventInlineText} level={5} > <MdPhone /> {record.contactNumber}</Title>
          <Title style={styles.preventInlineText} level={5} > <MdEmail /> {record.email}</Title>
        </>
      ),
      responsive: ["sm"]
    },
    {
      title: "Land Address",
      key: "address",
      dataIndex: "address",
      width: "15%",
      render: (index, record) => (
        <>
          <Title style={styles.preventInlineText} level={5}>{record.landAddress}</Title>
        </>
      ),
      hidden: match,
    },
    {
      title: "Assinged Auditors",
      key: "aname",
      dataIndex: "aname",
      width: "15%",
      render: (index, record) => (
        <>
          <Title style={styles.preventInlineText} level={5}> 
          {record.auditedOrNot===0 && getDifferenceOfDates(record.assignDate, currentDate) > 90 
            ? <Badge status="error" />
              : record.auditedOrNot===0 && getDifferenceOfDates(record.assignDate, currentDate) > 60
                ? <Badge status="warning" /> 
                  : record.auditedOrNot===0 && getDifferenceOfDates(record.assignDate, currentDate) < 60
                    && <Badge status="success" />}  
          {record.assignAuditorname}
          </Title>
          <p style={{ fontSize: '12px', whiteSpace: 'pre-line' }}> {record.assignAuditorid}</p>
        </>
      ),
      responsive: ["sm"]
    },
    {
      title: 'Assign Auditor',
      dataIndex: 'id',
      key: 'id',
      width: "15%",
      render: (index, record) => (
        <Button type="primary" onClick={() => {
          showModal(record)
        }}>
          Assign
        </Button>
      ),
      responsive: ["sm"]
    },
  ].filter(item => !item.hidden);

  useEffect(() => {
    const getCurrentDateTime = () => {
      let today = new Date().toISOString().slice(0, 10);
      setCurrentDate(today)
    };
    getDifferenceOfDates()
    getCurrentDateTime();
    getData();
    getAuditorData();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // map the data
  const getData = async () => {
    const res = await getLandOwnersGapCreateLastAuditorDate();
    setdata(
      res.data.Result.map((row) => ({
        id: row.landOwnerID,
        landOwnerFullname: row.landOwnerFullname,
        landOwnerName: row.landOwnerName,
        registerNumber: row.registerNumber,
        contactNumber: row.contactNumber,
        email: row.email,
        landAddress: row.landAddress,
        assignAuditorid: row.userID,
        assignAuditorname: row.fullName,
        assignDate:row.assignDate,
        auditedOrNot:row.auditedOrNot

      }))
    );
    setTableData(res.data.Result.map((row) => ({
      id: row.landOwnerID,
      landOwnerFullname: row.landOwnerFullname,
      landOwnerName: row.landOwnerName,
      registerNumber: row.registerNumber,
      contactNumber: row.contactNumber,
      email: row.email,
      landAddress: row.landAddress,
      assignAuditorid: row.userID,
      assignAuditorname: row.fullName,
      assignDate:row.assignDate,
      auditedOrNot:row.auditedOrNot
    })));
  };

  const getAuditorData = async () => {
  
    const res = await getusers();
    setAuditorData(
      res.data.Result.map((auditor) => ({
        id: auditor.userID,
        fullName: auditor.fullName,
      }))
    );
  };

  const openNotificationWithIcon = (type,message,title) => {

    if(type==="success"){
      notification[type]({
        message: title,
        description:"Auditor Id : "+message,
      });
    }else{
      notification[type]({
        message: title,
        description:message,
      });
    }
    
  };



  // assign auditor
  const updateAssignAuditorId = async (auditorId, id) => {
  
    if (auditorId !== '' && id !=='') {
      try {
       const response= await assigningAuditors(id,auditorId)
        if (response.status === 200) {
          openNotificationWithIcon('success',auditorId,"successfully assigned !")
          getData()
        }
      } catch (err) {
        if (err) { openNotificationWithIcon('Error',"Error in assigning ","Error")} 
      }
    } else {openNotificationWithIcon('warning',"Please select a auditor !","Warning")}
  }



  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setLoading] = useState(false);

  const showModal = (record) => {
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
    setGetAuditorId("");
    setIsModalVisible(false);
  };

  const handleonChange = (e) => {
    const searchKey = e.target.value.toLowerCase();

    if (searchKey === '') {
      setdata(tableData);
    } else {
      const filteredData = tableData.filter(item => {
        return (item.landOwnerFullname.toLowerCase().includes(searchKey) ||
          item.registerNumber.toLowerCase().includes(searchKey) ||
          item.email.toLowerCase().includes(searchKey)
        );
      })
      setdata(filteredData);
    }
  };



  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col  xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Assign Auditors"
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
                <Table scroll={{y:375}}  className="table-responsive" rowKey={data => data.id} dataSource={data} columns={columns} />
              </div> 
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Assign Auditor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose

        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => { updateAssignAuditorId(getAuditorId, modaldata.id) }} >
            Assign
          </Button>,

        ]}
      >
        

        {/* 
            This part display pop-up window
            Usage:- web apllication
        */}
        <Row gutter={[20, 20]}>
          <Col offset={3} md={25} xs={24}>
            <Space direction="vertical">
              <div>
                Land Owner Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{modaldata.landOwnerFullname}</b>
              </div>
              <div>
                Register Number : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{modaldata.registerNumber}</b>
              </div>
              <div>
                Contact Number : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{modaldata.contactNumber}</b>
              </div>
              <div>
                Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{modaldata.email}</b>
              </div>
              <div>
                Address : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{modaldata.landAddress}</b>
              </div>
              <Form>
                <Form.Item
                  name="landOwnerName"
                  label="Auditor"

                  rules={[
                    {
                      whitespace: true
                    },
                  ]}
                >
                  <Select
                    name="auditorName"
                    onChange={(value) => {
                      setGetAuditorId(value);
                      setmodaldata({
                        ...modaldata
                        //landOwnerFullname: value
                      })
                    }

                    }
                  >
                    {auditorData && auditorData.map((auditor, key) => {
                      return (
                        <Option value={auditor.id} key={key} > {auditor.fullName} - {modaldata.landOwnerFullname}</Option>
                      )
                    })
                    }
                  </Select>
                </Form.Item>
              </Form>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AssignAuditors;