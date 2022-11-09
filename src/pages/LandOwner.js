import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../assets/styles/main.css";


import {
  Modal,
  Button,
  Card,
  Form,
  Input,
  Avatar,
  Typography,
  Table,
  Row,
  Col,
  Image,
} from "antd";

import { MdEmail, MdPerson, MdPhone } from "react-icons/md";
import { makeStyles } from "@mui/styles";

import service from "./../services/landowner-service";

import { SearchOutlined } from "@ant-design/icons";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
// import { fontSize, height } from "@mui/system";
// import { Padding } from "@mui/icons-material";
import signinbg from "../assets/logos/LifeForce.png";
import logo from "../assets/images/earth-restoration-logo.png";
import elzianLogo from "../assets/images/elzianLogo.png";

const { Title } = Typography;

const useStyles = makeStyles({
  headerSearch: {
    width: "220px",
    borderRadius: "7px",
    marginRight: "10px",
    marginLeft: "10px",
  },

  card: {
    width: "400px",
    height: "250px",
    backgroundColor: "#f6ffed",
    borderRadius: "10px",
  },

  upperContainer: {
    height: "50px",
  },

  logoContainer1: {
    marginLeft: "5px",
  },

  logoContainer2: {
    marginRight: "5px",
    display: "flex",
    alignItems: "flex-end",
    justifyItems: "flex-end",
  },

  logoRightAling: {
    align: "right"
  },

  leftContainer: {
    marginTop: "40px",
    marginLeft: "10px",
  },

  imageContainer: {
    marginTop: "50px",
    height: "100px",
  },

  rightContaine: {
    marginLeft: "30px",
    marginTop: "40px",
    marginBottom: "10px",
    color: "#FFFFFF",
  },



});

