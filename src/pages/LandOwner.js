import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { Button, Modal, Form, Input } from "antd";
import Stack from "@mui/material/Stack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import service from "./../services/landowner-service";

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
    width: "80px",
  },

  approveButton: {
    backgroundColor: "green",
  },

  unapproveButton: {
    backgroundColor: "red",
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
    marginLeft: "10px",
  },
});

function LandOwner() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [deleteFeed, setDeleteFeed] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
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
  const [color, setcolor] = useState("green");

  const [form] = Form.useForm();

  const {
    getLandOwners,
    deleteLandOwnerById,
    updateLandOwnerById,
    approveLandOwnerById,
    unApproveLandOwnerById,
  } = service();

  useEffect(() => {
    async function getAllLandOwners() {
      const res = await getLandOwners();
      setData(res);
    }
    getAllLandOwners();
  }, [getLandOwners]);

  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
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
      await updateLandOwnerById(selectedId, landData);
      setIsUpdateModalVisible(false);
    } catch (error) {
      setIsUpdateModalVisible(false);
    }
  };

  const approveLandOwner = async (selectedId_) => {
    try {
      await approveLandOwnerById(selectedId_);
      console.log(`${selectedId} landOwners approved`);
    } catch (error) {
      console.log(error);
    }
  };

  const unApproveLandOwner = async (selectedId_) => {
    try {
      await unApproveLandOwnerById(selectedId_);
      console.log(`${selectedId} landOwners Unapproved`);
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

  const handleDeleteClick = async () => {
    try {
      await deleteLandOwnerById(selectedId);
      setDeleteFeed(false);
    } catch (error) {
      setDeleteFeed(false);
    }
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
          onChange={(event) => {
            setSearchLandOwner(event.target.value);
          }}
        />
        {/* <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          New
        </Button> */}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeading}>
                Register Number
              </TableCell>
              <TableCell className={classes.tableHeading}>
                Land Owner Name
              </TableCell>
              <TableCell className={classes.tableHeading}>Contact</TableCell>
              <TableCell className={classes.tableHeading}>Address</TableCell>
              <TableCell className={classes.tableHeading}>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((row) => {
                if (searchLandOwner === "") {
                  return row;
                } else if (
                  row.landOwnerName
                    ?.toLowerCase()
                    .includes(searchLandOwner.toLowerCase()) ||
                  row.registerNumber
                    ?.toLowerCase()
                    .includes(searchLandOwner.toLowerCase())
                ) {
                  return row;
                }
                return null;
              })
              .map((row) => (
                <TableRow
                  key={row.landOwnerID}
                  id={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.registerNumber}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" gap={1} mb={1}>
                      <PersonOutlineIcon />
                      <Typography variant="body1">
                        {row.landOwnerName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" gap={1} mb={1}>
                      <CallOutlinedIcon />
                      <Typography variant="body1">
                        {row.contactNumber}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <EmailOutlinedIcon />
                      <Typography variant="body1">{row.email}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{row.landAddress}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell align="center">
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                    >
                      <Grid item md={12} lg={6} xl={4}>
                        <Button
                          type="primary"
                          className={color}
                          //color change
                          style={{ backgroundColor: row.validated === 0 ? "#00e600" : "	#e6ac00"
                          
                         }}
                          //color={row.validated === 0 ? "#F00" : "#00F"}
                          //backgroundColor={row.validated === 0 ? "#ffffff" : "#e60000"}
                          onClick={() => {
                            setSelectedId(row.landOwnerID);
                            handleApprove(row);

                          }}
                        >
                          {row.validated === 0 ? "Approve" : "UnApprove"}
                        </Button>
                      </Grid>
                      <Grid item md={12} lg={6} xl={4}>
                        <Button
                          className={classes.featuredButton}
                          type="primary"
                          onClick={() => {
                            showUpdateModal();
                            setSelectedId(row.landOwnerID);
                            setUpdateLandOwnerName(row.landOwnerName);
                            setUpdateLandOwnerFullName(row.landOwnerFullname);
                            setUpdateLandONContact(row.contactNumber);
                            setUpdateCountry(row.country);
                            setUpdateLandAddress(row.landAddress);
                            setUpdateBankName(row.bankName);
                            setUpdateBankAccountNumber(row.bankAccountNumber);
                            setUpdateBankBranch(row.bankBranch);
                            setUpdateLongitude(row.longitude);
                            setUpdateLatitude(row.latitude);

                            form.setFieldsValue({
                              updateLandOwnerName: row.landOwnerName,
                              updateLandOwnerFullName: row.landOwnerFullname,
                              updateContactNumber: row.contactNumber,
                              updateCountry: row.country,
                              updateLandAddress: row.landAddress,
                              updateBankName: row.bankName,
                              updateBankAccountNumber: row.bankAccountNumber,
                              updateBankBranch: row.bankBranch,
                              updateLongitude: row.longitude,
                              updateLatitude: row.latitude,
                            });
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
                </TableRow>
              ))}

            {/* <Modal
                title="Add New Land Owner"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={() => {handleAddFormSubmit()}}
                destroyOnClose={true}
              >
              <Form {...layout} autoComplete="off">
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
                    {min: 5}
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
                      pattern: "^[A-Za-z]",
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
                      pattern: "^[A-Za-z]",
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
                      pattern: "^[0-9]",
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
                    onChange={(event) => setLandONContact(event.target.value.toString())}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      // required: true,
                      // type: email,
                      // message: "Please enter email"
                      required: true,
                      type: "email",
                      message: "The input is not valid E-mail!",
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
                      pattern: "^[A-Za-z]",
                      message: "Please enter country"
                    },
                    {
                      whitespace: true
                    },
                    {min: 5}
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
                    },
                    {min: 5}
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
                      pattern: "^[0-9]",
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
                      pattern: "^[0-9]",
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
                      pattern: "^[0-9]",
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
                      pattern: "^[A-Za-z]",
                      message: "Please enter bank name"
                    },
                    {
                      whitespace: true
                    },
                    {min: 5}
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
                      pattern: "^[A-Za-z]",
                      message: "Please enter bank branch"
                    },
                    {
                      whitespace: true
                    },
                    {min: 5}
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
                      pattern: "^[0-9]",
                      message: "Please enter number of trees"
                    },
                    {
                      whitespace: true
                    },
                    {min: 1}
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
                      pattern: "^[0-9]",
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
            </Modal> */}

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
                  onClick={() => handleUpdateClick()}
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
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LandOwner;
