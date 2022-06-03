/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect } from "react"
import axios from "axios";
import {
    Row,
    Col,
    Card,
    Table,
    Avatar,
    Typography,
    Modal,
    Button,
    Form,
    Input,
  } from "antd";

  import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
  import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
  import Grid from "@mui/material/Grid";
  
  
  const { Title } = Typography;
  
  // table code start
  const columns = [
    {
      title: "AUDITOR NAME",
      dataIndex: "name",
      key: "name",
      width: "22%",
    },
  
    {
      title: "CONTACT NUMBER",
      key: "contact",
      dataIndex: "contact",
    },
    {
      title: "ADDRESS",
      key: "address",
      dataIndex: "address",
    },
      {
        title: "USER TYPE",
        key: "type",
        dataIndex: "type",
      },
    //   {
    //     title: "",
    //     key: "action",
    //     dataIndex: "action",
    //   },
  ];
  
  const rows = [];
  
  function Auditor() {
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
      const showUpdateModal = () => {
          console.log("Modal visible");
        setIsUpdateModalVisible(true);
      };
      const handleUpdateCancel = () => {
        console.log("Modal invisible");
        setIsUpdateModalVisible(false);
      };
      const layout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 16,
        },
      };
      
    const [data, setData] = useState([]);
    const { Meta } = Card;

    const setRows = (data) => {
        data.forEach((item,index) => {
            let object = {
                key: index,
                name: (
                  <>
                    <Avatar.Group>
                      <Avatar
                        className="shape-avatar"
                        shape="square"
                        size={40}
                        src={item.imageUri}
                      ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>{item.fullName}</Title>
                        <p>{item.qualification}</p>
                    </div>
                    </Avatar.Group>
                  </>
                ),
            
                contact: (
                  <>
                    <div className="author-info">
                      <CallOutlinedIcon />
                      <Title level={5}>{item.contactNumber}</Title>
                      <EmailOutlinedIcon />
                      <Title level={5}>{item.email}</Title>
                    </div>
                  </>
                ),
                address: (
                  <>
                    <div className="ant-employed">
                    <Title level={5}>{item.address}</Title>
                    </div>
                  </>
                ),
                type: (
                    <>
                      <div className="ant-employed">
                      <Title level={5}>{item.userType}</Title>
                      <Button type="primary" className="tag-primary" onClick={showUpdateModal}>
                        Edit
                      </Button>
                      </div>
                    </>
                ),
                // action: (
                //     <>
                //       <Button type="primary" className="tag-primary" onClick={showUpdateModal}>
                //         Edit
                //       </Button>
                //       <Modal
                //         title={item.fullName}
                //         visible={isUpdateModalVisible}
                //         onCancel={handleUpdateCancel}
                //        >
                //         <Grid item>
                //             <Card
                //                 hoverable
                //                 style={{
                //                     minWidth: 500,
                //                 }}
                //         >
                //                 <Meta title={item.fullName} description={item.email} />
                //             </Card>
                //         </Grid>
                //       </Modal>
                //     </>
                // ),
              };

              rows.push(object);
              <Modal
              title={item.fullName}
              visible={isUpdateModalVisible}
              onCancel={handleUpdateCancel}
            >
                <Grid item>
                  <Card
                    hoverable
                    style={{
                      minWidth: 500,
                    }}
                  >
                    <Meta title={item.fullName} description={item.email} />
                  </Card>
                </Grid>
            </Modal>
        })
    }

    useEffect(() => {
    const headers = {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NTU1NTEzfQ.Kv2cEkCU-F9w_Gd_ajB2zfiUW66G6WPg7dPznedIRC0',
        // withCredentials: false,
      };
      
    axios.get('http://127.0.0.1:3000/users/', {headers})
    .then((res) => {
        setData(res.data);
        console.log(res.data);
        setRows(res.data.Result);
    })
    .catch((error) => {
        console.error(error)
        console.log('check err')
    })
    
     }, []);
  
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Auditors"
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={rows}
                    pagination={false}
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </Col>
          </Row>

        </div>
      </>
    );
  }
  
  export default Auditor;

//   <Modal
//               title="Edit Auditor"
//               visible={isUpdateModalVisible}
//               onCancel={handleUpdateCancel}
//             >
//               <Form {...layout}>
//                 <Form.Item
//                   name={["user", "name"]}
//                   label="Title"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item name={["user", "mobileNo"]} label="Tag">
//                   <Input />
//                 </Form.Item>
//               </Form>
//         </Modal>








  

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import Stack from '@mui/material/Stack';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import { makeStyles } from '@mui/styles';
// import axios from "axios";
// import { useState, useEffect } from "react"
  
// const useStyles = makeStyles({

//   mainHeading: {
//     fontWeight: "bold",
//     fontSize: 18
//   },

//   tableHeading: {
//     fontWeight: "bold"
//   },

//   tableContainer: {
//     boxShadow: "0 2px 6px rgb(0 0 0 / 0.25)"
//   },

//   featuredButton: {
//     fontSize: "12px",
//     padding: "5px"
//   }
// });


// function Auditor() {

//   const classes = useStyles();
//   const [data, setData] = useState([]);


//   useEffect(() => {

//   const headers = {
//     'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk',
//   };

//   axios.get('http://127.0.0.1:3000/users/', {headers})
//   .then((res) => {
//     setData(res.data.Result);
//     console.log(res.data.Result)
//   })
//   .catch((error) => {
//     console.error(error)
//     console.log('check err')
//   })

//   }, []);

//   return(
//     <div>
//         <Box
//           component="span"
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={2}
//           mt={1}
//         >
//           <h1 className={classes.mainHeading}>Auditors</h1>
//         </Box>
//         <TableContainer component={Paper} className={classes.tableContainer}>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//               <TableHead>
//               <TableRow>
//                   <TableCell className={classes.tableHeading}></TableCell>
//                   <TableCell className={classes.tableHeading}>Auditor</TableCell>
//                   <TableCell className={classes.tableHeading}>Contact</TableCell>
//                   <TableCell className={classes.tableHeading}>Address</TableCell>
//                   <TableCell className={classes.tableHeading}>CreatedAT</TableCell>
//                   <TableCell className={classes.tableHeading}>Qulifications</TableCell>
//                   <TableCell className={classes.tableHeading}>type</TableCell>
//               </TableRow>
//               </TableHead>
//               <TableBody>
//               {data.map((row) => (
//                   <TableRow
//                       key={row.id}
//                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                   >
//                       <TableCell>{row.imageUri}</TableCell>
//                       <TableCell>{row.userName}</TableCell>
//                       <TableCell>
//                         <Stack direction="row" alignItems="center" gap={1} mb={1}>
//                           <CallOutlinedIcon />
//                           <Typography variant="body1">{row.contactNumber}</Typography>
//                         </Stack>
//                         <Stack direction="row" alignItems="center" gap={1}>
//                           <EmailOutlinedIcon />
//                           <Typography variant="body1">{row.email}</Typography>
//                         </Stack>
//                       </TableCell>
//                       <TableCell>{row.address}</TableCell>
//                       <TableCell>{row.createdAt}</TableCell>
//                       <TableCell>{row.qualification}</TableCell>
//                       <TableCell>{row.userType}</TableCell>
//                   </TableRow>
//               ))}
//               </TableBody>
//           </Table>
//       </TableContainer>
//     </div>
//   )
// }

// export default Auditor;