function LandOwner() {
  const printRef = React.useRef();
  const printRef2 = React.useRef();
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
  // const [searchLandOwner, setSearchLandOwner] = useState("");
  const [deleteFeed, setDeleteFeed] = useState(false);
  const [isContractModalVisible, setIsContractModalVisible] = useState(false);
  const [idCardModalVisible, setIdCardModalVisible] = useState(false);
  const [treedata, setTreeData] = useState([]);
  const [stageData, setStageData] = useState([]);

  const {
    getLandOwners,
    deleteLandOwnerById,
    updateLandOwnerById,
    approveLandOwnerById,
    unApproveLandOwnerById,
    getLandOwnerById,
    getTreeSpeciesByRegNo,
    getStageByExistingBioDiversity,
  } = service();

  const showContract = () => {
    setIsContractModalVisible(true);
  };

  const handleContractCancel = () => {
    setIsContractModalVisible(false);
  };

  const showIdCard = () => {
    setIdCardModalVisible(true);
  };

  const handleIdCardCancel = () => {
    setIdCardModalVisible(false);
  }

  const styles = {
    preventInlineText: {
      whiteSpace: "pre-line",
    },
  };

  //Getting Current Date
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  //Contract PDF download Function
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/jpg");

    const pdf = new jsPDF("p", "pt", "letter");
    pdf.addImage(data, 100, 0);
    pdf.save(`${modaldata.landOwnerName} Contract.pdf`);
  };

  // ID image download function
  const handleDownloadID = async () => {
    const element = printRef2.current;
    const canvas = await html2canvas(element, { useCORS: true, scale: 2 });

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = (`${modaldata.landOwnerName} ID.jpg`);


      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const columns = [
    {
      title: "RegNo/Name/Contact",
      width: "44%",
      render: (record) => (
        <React.Fragment>
          <div className="avatar-info">
            <Title style={styles.preventInlineText} level={5}>
              {record.registerNumber}
            </Title>
            <Title style={styles.preventInlineText} level={5}>
              {record.landOwnerName}
            </Title>
          </div>
          <br />
          <Title style={styles.preventInlineText} level={5}>
            {" "}
            <MdPhone /> {record.contactNumber}
          </Title>
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "Email/Address/Country",
      width: "55%",
      render: (record) => (
        <React.Fragment>
          <br></br>
          <Title style={styles.preventInlineText} level={5}>
            {" "}
            <MdEmail /> {record.email}
          </Title>
          <Title style={styles.preventInlineText} level={5}>
            {" "}
            {record.landAddress}
          </Title>
          <Title style={styles.preventInlineText} level={5}>
            {" "}
            {record.country}
          </Title>
          <br />
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "Register Number",
      dataIndex: "number",
      key: "number",
      width: "15%",
      render: (index, record) => (
        <>
          <Avatar.Group key={index}>
            <div className="avatar-info">
              <Title style={styles.preventInlineText} level={5}>
                {record.registerNumber}
              </Title>
            </div>
          </Avatar.Group>
        </>
      ),
      responsive: ["sm"],
    },

    {
      title: "Land Owner Name",
      key: "Name",
      dataIndex: "Name",
      width: "15%",
      render: (index, record) => (
        <>
          <div key={index}>
            <Title style={styles.preventInlineText} level={5}>
              {" "}
              <MdPerson /> {record.landOwnerName}
            </Title>
          </div>
        </>
      ),
      responsive: ["sm"],
    },
    {
      title: "Contact",
      key: "contact",
      dataIndex: "contact",
      width: "20%",
      render: (index, record) => (
        <div key={index}>
          <Title style={styles.preventInlineText} level={5}>
            {" "}
            <MdPhone /> {record.contactNumber}
          </Title>
          <Title style={styles.preventInlineText} level={5}>
            {" "}
            <MdEmail /> {record.email}
          </Title>
        </div>
      ),
      responsive: ["sm"],
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      width: "20%",
      render: (index, record) => (
        <>
          <Title style={styles.preventInlineText} level={5} key={index}>
            {record.landAddress}
          </Title>
        </>
      ),
      responsive: ["sm"],
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: "15%",
      render: (index, record) => (
        <>
          <Title style={styles.preventInlineText} level={5} key={index}>
            {record.country}
          </Title>
        </>
      ),
      responsive: ["sm"],
    },
  ];

  const getData = async () => {
    const res = await getLandOwners();
    console.log(res);
    console.log("get data ");
    setdata(
      res.map((row) => ({
        key: row.landOwnerID,
        landOwnerID: row.landOwnerID,
        profImage: row.profImage,
        qrImage: row.qrImage,
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
        existingBiodiversity: row.existingBiodiversity
      }))
    );
    setTableData(
      res.map((row) => ({
        key: row.landOwnerID,
        landOwnerID: row.landOwnerID,
        profImage: row.profImage,
        qrImage: row.qrImage,
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
        existingBiodiversity: row.existingBiodiversity
      }))
    );
  };

  //Getting Tree Species
  const getTreeData = async () => {
    const res = await getTreeSpeciesByRegNo(selectedId);
    console.log(res.data.result);
    console.log("Showing TreeData");
    setTreeData(res.data.Result)
  }

  //Getting Stage data from ExistingBioDiversity
  const getStageData = async () => {
    const res = await getStageByExistingBioDiversity(selectedId)
    console.log(res.data.result);
    console.log("Showing Stage");
    setStageData(res.data.Result);
  };

  const showTreeData = () => {
    getTreeData();
  }

  const showStageData = () => {
    getStageData();
  }


  useEffect(() => {
    showStageData();
    getData();
    showTreeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stageList = stageData.map((item, index) =>
    <div key={index}>{item.stage}</div>
  );


  const renderList = treedata.map((item, index) =>
    <div key={index}>
      <Row style={{ fontSize: "14px" }}>
        <Col span={7}>
          <li><span><b>{item.treeSpecies}</b></span></li>
        </Col>
        <Col span={6}>
          <b>{modaldata.latitude}</b>
        </Col>
        <Col span={6}>
          <b>&nbsp;&nbsp;{modaldata.longitude}</b>
        </Col>
      </Row>
    </div >
  );



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

  const setApprove = async () => {
    const res = await getLandOwnerById(selectedId);
    setmodaldata(res.data.Result[0]);
  };

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
      setIsModalVisible(true);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const layout = {
  //   labelCol: {
  //     span: 6,
  //   },
  //   wrapperCol: {
  //     span: 16,
  //   },
  // };

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
      console.log(selectedId);
      console.log(landData);
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
      console.log(tableData);
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
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${modaldata.landOwnerName} QRCode.png`
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
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
              title="LandOwners"
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
                <Table
                  scroll={{ y: 375 }}
                  className="table-responsive"
                  dataSource={data}
                  columns={columns}
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        showModal(record);
                        setSelectedId(record.landOwnerID);
                        form.setFieldsValue({
                          key: record.landOwnerID,
                          id: record.landOwnerID,
                          profImage: record.profImage,
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
                  }}
                />
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
        width={530}
        destroyOnClose
        footer={[
          <Button
            type="primary"
            // button background color change
            style={{
              backgroundColor:
                modaldata.validated === 0 ? "#00e600" : "	#e6ac00",
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
        <div style={{ marginBottom: "40px" }}>
          <Row gutter={[16, 16]}>
            <Col style={{ textAlign: "center" }}>
              <Image width={200} src={modaldata.profImage} />
            </Col>
            <Col
              md={12}
              xs={24}
              style={{ fontSize: "14px", textAlign: "left", width: "270px" }}
            >
              <div>
                <b>Register Number</b> : {modaldata.registerNumber}
              </div>
              <div>
                <b>Name</b> : {modaldata.landOwnerName}
              </div>
              <div>
                <b>Contact Number </b> : {modaldata.contactNumber}
              </div>
              <div>
                <b>Land address</b> : {modaldata.landAddress}
              </div>
              <div>
                <b>Email </b> : {modaldata.email}
              </div>
              <div>
                <b>Country</b> : {modaldata.country}
              </div>
              <div>
                <b>Bank Name</b> : {modaldata.bankName}
              </div>
              <div>
                <b>Bank Account Number</b> : {modaldata.bankAccountNumber}
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <Row gutter={[22, 22]}>
            <Col
              style={{
                marginTop: "0px",
                fontSize: "14px",
                textAlign: "left",
                width: "260px",
              }}
            >
              <Image width={200} src={modaldata.qrImage} />
            </Col>
            <Col>
              <Row
                style={{
                  marginBottom: "20px",
                  fontSize: "16px",
                  textAlign: "center",
                  marginTop: "20px",
                  marginLeft: "0px",
                }}
              >
                <div>
                  <b>{modaldata.landOwnerName} QR CODE</b>
                </div>
              </Row>
              <Row
                style={{
                  marginBottom: "40px",
                  fontSize: "16px",
                  textAlign: "center",
                  marginLeft: "0px",
                }}
              >
                <Button key="back" type="primary" onClick={(e) => download(e)}>
                  Download
                </Button>
                <Button
                  type="link"
                  className="ant-edit-link"
                  onClick={() => {
                    showContract();
                    showTreeData();
                    showStageData();
                  }}
                >
                  View Contract
                </Button>
                <Modal
                  width="800px"
                  title="LandOwner Contract Details"
                  visible={isContractModalVisible}
                  onCancel={handleContractCancel}
                  destroyOnClose
                  footer={[
                    <Button type="back" onClick={handleContractCancel}>
                      Cancel
                    </Button>,
                    <Button type="primary" onClick={handleDownloadPdf}>
                      Download
                    </Button>,
                  ]}
                >
                  <div style={{ marginBottom: "40px", marginLeft: "60px", marginRight: "60px" }}>
                    <Row gutter={[16, 16]}>
                      <Col
                        style={{
                          marginTop: "0px",
                          fontSize: "16px",
                          textAlign: "left",
                          marginLeft: "0px",
                          width: "auto",
                        }}
                      >
                        <div ref={printRef}>
                          <br />
                          <div style={{ textAlign: "center", verticalAlign: "middle" }}>
                            <img
                              align="left"
                              width="50px"
                              src={logo}
                              alt="ER Logo" />
                            <span>LandOwner Contract</span>
                            <img align="right"
                              width="50px"
                              src={signinbg}
                              alt="Life Force Logo" />
                          </div>
                          <br></br>
                          <div>
                            This contract is entered into between{" "}
                            <b>{modaldata.landOwnerName}</b> and
                            EarthRestoration PL for the maintenance of a
                            measured quantum of healthy , active photosynthetic
                            Biomass (PB) for the given tree- UNIT
                          </div>
                          <br></br>
                          <div>
                            I /we <b>{modaldata.landOwnerFullname}</b> being the
                            legal owners of the land bearing ER Registration
                            Number : <b>{modaldata.registerNumber}</b>
                          </div>
                          <br></br>
                          <div>
                            Agree to enter the Life Force program of ER where
                            I/we will plant and look after the following tree
                            UNITS.
                          </div>
                          <br></br>
                          <center>{renderList}</center>
                          <br></br>
                          <div>
                            <Row>
                              <Col span={8}>
                                ExistingBioDiversity :
                              </Col>
                              <Col span={8}>
                                <b>{stageList}</b>
                              </Col>
                            </Row>
                          </div>
                          <br />
                          <div>
                            On my property in a design developed jointly with ER
                            for a period of 4 years.
                          </div>
                          <br></br>
                          <div>
                            I understand that all physical product of my
                            planting is my property and cede the Primary
                            Ecosystem Services (PES) of these ER units to the
                            investor named in this contract.
                          </div>
                          <br />
                          <br />
                          <h4>
                            <span className="signature">Producer</span>
                            <div style={{ float: "right" }}>{date}</div>
                            <div style={{ clear: "left" }}></div>
                          </h4>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Modal>
                <Button
                  type="link"
                  className="ant-edit-link"
                  onClick={showIdCard}
                >
                  View Landowner ID
                </Button>
                <Modal
                  width="590px"
                  title="LandOwner ID Card"
                  visible={idCardModalVisible}
                  onCancel={handleIdCardCancel}
                  destroyOnClose
                  footer={[
                    <Button type="back" onClick={handleIdCardCancel}>
                      Cancel
                    </Button>,
                    <Button type="primary" onClick={handleDownloadID}>
                      Download
                    </Button>,
                  ]}
                >
                  <div ref={printRef2}>
                    <div className="container">
                      <div className="padding">
                        <div className="font">
                          <div className="top">
                            <Image width={200} src={modaldata.profImage} />
                          </div>
                          <div className="bottom">
                            <p>{modaldata.landOwnerFullname}</p>
                            <p className="idNumber"><b>{modaldata.registerNumber}</b></p>
                            <p className="idNumber"><b>Address:</b>&nbsp;{modaldata.landAddress}</p>
                            <p className="idNumber"><b>Email:</b>&nbsp;{modaldata.email}</p>
                            <p className="idNumber"><b>Contact No:</b>&nbsp;{modaldata.contactNumber}</p>
                            <p className="idNumber"><b>Country:</b>&nbsp;{modaldata.country}</p>
                            <br></br>
                          </div>
                        </div>
                      </div>
                      <div className="back">
                        <div style={{ marginTop: "10px" }}>
                          <img src={logo} width="40px" alt="LifeForce Logo"></img>
                          <img src={signinbg} width="40px" align="right" alt="ER Logo"></img>
                        </div>
                        <h1 className="Details"><b>QR Code</b></h1>
                        {/* <hr className="hr"></hr> */}
                        <div className="details-info">
                          <div className="qr">
                            <Image src={modaldata.qrImage} alt="QR Code" />
                          </div>
                          <div className="footer">
                            <Image src={elzianLogo} alt="Elzian Agro Logo"></Image>
                            <p style={{ fontSize: "8px" }}>© Earth Restoration Pvt.Ltd Designed by ELZIAN AGRO</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </Row>
            </Col>
          </Row>
        </div >
      </Modal >
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
              onChange={(event) => setUpdateLandOwnerName(event.target.value)}
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
              onChange={(event) => setUpdateLandAddress(event.target.value)}
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
              onChange={(event) => setUpdateBankBranch(event.target.value)}
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
          <Button type="primary" onClick={() => setDeleteFeed(false)}>
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
}

export default LandOwner;
