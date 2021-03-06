import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useCookies } from "react-cookie";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Stack from "@mui/material/Stack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  SearchOutlined,
} from "@ant-design/icons";

import { landOwnersApi } from "../services/land-owner-service";


const useStyles = makeStyles({
  mainHeading: {
    fontWeight: "bold",
    fontSize: 18,
  },

  tableHeading: {
    fontWeight: "bold",
  },

  tableContainer: {
    boxShadow: "0 2px 6px rgb(0 0 0 / 0.25)",
  },

  featuredButton: {
    fontSize: "12px",
    width: "80px"
  },

  approveButton: {
    backgroundColor: "green",
  },

  formTextField: {
    marginBottom: "20px",
    marginRight: "10px",
    marginLeft: "10px",
    width: "400px",
  },

  headerSearch: {
    width: "300px",
    borderRadius: "5px",
    marginRight: "10px",
    marginLeft: "10px"
  }
});

function LandOwner() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteFeed, setDeleteFeed] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [landOwnerName, setLandOwnerName] = useState("");
  const [landOwnerFullname, setLandOwnerFullName] = useState("");
  const [contactNumber, setLandONContact] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [landAddress, setLandAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [noOfTrees, setNoTrees] = useState("");
  const [perimeter, setPerimeter] = useState("");
  const [updateRegisterNumber, setUpdateRegisterNumber] = useState("");
  const [updateLandOwnerName, setUpdateLandOwnerName] = useState("");
  const [updateLandOwnerFullName, setUpdateLandOwnerFullName] = useState("");
  const [updateContactNumber, setUpdateLandONContact] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateCountry, setUpdateCountry] = useState("");
  const [updateLandAddress, setUpdateLandAddress] = useState("");
  const [updateLongitude, setUpdateLongitude] = useState("");
  const [updateLatitude, setUpdateLatitude] = useState("");
  const [updateBankAccountNumber, setUpdateBankAccountNumber] = useState("");
  const [updateBankName, setUpdateBankName] = useState("");
  const [updateBankBranch, setUpdateBankBranch] = useState("");
  const [updateNoOfTrees, setUpdateNoTrees] = useState("");
  const [updatePerimeter, setUpdatePerimeter] = useState("");
  const [searchLandOwner, setSearchLandOwner] = useState("");
  //const [isApproved] = useState(true);

  const cookies = useCookies(["token"]);

  axios.defaults.headers = {
    "Content-Type": "application/json",
    "x-auth-token": cookies.token,
  };

  useEffect(() => {
    landOwnersApi()
      .then((res) => {
        setData(res.data.Result);
      })
  }, [isUpdateModalVisible]);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


  const handleAddFormSubmit = async () => {
    //   // store the states in the form data

    const formData = new FormData();
    formData.append("registerNumber", registerNumber);
    formData.append("landOwnerName", landOwnerName);
    formData.append("landOwnerFullname", landOwnerFullname);
    formData.append("contact", contactNumber);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("address", landAddress);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    formData.append("bankAccountNumber", bankAccountNumber);
    formData.append("bankName", bankName);
    formData.append("bankBranch", bankBranch);
    formData.append("noOfTrees", noOfTrees);
    formData.append("perimeter", perimeter);

    
    const landData = {
      registerNumber: registerNumber,
      landOwnerName: landOwnerName,
      landOwnerFullname: landOwnerFullname,
      contactNumber: contactNumber,
      email: email,
      country: country,
      landAddress: landAddress,
      longitude: longitude,
      latitude: latitude,
      bankAccountNumber: bankAccountNumber,
      bankName: bankName,
      bankBranch: bankBranch,
      noOfTrees: noOfTrees,
      perimeter: perimeter,
    };


    axios({
      method: "post",
      url: "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/landOwners/add",
      data: landData,
      headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk" },
    }).then((response) => {
      const newLandOwner = [...data, landData];
      setData(newLandOwner);
      console.log(response.landData);
    }).catch(err=>{
      console.log(err)
    });
  
    setIsModalVisible(false);

  };

  function approveLandOwner(appId) {
    axios({
      method: "put",
      url: `http://127.0.0.1:3000/landOwners/approveLandowner/${selectedId}`,
      headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MDZmOGI0Mi02YzM1LTQxOWEtOTY0MC1kNjhmNDAzZmQ5ZDIiLCJpc0FkbWluIjoxLCJpYXQiOjE2NTQyMjU1NTd9.lD86WyFQ0EZByllBFAdprwTVnTy8rRaEkgr4u4UdmWI" },
    }).then((response) => {
      
    }).catch(err=>{
      console.log(err)
    });
  }

  // function UnApproveLandOwner() {
  //   axios({
  //     method: "put",
  //     url: `http://127.0.0.1:3000/landOwners/unApproveLandowner/${selectedId}`,
  //     headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MDZmOGI0Mi02YzM1LTQxOWEtOTY0MC1kNjhmNDAzZmQ5ZDIiLCJpc0FkbWluIjoxLCJpYXQiOjE2NTQyMjU1NTd9.lD86WyFQ0EZByllBFAdprwTVnTy8rRaEkgr4u4UdmWI" },
  //   }).then((response) => {
     
  //   }).catch(err=>{
  //     console.log(err)
  //   });
  // }


  // function handleApprove(appId) {

  //   isApproved ? approveLandOwner() : UnApproveLandOwner()

  //   setData(
  //     data.map((row) => {
  //       if (row.landOwnerID === appId) {
  //         return { ...row, isApproved: !row.isApproved };
  //       } else return { ...row };
  //     })
  //   );
  // }


  const handleDeleteClick = async () => {

    // const headers = {
    //   "x-auth-token":
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MDZmOGI0Mi02YzM1LTQxOWEtOTY0MC1kNjhmNDAzZmQ5ZDIiLCJpc0FkbWluIjoxLCJpYXQiOjE2NTQyMjU1NTd9.lD86WyFQ0EZByllBFAdprwTVnTy8rRaEkgr4u4UdmWI" 
    // };
    // await axios.put(
    //   `http://localhost:3000/landOwners/deleteLandowner/${selectedId}`, { headers }
    // )
    axios({
      method: "put",
      url: `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/landOwners/deleteLandowner/${selectedId}`,
      headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MDZmOGI0Mi02YzM1LTQxOWEtOTY0MC1kNjhmNDAzZmQ5ZDIiLCJpc0FkbWluIjoxLCJpYXQiOjE2NTQyMjU1NTd9.lD86WyFQ0EZByllBFAdprwTVnTy8rRaEkgr4u4UdmWI" },
    }).then(()=>{
      const deleteLandOwner = data.filter((land)=>land.landOwnerID !== selectedId);
      setData(deleteLandOwner);
    }).catch(err=>{
      console.log(err)
    });
    

    setDeleteFeed(false);

    // await axios.put(
    //   `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/landOwners/deleteLandowner/${selectedId}`, {headers}
    // );

    // setDeleteFeed(false);
  };


  const handleUpdateClick = async () => {

    const formData = new FormData();
    formData.append("registerNumber", registerNumber);
    formData.append("landOwnerName", landOwnerName);
    formData.append("landOwnerFullname", landOwnerFullname);
    formData.append("contact", contactNumber);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("address", landAddress);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    formData.append("bankAccountNumber", bankAccountNumber);
    formData.append("bankName", bankName);
    formData.append("bankBranch", bankBranch);
    formData.append("noOfTrees", noOfTrees);
    formData.append("perimeter", perimeter);
    
    const landData = {
      registerNumber: updateRegisterNumber,
      landOwnerName: updateLandOwnerName,
      landOwnerFullname: updateLandOwnerFullName,
      contactNumber: updateContactNumber,
      email: updateEmail,
      country: updateCountry,
      landAddress: updateLandAddress,
      longitude: updateLongitude,
      latitude: updateLatitude,
      bankAccountNumber: updateBankAccountNumber,
      bankName: updateBankName,
      bankBranch: updateBankBranch,
      noOfTrees: updateNoOfTrees,
      perimeter: updatePerimeter,
    };
    
    axios({
      method: "put",
      url: `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/landOwners/updateLandowner/${selectedId}`,
      data: landData,
      headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MDZmOGI0Mi02YzM1LTQxOWEtOTY0MC1kNjhmNDAzZmQ5ZDIiLCJpc0FkbWluIjoxLCJpYXQiOjE2NTQyMjU1NTd9.lD86WyFQ0EZByllBFAdprwTVnTy8rRaEkgr4u4UdmWI" },
    }).then(() => {
      const updateLandowner = data.map((land)=>{
        if(land.landOwnerID === selectedId){
          return landData
        }
        return land
      })
      setData(updateLandowner)
    });

    setIsUpdateModalVisible(false);

  };

  return (
    <div>
      <Box
        component="span"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mt={1}
      >
        <h1 className={classes.mainHeading}>Land Owners</h1>
        <Input
          placeholder="Search Land Owners..."
          prefix={<SearchOutlined />}
          className={classes.headerSearch}
          onChange={(event) => {setSearchLandOwner(event.target.value)}}
        />
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          New
        </Button>

        <Modal
          title="Add New Land Owner"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={() => {handleAddFormSubmit()}}
          destroyOnClose={true}
        >
        <Form {...layout}>
          <Form.Item
            name="registerNumber"
            label="Register Number"
            rules={[
              {
                required: true,
                message: "Please enter register number"
              },
              {
                whitespace: true
              },
              {min: 4}
            ]}
            hasFeedback
          >
            <Input
              value={registerNumber}
              onChange={(event) => setRegisterNumber(event.target.value)}
            />
          </Form.Item>

          <Form.Item name="landOwnerName" label="Land Owner Name"
            rules={[
              {
                required: true,
                message: "Please enter land owner name"
              },
              {
                whitespace: true
              },
              {min: 5}
            ]}
            hasFeedback
          >
            <Input
              value={landOwnerName}
              onChange={(event) => setLandOwnerName(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="landOwnerFullName"
            label="Land Owner Full Name"
            rules={[
              {
                required: true,
                message: "Please enter land owner full name"
              },
              {
                whitespace: true
              },
              {min: 5}
            ]}
            hasFeedback
          >
            <Input
              value={landOwnerFullname}
              onChange={(event) => setLandOwnerFullName(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[
              {
                required: true,
                message: "Please enter contact number"
              },
              {
                whitespace: true
              },
              {min: 10},
              {max: 10}
            ]}
            hasFeedback
          >
            <Input
              value={contactNumber}
              onChange={(event) => setLandONContact(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter email"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please enter country"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="landAddress"
            label="Land Address"
            rules={[
              {
                required: true,
                message: "Please enter land address"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              value={landAddress}
              onChange={(event) => setLandAddress(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[
              {
                required: true,
                message: "Please enter longitude"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="latitude"
            label="Latitude"
            rules={[
              {
                required: true,
                message: "Please enter latitude"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="bankAccountNumber"
            label="Bank Account Number"
            rules={[
              {
                required: true,
                message: "Please enter bank account number"
              },
              {
                whitespace: true
              },
              {min: 10},
              {max: 12}
            ]}
            hasFeedback
          >
            <Input
              value={bankAccountNumber}
              onChange={(event) => setBankAccountNumber(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[
              {
                required: true,
                message: "Please enter bank name"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              value={bankName}
              onChange={(event) => setBankName(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="bankBranch"
            label="Bank Branch"
            rules={[
              {
                required: true,
                message: "Please enter bank branch"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              value={bankBranch}
              onChange={(event) => setBankBranch(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="noOfTrees"
            label="Number Of Trees"
            rules={[
              {
                required: true,
                message: "Please enter number of trees"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              type="number"
              value={noOfTrees}
              onChange={(event) => setNoTrees(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="perimeter"
            label="Perimeter"
            rules={[
              {
                required: true,
                message: "Please enter perimeter"
              },
              {
                whitespace: true
              }
            ]}
            hasFeedback
          >
            <Input
              value={perimeter}
              onChange={(event) => setPerimeter(event.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeading}>Land Owner Name</TableCell>
              <TableCell className={classes.tableHeading}>Contact</TableCell>
              <TableCell className={classes.tableHeading}>Email</TableCell>
              <TableCell className={classes.tableHeading}>Region</TableCell>
              <TableCell className={classes.tableHeading}>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            
            data.filter(row => {
              if (searchLandOwner === '') {
                return row;
              } else if (row.landOwnerName.toLowerCase().includes(searchLandOwner.toLowerCase())) {
                return row;
              }
              return null;
            }).map((row) => (
              <TableRow
                key={row.id}
                id={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" gap={1} mb={1}>
                    <PersonOutlineIcon />
                    <Typography variant="body1">{row.landOwnerName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" gap={1} mb={1}>
                    <CallOutlinedIcon />
                    <Typography variant="body1">{row.contactNumber}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <EmailOutlinedIcon />
                    <Typography variant="body1">{row.email}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.landAddress}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell align="center">
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item md={12} lg={6} xl={4}>
                      <Button
                          type="primary"
                          className={classes.approveButton}
                          color={row.isApproved ? "primary" : "secondary"}
                          onClick={() => {
                            approveLandOwner(row.landOwnerID);
                          }}
                        >
                          {row.isApproved ? "UnApprove" : "Approve"}
                      </Button>
                    </Grid>
                    <Grid item md={12} lg={6} xl={4}>
                      <Button
                          className={classes.featuredButton}
                          type="primary"
                          onClick={() => {
                            showUpdateModal();
                            setSelectedId(row.landOwnerID);
                            setUpdateRegisterNumber(row.registerNumber);
                            setUpdateLandOwnerName(row.landOwnerName);
                            setUpdateLandOwnerFullName(row.landOwnerFullname);
                            setUpdateEmail(row.email);
                            setUpdateLandONContact(row.contactNumber);
                            setUpdateCountry(row.country);
                            setUpdateLandAddress(row.landAddress);
                            setUpdateBankName(row.bankName);
                            setUpdateBankAccountNumber(row.bankAccountNumber);
                            setUpdateBankBranch(row.bankBranch);
                            setUpdateLongitude(row.longitude);
                            setUpdateLatitude(row.latitude);
                            setUpdateNoTrees(row.noOfTrees);
                            setUpdatePerimeter(row.perimeter);
                          }}
                        >
                          Edit
                      </Button>
                    </Grid>
                    <Grid item md={12} lg={12} xl={4}>
                      <Button
                          className={classes.featuredButton}
                          type="primary"
                          danger
                          onClick={() => {
                            setDeleteFeed(true);
                            setSelectedId(row.landOwnerID);
                          }}
                        >
                          Delete
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>

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
              </TableRow>
            ))}
            <Modal
              title="Update Land Owner"
              visible={isUpdateModalVisible}
              onCancel={handleUpdateCancel}
              onOk={handleUpdateClick}
              destroyOnClose={true}
            >
              <Form autoComplete="off">

                <Form.Item
                  name="Register Number"
                  label="Register Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter register number"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4},
                  ]}
                  hasFeedback
                >
                  <Input name="updateRegisterNumber" defaultValue={updateRegisterNumber} onChange={(event) => setUpdateRegisterNumber( event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="LandOwner Name"
                  label="Land Owner Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter land owner name"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5},
                  ]}
                  hasFeedback
                >
                  <Input name="updateLandOwnerName" defaultValue={updateLandOwnerName} onChange={(event) => setUpdateLandOwnerName(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="LandOwner FullName"
                  label="Land Owner Full Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter land owner full name"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5},
                  ]}
                  hasFeedback
                >
                  <Input name="updateLandOwnerFullName" defaultValue={updateLandOwnerFullName} onChange={(event) => setUpdateLandOwnerFullName(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Contact Number"
                  label="Contact Number"
                  rules={[
                    {
                      required: true,
                      message: "Please contact number"
                    },
                    {
                      whitespace: true
                    },
                    { min: 10},
                    { max: 10}
                  ]}
                  hasFeedback
                >
                  <Input name="updateContactNumber" defaultValue={updateContactNumber} onChange={(event) => setUpdateLandONContact(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter email"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5},
                  ]}
                  hasFeedback
                >
                  <Input name="updateEmail" defaultValue={updateEmail} onChange={(event) => setUpdateEmail({email: event.target.value})}/>
                </Form.Item>

                <Form.Item
                  name="Country"
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: "Please enter country"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateCountry" defaultValue={updateCountry} onChange={(event) => setUpdateCountry(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Land Address"
                  label="Land Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter land address"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateLandAddress" defaultValue={updateLandAddress} onChange={(event) => setUpdateLandAddress(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Bank Account Number"
                  label="Bank Account Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter bank account number"
                    },
                    {
                      whitespace: true
                    },
                    { min: 10},
                    { max: 12}
                  ]}
                  hasFeedback
                >
                  <Input name="updateBankAccountNumber" defaultValue={updateBankAccountNumber} onChange={(event) => setUpdateBankAccountNumber(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Bank Name"
                  label="Bank Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter bank name"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateBankName" defaultValue={updateBankName} onChange={(event) => setUpdateBankName(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Bank Branch"
                  label="Bank Branch"
                  rules={[
                    {
                      required: true,
                      message: "Please enter bank branch"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateBankBranch" defaultValue={updateBankBranch} onChange={(event) => setUpdateBankBranch(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Longitude"
                  label="Longitude"
                  rules={[
                    {
                      required: true,
                      message: "Please enter longitude"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
                >
                  <Input name="updateLongitude" defaultValue={updateLongitude} onChange={(event) => setUpdateLongitude(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Latitude"
                  label="Latitude"
                  rules={[
                    {
                      required: true,
                      message: "Please enter latitude"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5},
                  ]}
                  hasFeedback
                >
                  <Input name="updateLatitude" defaultValue={updateLatitude} onChange={(event) => setUpdateLatitude(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="No Of Trees"
                  label="Number Of Trees"
                  rules={[
                    {
                      required: true,
                      message: "Please enter number of trees"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input type="number" name="updateNoOfTrees" defaultValue={updateNoOfTrees} onChange={(event) => setUpdateNoTrees(event.target.value)}/>
                </Form.Item>

                <Form.Item
                  name="Perimeter"
                  label="Perimeter"
                  rules={[
                    {
                      required: true,
                      message: "Please enter perimeter"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updatePerimeter" defaultValue={updatePerimeter} onChange={(event) => setUpdatePerimeter(event.target.value)}/>
                </Form.Item>

              </Form>
            </Modal>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LandOwner;