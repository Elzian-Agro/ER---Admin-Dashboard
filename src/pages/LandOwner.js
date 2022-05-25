import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { makeStyles } from '@mui/styles';

import { useState } from "react"

const tableData = [{
    "id": 1,
    "first_name": "Goddart",
    "last_name": "Leece",
    "email": "gleece0@disqus.com",
    "gender": "Male",
    "ip_address": "76.0.222.180"
  }, {
    "id": 2,
    "first_name": "Hayyim",
    "last_name": "Mound",
    "email": "hmound1@geocities.com",
    "gender": "Male",
    "ip_address": "146.107.114.181"
  }, {
    "id": 3,
    "first_name": "Obediah",
    "last_name": "Patillo",
    "email": "opatillo2@so-net.ne.jp",
    "gender": "Genderqueer",
    "ip_address": "238.7.96.253"
  }, {
    "id": 4,
    "first_name": "Artie",
    "last_name": "Borrott",
    "email": "aborrott3@devhub.com",
    "gender": "Male",
    "ip_address": "112.66.6.75"
  }, {
    "id": 5,
    "first_name": "Erik",
    "last_name": "Soan",
    "email": "esoan4@nbcnews.com",
    "gender": "Male",
    "ip_address": "137.153.175.81"
  }]
  
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






function LandOwner() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [landOwner, setLandOwner] = useState(tableData);

  function handleChange() {
      alert("Do you really want to Edit!");
  }

  const handleDeleteClick = (landOwnerId) => {
    const delLandOwner = [...landOwner];
  
    const index = landOwner.findIndex((land) => land.id === landOwnerId);
  
    delLandOwner.splice(index, 1);
  
    setLandOwner(delLandOwner);
    console.log(delLandOwner);
    setOpen(false);

    
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
                  <TableCell className={classes.tableHeading}>Land Owner Details</TableCell>
                  <TableCell className={classes.tableHeading}>Country</TableCell>
                  <TableCell className={classes.tableHeading}>Region</TableCell>
                  <TableCell className={classes.tableHeading}>Land Address</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {tableData.map((row) => (
                  <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell>
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <PersonOutlineIcon />
                        <Typography variant="body1">{row.first_name}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <CallOutlinedIcon />
                        <Typography variant="body1">{row.last_name}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <EmailOutlinedIcon />
                        <Typography variant="body1">{row.email}</Typography>
                      </Stack>
                          {/* <Grid container>
                            
                            <Grid item lg={12}>
                                <PersonOutlineIcon /><Typography className={classes.name}>{row.first_name}</Typography>
                                <Typography color="textSecondary" variant="body2">{row.last_name}</Typography>
                                <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                            </Grid>
                          </Grid> */}
                      </TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell align='center'>
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Button variant="contained" color="secondary">Approved</Button> 
                          <Button className={classes.editButton} variant="contained" color="primary" onClick={handleChange}>Edit</Button> 
                          <Button variant="contained" color="error" onClick={() => setOpen(true)}>Delete</Button>
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