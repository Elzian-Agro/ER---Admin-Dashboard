import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useCookies } from "react-cookie";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
// import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { Button, Modal, Form, Input } from "antd";

import Stack from '@mui/material/Stack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { makeStyles } from '@mui/styles';
import axios from "axios";
import { useState, useEffect } from "react"



const useStyles = makeStyles({

  mainHeading: {
    fontWeight: "bold",
    fontSize: 18
  },

  tableHeading: {
    fontWeight: "bold"
  },

  tableContainer: {
    boxShadow: "0 2px 6px rgb(0 0 0 / 0.25)"
  },

  featuredButton: {
    fontSize: "12px",
    padding: "5px"
  },

  formTextField: {
    marginBottom: "20px",
    marginRight: "10px",
    marginLeft: "10px",
    width: "400px",
  }
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
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk',
  };

  axios.get('http://127.0.0.1:3000/landOwners/', {headers})
  .then((res) => {
    setData(res.data.Result);
  })
  .catch((error) => {
    console.error(error)
    console.log('check err')
  })

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


  // const handleAddFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...addFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setAddFormData(newFormData);
  //   console.log(newFormData)
  // };
  



  // const handleAddFormSubmit = (event) => {
  //   event.preventDefault();

  //   const newContact = {
  //     landOwnerName: addFormData.landOwnerName,
  //     contactNumber: addFormData.contactNumber,
  //     email: addFormData.email,
  //     landAddress: addFormData.landAddress,
  //     region: addFormData.region,
  //     country: addFormData.country,
  //   };

  //   const newLandOwner = [...data, newContact];
  //   setData(newLandOwner);

    

  //   axios.post("http://127.0.0.1:3000/landOwners/add", {
  //     registerNumber: addFormData.registerNumber,
  //     landOwnerName: addFormData.landOwnerName,
  //     landOwnerFullname: addFormData.landOwnerFullname,
  //     contactNumber: addFormData.contactNumber,
  //     email: addFormData.email,
  //     country: addFormData.country,
  //     landAddress: addFormData.landAddress,
  //     longitude: addFormData.longitude,
  //     latitude: addFormData.latitude,
  //     bankAccountNumber: addFormData.bankAccountNumber,
  //     bankName: addFormData.bankName,
  //     bankBranch: addFormData.bankBranch,
  //     noOfTrees: addFormData.noOfTrees,
  //     perimeter: addFormData.perimeter,
  //   }).then((res) => {
  //     console.log(res.addFormData)
  //   })
  // };



  const handleAddFormSubmit = async(e) => {
  //   // store the states in the form data

    e.preventDefault();

  //   const newContact = {
  //     landOwnerName: addFormData.landOwnerName,
  //     contactNumber: addFormData.contactNumber,
  //     email: addFormData.email,
  //     landAddress: addFormData.landAddress,
  //     region: addFormData.region,
  //     country: addFormData.country,
  //     registerNumber: addFormData.registerNumber,
  //     landOwnerFullname: addFormData.landOwnerFullname,
  //     longitude: addFormData.longitude,
  //     latitude: addFormData.latitude,
  //     bankAccountNumber: addFormData.bankAccountNumber,
  //     bankName: addFormData.bankName,
  //     bankBranch: addFormData.bankBranch,
  //     noOfTrees: addFormData.noOfTrees,
  //     perimeter: addFormData.perimeter,
  //   };

  //   await axios.post('http://127.0.0.1:3000/landOwners/add', JSON.stringify(newContact))
  //     .then(result=>{console.log(result.addFormData)})


    const formData = new FormData();
    formData.append("registerNumber", registerNumber)
    formData.append("landOwnerName", landOwnerName)
    formData.append("landOwnerFullname", landOwnerFullname)
    formData.append("contact", contactNumber)
    formData.append("email", email)
    formData.append("country", country)
    formData.append("address", landAddress)
    formData.append("longitude", longitude)
    formData.append("latitude", latitude)
    formData.append("bankAccountNumber", bankAccountNumber)
    formData.append("bankName", bankName)
    formData.append("bankBranch", bankBranch)
    formData.append("noOfTrees", noOfTrees)
    formData.append("perimeter", perimeter)

    const newLandOwner = [...data, formData];
    setData(newLandOwner);

    try {
      const result = await axios.post(
        "http://127.0.0.1:3000/landOwners/add",
        formData
      );
    } catch (error) {
      alert("Error occurred");
    }
  
    // try {
    //   // make axios post request
    //   const response = await axios({
    //     method: "post",
    //     url: "http://127.0.0.1:3000/landOwners/add",
    //     data: formData,
    //     headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk" },
    //   }).then((response) => {
    //     console.log(response.addFormData);
    //   });
    // } catch(error) {
    //   console.log(error)
    // }
  }




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
    // const delLandOwner = [...data];
  
    // const index = data.findIndex((land) => land.landOwnerID === loId);
  
    // delLandOwner.splice(index, 1);
  
    // setData(delLandOwner);
    // console.log(delLandOwner)

  

    const result = await axios.put(`http://127.0.0.1:3000/landOwners/deleteLandowner/${selectedId}`);

    setDeleteFeed(false);
  };

  return(
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
          <Button variant="contained" color="primary"  onClick={showModal}>
            New
          </Button>

          <Modal
            title="Add New Land Owner"
            visible={isModalVisible}
            onCancel={handleCancel}
            onOk={handleAddFormSubmit}
          >
            <Form>
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
              <Form.Item name={["user", "landOwnerFullName"]} label="Land Owner Full Name">
                <Input
                    type="text"
                    value={landOwnerFullname}
                    onChange={(event) => setLandOwnerFullName(event.target.value)}
                  />
              </Form.Item>
            </Form>
          </Modal>


        {/* <Dialog open={open}>
        <Box >
          <form onSubmit={handleAddFormSubmit}>
            <div>
              <Input 
                type="text"
                name="registerNumber"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="registerNumber"
                value={addFormData.registerNumber}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="landOwnerName"
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="Land Owner Name"
                value={addFormData.landOwnerName}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="landOwnerFullname"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="landOwnerFullname"
                value={addFormData.landOwnerFullname}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="contactNumber"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="Contact Number"
                value={addFormData.contactNumber}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="email"
                name="email"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="Email"
                value={addFormData.email}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="country"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="Country"
                value={addFormData.country}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="landAddress"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="Land Address"
                value={addFormData.landAddress}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
             <div>
              <TextField 
                type="text"
                name="region"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                label="Region"
                value={addFormData.region}
                onChange={(e) => handleAddFormChange(e)}/>
            </div> 
            
            <div>
              <Input 
                type="text"
                name="longitude"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="longitude"
                value={addFormData.longitude}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="latitude"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="latitude"
                value={addFormData.latitude}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="bankAccountNumber"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="bankAccountNumber"
                value={addFormData.bankAccountNumber}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="bankName"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="bankName"
                value={addFormData.bankName}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="bankBranch"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="bankBranch"
                value={addFormData.bankBranch}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="noOfTrees"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="noOfTrees"
                value={addFormData.noOfTrees}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
            <div>
              <Input 
                type="text"
                name="perimeter"  
                className={classes.formTextField}
                margin="dense"
                required="required"
                variant="outlined"
                placeholder="perimeter"
                value={addFormData.perimeter}
                onChange={(e) => handleAddFormChange(e)}/>
            </div>
             <Grid container className="mt-auto">
              <Grid item container ju>
                <Grid item xs={6}>
                  <Button onClick={() => {handleClose()}}>Cancel</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button type='submit' onClick={() => {handleClose()}}>SAVE</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog> */}

        </Box>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Land Owner Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                    <TableCell align='center'>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Button className={classes.featuredButton} variant="contained" color={row.isApproved ? "primary" : "secondary"} onClick={() => {handleApprove(row.landOwnerID)}}>{row.isApproved ? "UnApprove" : "Approve"}</Button> 
                        <Button className={classes.featuredButton} variant="contained" color="primary" onClick={()=>{
                            showUpdateModal();
                            setUpdateRegisterNumber(row.registerNumber);
                            setUpdateLandOwnerName(row.landOwnerName);
                            setUpdateLandOwnerFullName(row.landOwnerFullname);}} >Edit</Button> 
                        <Button className={classes.featuredButton} variant="contained" color="error" onClick={() => {setDeleteFeed(true); setSelectedId(row.landOwnerID)}}>Delete</Button>
                      </Stack>
                    </TableCell>

                    <Modal
                      title="Update Feed"
                      visible={isUpdateModalVisible}
                      onCancel={handleUpdateCancel}
                    >
                      <Form>
                        <Form.Item
                          name={["user", "registerNumber"]}
                          label="Register Number"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input placeholder={updateRegisterNumber} />
                        </Form.Item>
                        <Form.Item name={["user", "landOwnerName"]} label="Land Owner Name">
                          <Input placeholder={updateLandOwnerName} />
                        </Form.Item>
                        <Form.Item name={["user", "landOwnerFullName"]} label="Land Owner Full Name">
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
  )
}

export default LandOwner;