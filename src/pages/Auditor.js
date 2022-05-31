import { useState, useEffect } from "react"
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { makeStyles } from '@mui/styles';

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
  }
});


function Auditor() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  
 useEffect(() => {
//    axios
//      .get("127.0.0.1:3000/users/")
//      .then((res) => {
//        setData(res.data);
//        console.log("Result:", data);
//      })
//      .catch((error) => {
//        console.log(error);
//      });

// axios.get('https://127.0.0.1:3000/users/', {
//   headers: {
//     "x-auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NTU1NTEzfQ.Kv2cEkCU-F9w_Gd_ajB2zfiUW66G6WPg7dPznedIRC0'
//   }
// })
// .then((res) => {
//     setData(res.data);
//     console.log(res.data)
// })
// .catch((error) => {
//     console.error(error)
// })



const headers = {
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NTU1NTEzfQ.Kv2cEkCU-F9w_Gd_ajB2zfiUW66G6WPg7dPznedIRC0',
    // 'Access-Control-Allow-Credentials':true

  };
  
axios.get('http://127.0.0.1:3000/users/', {headers})
.then((res) => {
    setData(res.data);
    console.log(res.data)
})
.catch((error) => {
    console.error(error)
    console.log('check err')
})

 }, []);

  const handleDeleteClick = (auditorId) => {
    console.log({auditorId})
    const delAuditor = [...data];
  
    const index = data.findIndex((Auditor) => Auditor.id === auditorId);
  
    delAuditor.splice(index, 1);
  
    setData(delAuditor);
    console.log(delAuditor);
    console.log(auditorId);
    
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
          <h1 className={classes.mainHeading}>Auditor</h1>
          <Button variant="contained" color="primary">
            New
          </Button>
        </Box>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
              <TableRow>
                  <TableCell className={classes.tableHeading}>Auditor Details</TableCell>
                  <TableCell className={classes.tableHeading}>User Type</TableCell>
                  {/* <TableCell className={classes.tableHeading}>Region</TableCell> */}
                  <TableCell className={classes.tableHeading}>Auditor Address</TableCell>
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
                        <Typography variant="body1">{row.fullName}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <CallOutlinedIcon />
                        <Typography variant="body1">{row.contactNumber}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <EmailOutlinedIcon />
                        <Typography variant="body1">{row.email}</Typography>
                      </Stack>
                      </TableCell>
                      <TableCell>{row.userType}</TableCell>
                      {/* <TableCell>{row.address.street}</TableCell> */}
                      <TableCell>{row.address}</TableCell>
                      <TableCell align='center'>
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Button variant="contained" color="secondary">Approved</Button> 
                          <Button className={classes.editButton} variant="contained" color="primary" >Edit</Button> 
                          <Button variant="contained" color="error" onClick={() => {setOpen(true)} }>Delete</Button>
                        </Stack>
                        <Dialog aria-labelledby='dialog-title' 
                            open={open} 
                            onClose={() => setOpen(false)} 
                            hideBackdrop 
                            PaperProps={{
                              elevation: 0,
                              sx: {
                                boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)"
                              }
                            }}
                          >
                            <DialogTitle id='dialog-title'>Do you really want to delete?</DialogTitle>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                                <Button onClick={() => handleDeleteClick(row.id)} color="error">Delete</Button>
                            </DialogActions>
                          </Dialog>
                      </TableCell>
                  </TableRow>
              ))}
              </TableBody>
          </Table>
      </TableContainer>
    </div>
  )
}

export default Auditor;