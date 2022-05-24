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
  }, {
    "id": 6,
    "first_name": "Kori",
    "last_name": "Maudling",
    "email": "kmaudling5@sfgate.com",
    "gender": "Female",
    "ip_address": "19.187.9.115"
  }, {
    "id": 7,
    "first_name": "Jehanna",
    "last_name": "Minocchi",
    "email": "jminocchi6@list-manage.com",
    "gender": "Female",
    "ip_address": "255.82.232.92"
  }, {
    "id": 8,
    "first_name": "Diego",
    "last_name": "Bertelet",
    "email": "dbertelet7@hugedomains.com",
    "gender": "Male",
    "ip_address": "229.218.35.59"
  }, {
    "id": 9,
    "first_name": "Lucio",
    "last_name": "Wickham",
    "email": "lwickham8@tinyurl.com",
    "gender": "Male",
    "ip_address": "148.151.179.24"
  }, {
    "id": 10,
    "first_name": "Shell",
    "last_name": "Bellinger",
    "email": "sbellinger9@ebay.com",
    "gender": "Male",
    "ip_address": "107.178.239.130"
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
  },

  editButton: {
    marginRight: 20
  },
});

function LandOwner() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleChange() {
      alert("Do you really want to Edit!");
  }

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
                  <TableCell className={classes.tableHeading}>ID</TableCell>
                  <TableCell className={classes.tableHeading}>First Name</TableCell>
                  <TableCell className={classes.tableHeading}>Last Name</TableCell>
                  <TableCell className={classes.tableHeading}>Email</TableCell>
                  <TableCell className={classes.tableHeading}>Gender</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {tableData.map((row) => (
                  <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell align='center'>
                          <Button className={classes.editButton} variant="contained" color="primary" onClick={handleChange}>Edit</Button> 
                          <Button variant="contained" color="error" onClick={() => setOpen(true)}>Delete</Button>
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
                                <Button onClick={() => setOpen(false)} c>Cancel</Button>
                                <Button onClick={() => setOpen(true)} color="error">Delete</Button>
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