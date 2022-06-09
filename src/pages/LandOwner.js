import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import { useCookies } from "react-cookie";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
// import Input from '@mui/material/Input';
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
});

function LandOwner(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteFeed, setDeleteFeed] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
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

  // const [addFormData, setAddFormData] = useState({
  //   landOwnerName: "",
  //   contactNumber: "",
  //   email: "",
  //   landAddress: "",
  //   region: "",
  //   country: "",
  //   registerNumber: "",
  //   longitude: "",
  //   latitude: "",
  //   bankAccountNumber: "",
  //   bankName: "",
  //   bankBranch: "",
  //   noOfTrees: "",
  //   perimeter: "",
  //   landOwnerFullname: "",
  // })

  axios.defaults.headers = {
    "Content-Type": "application/json",
    "x-auth-token": cookies.token,
  };

  useEffect(() => {
    const headers = {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk",
    };

    axios
      .get("http://127.0.0.1:3000/landOwners/", { headers })
      .then((res) => {
        setData(res.data.Result);
      })
      .catch((error) => {
        console.error(error);
        console.log("check err");
      });
  }, [deleteFeed]);


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


  const handleAddFormSubmit = async (e) => {
    //   // store the states in the form data

    e.preventDefault();

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

    const newLandOwner = [...data, landData];
    setData(newLandOwner);

    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/landOwners/add",
        data: landData,
        headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk" },
      }).then((response) => {
        setIsModalVisible(false)
      });
    } catch(error) {
      console.log(error)
    }

    console.log(landData)
  };


  function handleApprove(appId) {
    setData(
      data.map((row) => {
        if (row.landOwnerID === appId) {
          return { ...row, isApproved: !row.isApproved };
        } else return { ...row };
      })
    );
  }


  const handleDeleteClick = async () => {
    const result = await axios.put(
      `http://127.0.0.1:3000/landOwners/deleteLandowner/${selectedId}`
    );

    setDeleteFeed(false);
  };


  const handleUpdateClick = async () => {

    const headers = {
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUwNTU5NDExfQ.-uL0RCokz4AuN0eozRI_SP4jmz58p2bA41vpBAYlLQo',
    };

    axios.put(
      `http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/landOwners/updateLandowner/${selectedId}`,{headers}
    ).then((req,res) => {
      setIsUpdateModalVisible(false)
    });
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
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          New
        </Button>

        <Modal
          title="Add New Land Owner"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleAddFormSubmit}
        >
          <Form {...layout}>
            <Form.Item
              name={["user", "registerNumber"]}
              label="Register Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="text"
                value={registerNumber}
                onChange={(event) => setRegisterNumber(event.target.value)}
              />
            </Form.Item>
            <Form.Item name={["user", "landOwnerName"]} label="Land Owner Name">
              <Input
                type="text"
                value={landOwnerName}
                onChange={(event) => setLandOwnerName(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name={["user", "landOwnerFullName"]}
              label="Land Owner Full Name"
            >
              <Input
                type="text"
                value={landOwnerFullname}
                onChange={(event) => setLandOwnerFullName(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="contactNumber"
              label="Contact Number"
            >
              <Input
                type="text"
                value={contactNumber}
                onChange={(event) => setLandONContact(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
            >
              <Input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
            >
              <Input
                type="text"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="landAddress"
              label="Land Address"
            >
              <Input
                type="text"
                value={landAddress}
                onChange={(event) => setLandAddress(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="longitude"
              label="Longitude"
            >
              <Input
                type="text"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="latitude"
              label="Latitude"
            >
              <Input
                type="text"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="bankAccountNumber"
              label="Bank Account Number"
            >
              <Input
                type="text"
                value={bankAccountNumber}
                onChange={(event) => setBankAccountNumber(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="bankName"
              label="Bank Name"
            >
              <Input
                type="text"
                value={bankName}
                onChange={(event) => setBankName(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="bankBranch"
              label="Bank Branch"
            >
              <Input
                type="text"
                value={bankBranch}
                onChange={(event) => setBankBranch(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="noOfTrees"
              label="Number Of Trees"
            >
              <Input
                type="text"
                value={noOfTrees}
                onChange={(event) => setNoTrees(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="perimeter"
              label="Perimeter"
            >
              <Input
                type="text"
                value={perimeter}
                onChange={(event) => setPerimeter(event.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>

      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {data.map((row) => (
              <TableRow
                key={row.id}
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
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Button
                      type="primary"
                      className={classes.approveButton}
                      color={row.isApproved ? "primary" : "secondary"}
                      onClick={() => {
                        handleApprove(row.landOwnerID);
                      }}
                    >
                      {row.isApproved ? "UnApprove" : "Approve"}
                    </Button>
                    <Button
                      className={classes.featuredButton}
                      type="primary"
                      onClick={() => {
                        showUpdateModal();
                        setSelectedId(row.landOwnerID)
                        setUpdateRegisterNumber(row.registerNumber);
                        setUpdateLandOwnerName(row.landOwnerName);
                        setUpdateLandOwnerFullName(row.landOwnerFullname);
                      }}
                    >
                      Edit
                    </Button>
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
                  </Stack>
                </TableCell>

                <Modal
                  title="Update Feed"
                  visible={isUpdateModalVisible}
                  onCancel={handleUpdateCancel}
                  onOk={handleUpdateClick}
                >
                  <Form>
                    <Form.Item
                      name={"registerNumber"}
                      label="Register Number"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder={updateRegisterNumber} />
                    </Form.Item>
                    <Form.Item
                      name={"landOwnerName"}
                      label="Land Owner Name"
                    >
                      <Input placeholder={updateLandOwnerName} />
                    </Form.Item>
                    <Form.Item
                      name={"landOwnerFullName"}
                      label="Land Owner Full Name"
                    >
                      <Input placeholder={updateLandOwnerFullName} />
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LandOwner;