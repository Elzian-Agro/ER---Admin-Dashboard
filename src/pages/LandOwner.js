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
  }
});


function LandOwner() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);


  useEffect(() => {

  const headers = {
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk',
  };

  axios.get('http://127.0.0.1:4000/landOwners/', {headers})
  .then((res) => {
    setData(res.data.Result);
    console.log(res.data.Result)
  })
  .catch((error) => {
    console.error(error)
    console.log('check err')
  })

  }, []);

  function handleChange() {
      alert("Do you really want to Edit!");
  }

  const handleDeleteClick = (landOwnerId) => {
    console.log({landOwnerId})
    const delLandOwner = [...data];
  
    const index = data.findIndex((land) => land.id === landOwnerId);
  
    delLandOwner.splice(index, 1);
  
    setData(delLandOwner);
    console.log(delLandOwner);
    console.log(landOwnerId);
    
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
          <Button variant="contained" color="primary">
            New
          </Button>
        </Box>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
              <TableRow>
                  <TableCell className={classes.tableHeading}>Land Owner Name</TableCell>
                  <TableCell className={classes.tableHeading}>Contact</TableCell>
                  <TableCell className={classes.tableHeading}>Land Address</TableCell>
                  <TableCell className={classes.tableHeading}>Region</TableCell>
                  <TableCell className={classes.tableHeading}>Country</TableCell>
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
                          <Button className={classes.featuredButton} variant="contained" color="secondary">Approved</Button> 
                          <Button className={classes.featuredButton} variant="contained" color="primary" onClick={()=>{handleChange(row.id)}} >Edit</Button> 
                          <Button className={classes.featuredButton} variant="contained" color="error" onClick={() => {setOpen(true)} }>Delete</Button>
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

export default LandOwner;