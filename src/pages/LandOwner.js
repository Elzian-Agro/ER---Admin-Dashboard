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
  Image,
  Space,
} from "antd";

import { MdEmail, MdPerson, MdPhone } from "react-icons/md";
import { makeStyles } from "@mui/styles";

import service from "./../services/landowner-service";

import { SearchOutlined } from "@ant-design/icons";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const { Title } = Typography;

const useStyles = makeStyles({
  headerSearch: {
    width: "220px",
    borderRadius: "7px",
    marginRight: "10px",
    marginLeft: "10px",
  },
});

function LandOwner(){
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  const [selectedId, setSelectedId] = useState("");
  const [form] = Form.useForm();

  //Add new consts here
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updateLandOwnerName, setUpdateLandOwnerName] = useState("");
  const [updateLandOwnerFullName, setUpdateLandOwnerFullName] = useState("");
  const [updateContactNumber, setUpdateLandONContact] = useState("");
  const [updateCountry, setUpdateCountry] = useState("");
  const [updateLandAddress, setUpdateLandAddress] = useState("");
  const [updateLongitude, setUpdateLongitude] = useState("");
  const [updateLatitude, setUpdateLatitude] = useState("");
  const [updateBankAccountNumber, setUpdateBankAccountNumber] = useState("");
  const [updateBankName, setUpdateBankName] = useState("");
  const [updateBankBranch, setUpdateBankBranch] = useState("");
  const [searchLandOwner, setSearchLandOwner] = useState("");
  const [deleteFeed, setDeleteFeed] = useState(false);

  const {
    getLandOwners,
    deleteLandOwnerById,
    updateLandOwnerById,
    approveLandOwnerById,
    unApproveLandOwnerById,
    getLandOwnerById,
  } = service();

  const columns = [
    {
      title: "Register Number",
      dataIndex: "number",
      key: "number",
      width: "22%",
      render: (index, record) => (
        <>
          <Avatar.Group key={index}>
            <div className="avatar-info">
              <Title level={5}>{record.registerNumber}</Title>
            </div>
          </Avatar.Group>
        </>
      ),
    },

    {
      title: "Land Owner Name",
      key: "Name",
      dataIndex: "Name",
      render: (index, record) => (
        <>
          <div key={index}>
            <Title level={5}>
              {" "}
              <MdPerson /> {record.landOwnerName}
            </Title>
          </div>
        </>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      dataIndex: "contact",
      render: (index, record) => (
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
      ),
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (index, record) => (
        <>
          <Title level={5} key={index}>
            {record.landAddress}
          </Title>
        </>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (index, record) => (
        <>
          <Title level={5} key={index}>
            {record.country}
          </Title>
        </>
      ),
    },
  ];

  const { getAuditors, updateAuditors, deleteAuditors } = service();

  const getData = async () => {
    const res = await getLandOwners();
    console.log(res)
    console.log("get data ")
    setdata(
      res.map((row) => ({
        key: row.landOwnerID,
        landOwnerID: row.landOwnerID,
        profImage : row.profImage,
        qrImage : row.qrImage,
        landOwnerName: row.landOwnerName,
        registerNumber: row.registerNumber,
        contactNumber: row.contactNumber,
        landAddress: row.landAddress,
        country: row.country,
        email: row.email,
        validated: row.validated,
        landOwnerFullname: row.landOwnerFullname,
        longitude: row.longitude,
        latitude: row.latitude,
        bankAccountNumber: row.bankAccountNumber,
        bankName: row.bankName,
        bankBranch: row.bankBranch,
      }))
    );
    setTableData(
      res.map((row) => ({
        key: row.landOwnerID,
        landOwnerID: row.landOwnerID,
        profImage : row.profImage,
        qrImage : row.qrImage,
        landOwnerName: row.landOwnerName,
        registerNumber: row.registerNumber,
        contactNumber: row.contactNumber,
        landAddress: row.landAddress,
        country: row.country,
        email: row.email,
        validated: row.validated,
        landOwnerFullname: row.landOwnerFullname,
        longitude: row.longitude,
        latitude: row.latitude,
        bankAccountNumber: row.bankAccountNumber,
        bankName: row.bankName,
        bankBranch: row.bankBranch,
      }))
    );
    //await setAllData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  // const setAllData = (res) => {
  //   setdata(
  //     res.map((row) => ({
  //       key: row.landOwnerID,
  //       landOwnerID: row.landOwnerID,
  //       profImage : row.profImage,
  //       qrImage : row.qrImage,
  //       landOwnerName: row.landOwnerName,
  //       registerNumber: row.registerNumber,
  //       contactNumber: row.contactNumber,
  //       landAddress: row.landAddress,
  //       country: row.country,
  //       email: row.email,
  //       validated: row.validated,
  //       landOwnerFullname: row.landOwnerFullname,
  //       longitude: row.longitude,
  //       latitude: row.latitude,
  //       bankAccountNumber: row.bankAccountNumber,
  //       bankName: row.bankName,
  //       bankBranch: row.bankBranch,
  //     }))
  //   );
  //   setTableData(
  //     res.map((row) => ({
  //       key: row.landOwnerID,
  //       landOwnerID: row.landOwnerID,
  //       profImage : row.profImage,
  //       qrImage : row.qrImage,
  //       landOwnerName: row.landOwnerName,
  //       registerNumber: row.registerNumber,
  //       contactNumber: row.contactNumber,
  //       landAddress: row.landAddress,
  //       country: row.country,
  //       email: row.email,
  //       validated: row.validated,
  //       landOwnerFullname: row.landOwnerFullname,
  //       longitude: row.longitude,
  //       latitude: row.latitude,
  //       bankAccountNumber: row.bankAccountNumber,
  //       bankName: row.bankName,
  //       bankBranch: row.bankBranch,
  //     }))
  //   );
  // };
  
  const approveLandOwner = async (selectedId_) => {
    try {
      await approveLandOwnerById(selectedId_);
      console.log(`${selectedId} landOwners approved`);
      getData();
      setApprove();
    } catch (error) {
      console.log(error);
    }
  };

  const setApprove = async ()=>{
    const res = await getLandOwnerById(selectedId);
      setmodaldata(res.data.Result[0]);
  }

  const unApproveLandOwner = async (selectedId_) => {
    try {
      await unApproveLandOwnerById(selectedId_);
      console.log(`${selectedId} landOwners Unapproved`);
      getData();
      setApprove();
    } catch (error) {
      console.log(error);
    }
  };

  async function handleApprove(row) {
    if (row.validated === 1) {
      await unApproveLandOwner(row.landOwnerID);
    } else {
      await approveLandOwner(row.landOwnerID);
    }
  }

  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
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

  const handleDeleteClick = async () => {
    try {
      await deleteLandOwnerById(selectedId);
      setDeleteFeed(false);
      setIsModalVisible(false);
      getData();
    } catch (error) {
      setDeleteFeed(false);
      setIsModalVisible(false);
      getData();
    }
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdateClick = async () => {
    const landData = {
      landOwnerName: updateLandOwnerName,
      landOwnerFullname: updateLandOwnerFullName,
      contactNumber: updateContactNumber.toString(),
      country: updateCountry,
      landAddress: updateLandAddress,
      longitude: updateLongitude,
      latitude: updateLatitude,
      bankAccountNumber: updateBankAccountNumber,
      bankName: updateBankName,
      bankBranch: updateBankBranch,
    };

    try {
      console.log(selectedId)
      console.log(landData)
      await updateLandOwnerById(selectedId, landData);
      setIsUpdateModalVisible(false);
      setApprove();
    } catch (error) {
      setIsUpdateModalVisible(false);
      setApprove();
    }
  };


  

  const handleonChange = (e) => {
    const searchKey = e.target.value.toLowerCase();

    if (searchKey === "") {
      setdata(tableData);
    } else {
      const filteredData = tableData.filter((item) => {
        return (
          item.registerNumber.toLowerCase().includes(searchKey) ||
          item.landOwnerName.toLowerCase().includes(searchKey) ||
          item.contactNumber.toLowerCase().includes(searchKey) ||
          item.email.toLowerCase().includes(searchKey) ||
          item.landAddress.toLowerCase().includes(searchKey)
        );
      });
      console.log(filteredData);
      setdata(filteredData);
    }
  };

  // const downloadFile = (props) => {
  //   window.location.href = props
  // }
  const download = (e) => {
    console.log(e.target.href);
    console.log(modaldata.landOwnerName);
    fetch(modaldata.qrImage, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download",`${modaldata.landOwnerName} QRCode.png`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
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
                <Table dataSource={data} columns={columns} onRow={(record) => {
                  return {
                    onClick: () => {
                      //setmodaldata(record);
                      setSelectedId(record.landOwnerID);
                      showModal(record);
                      form.setFieldsValue({
                        key: record.landOwnerID,
                        id: record.landOwnerID,
                        profImage : record.profImage,
                        landOwnerName: record.landOwnerName,
                        registerNumber: record.registerNumber,
                        contactNumber: record.contactNumber,
                        landAddress: record.landAddress,
                        country: record.country,
                        email: record.email,
                        validated: record.validated,
                      });
                    },
                  };
                }}/>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title="Land Owner"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        destroyOnClose
        footer={[
          <Button
                type="primary"
                          // button background color change
                style={{ backgroundColor: modaldata.validated === 0 ? "#00e600" : "	#e6ac00"          
                }}
                  onClick={() => {
                  handleApprove(modaldata);
                  }}
                
              
                  >
                  {modaldata.validated === 0 ? "Approve" : "UnApprove"}
                  </Button>,
                   <Button
                   className={classes.featuredButton}
                   type="primary"
                   onClick={() => {
                     showUpdateModal();
                     //setSelectedId(modaldata.landOwnerID);
                     setUpdateLandOwnerName(modaldata.landOwnerName);
                     setUpdateLandOwnerFullName(modaldata.landOwnerFullname);
                     setUpdateLandONContact(modaldata.contactNumber);
                     setUpdateCountry(modaldata.country);
                     setUpdateLandAddress(modaldata.landAddress);
                     setUpdateBankName(modaldata.bankName);
                     setUpdateBankAccountNumber(modaldata.bankAccountNumber);
                     setUpdateBankBranch(modaldata.bankBranch);
                     setUpdateLongitude(modaldata.longitude);
                     setUpdateLatitude(modaldata.latitude);

                     form.setFieldsValue({
                       updateLandOwnerName: modaldata.landOwnerName,
                       updateLandOwnerFullName: modaldata.landOwnerFullname,
                       updateContactNumber: modaldata.contactNumber,
                       updateCountry: modaldata.country,
                       updateLandAddress: modaldata.landAddress,
                       updateBankName: modaldata.bankName,
                       updateBankAccountNumber: modaldata.bankAccountNumber,
                       updateBankBranch: modaldata.bankBranch,
                       updateLongitude: modaldata.longitude,
                       updateLatitude: modaldata.latitude,
                     });
                   }}
                 >
                   Edit
                 </Button>,
          
          // <Button
          //   disabled={!fullname || !qualification || !contactNumber || !address}
          //   key="submit"
          //   type="primary"
          //   onClick={() => handleUpdatelick(modaldata.landOwnerID)}
          // >
          //   Save
          // </Button>,
          <Button
          //className={classes.featuredButton}
          type="primary"
          danger
          onClick={() => {
            setDeleteFeed(true);
            setSelectedId(modaldata.landOwnerID);
          }}
        >
          Delete
        </Button>,
        <Button key="back" onClick={handleCancel}>
        Cancel
      </Button>,
        ]}
      >
      <div style={{marginBottom:'40px',marginLeft:'20px'}}>
      <Row gutter={[16, 16]}>
        <Col>
          <Image
            width={200}
            src={modaldata.profImage} 
          />
        </Col>
        <Col style={{marginTop:'0px',fontSize:'14px',textAlign:'left',marginLeft:"40px",width:'290px'}}>
              <div >
              <b>RegisterNumber</b> : {modaldata.registerNumber}
              </div>
              <div>
                <b>Name</b> : {modaldata.landOwnerName}
              </div>
              <div>
                <b>ContactNumber </b> : {modaldata.contactNumber}
              </div>
              <div>
                <b>LandAddress</b> : {modaldata.landAddress}
              </div>
              <div>
                <b>Email	</b> : {modaldata.email}
              </div>
              <div>
                <b>Country</b> : {modaldata.country}
              </div>
              <div>
                <b>BankName</b> : {modaldata.bankName}
              </div>
              <div>
                <b>BankAccountNumber</b> : {modaldata.bankAccountNumber}
              </div>
        </Col>
      </Row>
      </div>
      <div style={{marginBottom:'40px',marginLeft:'20px'}}>
      <Row gutter={[16, 16]}>
        <Col>
          <Image
               width={200}
                src={modaldata.qrImage} 
            />
        </Col>
        <Col>
        <Row style={{marginBottom:'20px',marginLeft:'40px',fontSize:'16px',textAlign:'center',marginTop:'40px'}}>
              <div>
              <b>{modaldata.landOwnerName} QR CODE</b>
              </div>
        </Row>
        <Row style={{marginBottom:'40px',marginLeft:'40px',fontSize:'16px',textAlign:'center'}}>
          <Button key="back" type="primary" onClick={e => download(e)} >
            Downlode
          </Button>  
        </Row>
        </Col>
      </Row>
      </div>
              
        </Modal>
        <Modal
              title="Update Land Owner"
              visible={isUpdateModalVisible}
              onCancel={handleUpdateCancel}
              onOk={() => {
                handleUpdateClick();
              }}
              destroyOnClose
              footer={[
                <Button key="back" onClick={handleUpdateCancel}>
                  Cancel
                </Button>,
                <Button
                  disabled={
                    !updateLandOwnerName ||
                    !updateLandOwnerFullName ||
                    !updateContactNumber ||
                    !updateCountry ||
                    !updateLandAddress ||
                    !updateLongitude ||
                    !updateLatitude ||
                    !updateBankAccountNumber ||
                    !updateBankName ||
                    !updateBankBranch
                  }
                  key="submit"
                  type="primary"
                  onClick={() => {
                    handleUpdateClick();
                    getData();
                  }}
                >
                  Save
                </Button>,
              ]}
            >
              <Form autoComplete="off" form={form}>
                <Form.Item
                  name="updateLandOwnerName"
                  label="Land Owner Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter land owner name",
                    },
                    {
                      whitespace: true,
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateLandOwnerName"
                    onChange={(event) =>
                      setUpdateLandOwnerName(event.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="updateLandOwnerFullName"
                  label="Land Owner Full Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter land owner full name",
                    },
                    {
                      whitespace: true,
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateLandOwnerFullName"
                    onChange={(event) =>
                      setUpdateLandOwnerFullName(event.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="updateContactNumber"
                  label="Contact Number"
                  rules={[
                    {
                      required: true,

                      message: "Please Enter Contact Number",
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
                    type="number"
                    pattern="[0-9]*"
                    name="updateContactNumber"
                    onChange={(event) =>
                      setUpdateLandONContact(event.target.value.toString())
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="updateCountry"
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: "Please enter country",
                    },
                    {
                      whitespace: true,
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateCountry"
                    onChange={(event) => setUpdateCountry(event.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="updateLandAddress"
                  label="Land Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter land address",
                    },
                    {
                      whitespace: true,
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateLandAddress"
                    onChange={(event) =>
                      setUpdateLandAddress(event.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="updateBankAccountNumber"
                  label="Bank Account Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter bank account number",
                    },
                    {
                      whitespace: true,
                    },
                    { min: 7 },
                    { max: 10 },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="number"
                    name="updateBankAccountNumber"
                    onChange={(event) =>
                      setUpdateBankAccountNumber(event.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="updateBankName"
                  label="Bank Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter bank name",
                    },
                    {
                      whitespace: true,
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateBankName"
                    onChange={(event) => setUpdateBankName(event.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="updateBankBranch"
                  label="Bank Branch"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Bank Branch",
                    },
                    {
                      whitespace: true,
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateBankBranch"
                    onChange={(event) =>
                      setUpdateBankBranch(event.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="updateLongitude"
                  label="Longitude"
                  rules={[
                    {
                      required: true,
                      message: "Please enter longitude",
                    },
                    {
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="number"
                    name="updateLongitude"
                    onChange={(event) => setUpdateLongitude(event.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="updateLatitude"
                  label="Latitude"
                  rules={[
                    {
                      required: true,
                      message: "Please enter latitude",
                    },
                    {
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="updateLatitude"
                    onChange={(event) => setUpdateLatitude(event.target.value)}
                  />
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
                      <Button
                        type="primary"
                        onClick={() => setDeleteFeed(false)}
                      >
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
    </>
  );
};

export default LandOwner;
