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
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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

function TreeSpecies() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteTreeSpecies, setDeleteTreeSpecies] = useState(false);
  // const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  // const [selectedId, setSelectedId] = useState("");
  const [plantName, setPlantName] = useState("");
  const [commonNames, setCommonNames] = useState("");
  const [botanicalName, setBotanicalName] = useState("");
  const [originofSpecies, setOriginofSpecies] = useState("");
  const [family, setFamily] = useState("");
  const [afNotationPhysiognomy, setAfNotationPhysiognomy] = useState("");
  const [plantReference_onERPlantDatabase, setPlantReference_onERPlantDatabase] = useState("");
  const [photosyntheticBiomassYear1, setPhotosyntheticBiomassYear1] = useState("");
  const [photosyntheticBiomassYear2, setPhotosyntheticBiomassYear2] = useState("");
  const [photosyntheticBiomassYear3, setPhotosyntheticBiomassYear3] = useState("");
  const [photosyntheticBiomassYear4, setPhotosyntheticBiomassYear4] = useState("");
  const [weightPerLeaf, setWeightPerLeaf] = useState("");
  const [leafCycle, setLeafCycle] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [texture, setTexture] = useState("");
  const [conservationStatus, setConservationStatus] = useState("");
  const [growthRate, setGrowthRate] = useState("");
  const [crownType, setCrownType] = useState("");
  const [propagationMethod, setPropagationMethod] = useState("");
  const [rootType, setRootType] = useState("");
  const [preferredSolis, setPreferredSolis] = useState("");
  const [impactOnSoil, setImpactOnSoil] = useState("");
  const [salinityTolerance, setSalinityTolerance] = useState("");
  const [humanUses, setHumanUses] = useState("");
  const [economicImportance, setEconomicImportance] = useState("");
  const [distribution, setDistribution] = useState("");
  const [lightPreferences, setLightPreferences] = useState("");
  const [floweringTime, setFloweringTime] = useState("");
  const [flowerColor, setFlowerColor] = useState("");
  const [fruitType, setFruitType] = useState("");
  // const [updateRegisterNumber, setUpdateRegisterNumber] = useState("");
  // const [updateLandOwnerName, setUpdateLandOwnerName] = useState("");
  // const [updateLandOwnerFullName, setUpdateLandOwnerFullName] = useState("");
  // const [updateContactNumber, setUpdateLandONContact] = useState("");
  // const [updateEmail, setUpdateEmail] = useState("");
  // const [updateCountry, setUpdateCountry] = useState("");
  // const [updateLandAddress, setUpdateLandAddress] = useState("");
  // const [updateLongitude, setUpdateLongitude] = useState("");
  // const [updateLatitude, setUpdateLatitude] = useState("");
  // const [updateBankAccountNumber, setUpdateBankAccountNumber] = useState("");
  // const [updateBankName, setUpdateBankName] = useState("");
  // const [updateBankBranch, setUpdateBankBranch] = useState("");
  // const [updateNoOfTrees, setUpdateNoTrees] = useState("");
  // const [updatePerimeter, setUpdatePerimeter] = useState("");
  // const [searchLandOwner, setSearchLandOwner] = useState("");
  //const [isApproved] = useState(true);

  const cookies = useCookies(["token"]);

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
      .get("http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/species/", {headers})
      .then((res) => {
        setData(res.data.Result);
      })
  }, []);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const layout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 16,
    },
  };


  
  const handleAddFormSubmit = async () => {
    //   // store the states in the form data

    const formData = new FormData();
    formData.append("plantName", plantName);
    formData.append("commonNames", commonNames);
    formData.append("botanicalName", botanicalName);
    formData.append("originofSpecies", originofSpecies);
    formData.append("family", family);
    formData.append("afNotationPhysiognomy", afNotationPhysiognomy);
    formData.append("plantReference_onERPlantDatabase", plantReference_onERPlantDatabase);
    formData.append("photosyntheticBiomassYear1", photosyntheticBiomassYear1);
    formData.append("photosyntheticBiomassYear2", photosyntheticBiomassYear2);
    formData.append("photosyntheticBiomassYear3", photosyntheticBiomassYear3);
    formData.append("photosyntheticBiomassYear4", photosyntheticBiomassYear4);
    formData.append("weightPerLeaf", weightPerLeaf);
    formData.append("leafCycle", leafCycle);
    formData.append("length", length);
    formData.append("width", width);
    formData.append("texture", texture);
    formData.append("conservationStatus", conservationStatus);
    formData.append("growthRate", growthRate);
    formData.append("crownType", crownType);
    formData.append("propagationMethod", propagationMethod);
    formData.append("rootType", rootType);
    formData.append("preferredSolis", preferredSolis);
    formData.append("impactOnSoil", impactOnSoil);
    formData.append("salinityTolerance", salinityTolerance);
    formData.append("humanUses", humanUses);
    formData.append("economicImportance", economicImportance);
    formData.append("distribution", distribution);
    formData.append("lightPreferences", lightPreferences);
    formData.append("floweringTime", floweringTime);
    formData.append("flowerColor", flowerColor);
    formData.append("fruitType", fruitType);

    
    const treeData = {
      plantName: plantName,
      commonNames: commonNames,
      botanicalName: botanicalName,
      originofSpecies: originofSpecies,
      family: family,
      afNotationPhysiognomy: afNotationPhysiognomy,
      plantReference_onERPlantDatabase: plantReference_onERPlantDatabase,
      photosyntheticBiomassYear1: photosyntheticBiomassYear1,
      photosyntheticBiomassYear2: photosyntheticBiomassYear2,
      photosyntheticBiomassYear3: photosyntheticBiomassYear3,
      photosyntheticBiomassYear4: photosyntheticBiomassYear4,
      weightPerLeaf: weightPerLeaf,
      leafCycle: leafCycle,
      length: length,
      width: width,
      texture: texture,
      conservationStatus: conservationStatus,
      growthRate: growthRate,
      crownType: crownType,
      propagationMethod: propagationMethod,
      rootType: rootType,
      preferredSolis: preferredSolis,
      impactOnSoil: impactOnSoil,
      salinityTolerance: salinityTolerance,
      humanUses: humanUses,
      economicImportance: economicImportance,
      distribution: distribution,
      lightPreferences: lightPreferences,
      floweringTime: floweringTime,
      flowerColor: flowerColor,
      fruitType: fruitType
    };


      axios({
        method: "post",
        url: "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/species/add",
        data: treeData,
        headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk" },
      }).then((response) => {
        const newTreeSpecies = [...data, treeData];
        setData(newTreeSpecies);
        console.log(response.treeData);
      }).catch(err=>{
        console.log(err)
      });
  
    setIsModalVisible(false);

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
        <h1 className={classes.mainHeading}>Tree Species</h1>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          New
        </Button>

      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeading}>Plant Name</TableCell>
              <TableCell className={classes.tableHeading}>Common Names</TableCell>
              <TableCell className={classes.tableHeading}>Botanical Name</TableCell>
              <TableCell className={classes.tableHeading}>Origin Of Species</TableCell>
              <TableCell className={classes.tableHeading}>Fruit Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            
            data.map((row) => (
              <TableRow
                key={row.id}
                id={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.plantName}</TableCell>
                <TableCell>{row.commonNames}</TableCell>
                <TableCell>{row.botanicalName}</TableCell>
                <TableCell>{row.originofSpecies}</TableCell>
                <TableCell>{row.fruitType}</TableCell>
                <TableCell align="center">
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item md={12} lg={6}>
                      <Button
                          className={classes.featuredButton}
                          type="primary"
                        >
                          Edit
                      </Button>
                    </Grid>
                    <Grid item md={12} lg={6}>
                      <Button
                          className={classes.featuredButton}
                          type="primary"
                          danger
                          onClick={() => {
                            setDeleteTreeSpecies(true);
                            
                          }}
                        >
                          Delete
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>

                <Dialog
                  aria-labelledby="dialog-title"
                  open={deleteTreeSpecies}
                  onClose={() => setDeleteTreeSpecies(false)}
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
                    <Button type="primary" onClick={() => setDeleteTreeSpecies(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      danger
                      color="error"
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableRow>
            ))}

          <Modal
            title="Add New Tree Species"
            visible={isModalVisible}
            onCancel={handleCancel}
            onOk={() => {handleAddFormSubmit()}}
          >
          <Form {...layout}>
            <Form.Item
              name="plantName"
              label="Plant Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="text"
                value={plantName}
                onChange={(event) => setPlantName(event.target.value)}
              />
            </Form.Item>
            <Form.Item name="commonNames" label="Common Names">
              <Input
                type="text"
                value={commonNames}
                onChange={(event) => setCommonNames(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="botanicalName"
              label="Botanical Name"
            >
              <Input
                type="text"
                value={botanicalName}
                onChange={(event) => setBotanicalName(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="originofSpecies"
              label="Origin Of Species"
            >
              <Input
                type="text"
                value={originofSpecies}
                onChange={(event) => setOriginofSpecies(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="family"
              label="Family"
            >
              <Input
                type="text"
                value={family}
                onChange={(event) => setFamily(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="afNotationPhysiognomy"
              label="af Notation Physiognomy"
            >
              <Input
                type="text"
                value={afNotationPhysiognomy}
                onChange={(event) => setAfNotationPhysiognomy(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="plantReference_onERPlantDatabase"
              label="plantReference_onERPlantDatabase"
            >
              <Input
                type="text"
                value={plantReference_onERPlantDatabase}
                onChange={(event) => setPlantReference_onERPlantDatabase(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="photosyntheticBiomassYear1"
              label="Photosynthetic Biomass Year 1"
            >
              <Input
                type="text"
                value={photosyntheticBiomassYear1}
                onChange={(event) => setPhotosyntheticBiomassYear1(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="photosyntheticBiomassYear2"
              label="Photosynthetic Biomass Year 2"
            >
              <Input
                type="text"
                value={photosyntheticBiomassYear2}
                onChange={(event) => setPhotosyntheticBiomassYear2(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="photosyntheticBiomassYear3"
              label="Photosynthetic Biomass Year 3"
            >
              <Input
                type="text"
                value={photosyntheticBiomassYear3}
                onChange={(event) => setPhotosyntheticBiomassYear3(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="photosyntheticBiomassYear1"
              label="Photosynthetic Biomass Year 4"
            >
              <Input
                type="text"
                value={photosyntheticBiomassYear4}
                onChange={(event) => setPhotosyntheticBiomassYear4(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="weightPerLeaf"
              label="Weight Per Leaf"
            >
              <Input
                type="text"
                value={weightPerLeaf}
                onChange={(event) => setWeightPerLeaf(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="leafCycle"
              label="Leaf Cycle"
            >
              <Input
                type="text"
                value={leafCycle}
                onChange={(event) => setLeafCycle(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="length"
              label="Length"
            >
              <Input
                type="text"
                value={length}
                onChange={(event) => setLength(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="width"
              label="Width"
            >
              <Input
                type="text"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="texture"
              label="Texture"
            >
              <Input
                type="text"
                value={texture}
                onChange={(event) => setTexture(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="conservationStatus"
              label="Conservation Status"
            >
              <Input
                type="text"
                value={conservationStatus}
                onChange={(event) => setConservationStatus(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="growthRate"
              label="Growth Rate"
            >
              <Input
                type="text"
                value={growthRate}
                onChange={(event) => setGrowthRate(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="crownType"
              label="Crown Type"
            >
              <Input
                type="text"
                value={crownType}
                onChange={(event) => setCrownType(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="propagationMethod"
              label="Propagation Method"
            >
              <Input
                type="text"
                value={propagationMethod}
                onChange={(event) => setPropagationMethod(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="rootType"
              label="Root Type"
            >
              <Input
                type="text"
                value={rootType}
                onChange={(event) => setRootType(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="preferredSolis"
              label="Preferred Solis"
            >
              <Input
                type="text"
                value={preferredSolis}
                onChange={(event) => setPreferredSolis(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="impactOnSoil"
              label="Impact On Soil"
            >
              <Input
                type="text"
                value={impactOnSoil}
                onChange={(event) => setImpactOnSoil(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="salinityTolerance"
              label="Salinity Tolerance"
            >
              <Input
                type="text"
                value={salinityTolerance}
                onChange={(event) => setSalinityTolerance(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="humanUses"
              label="Human Uses"
            >
              <Input
                type="text"
                value={humanUses}
                onChange={(event) => setHumanUses(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="economicImportance"
              label="Economic Importance"
            >
              <Input
                type="text"
                value={economicImportance}
                onChange={(event) => setEconomicImportance(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="distribution"
              label="Distribution"
            >
              <Input
                type="text"
                value={distribution}
                onChange={(event) => setDistribution(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="lightPreferences"
              label="Light Preferences"
            >
              <Input
                type="text"
                value={lightPreferences}
                onChange={(event) => setLightPreferences(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="floweringTime"
              label="Flowering Time"
            >
              <Input
                type="text"
                value={floweringTime}
                onChange={(event) => setFloweringTime(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="flowerColor"
              label="Flower Color"
            >
              <Input
                type="text"
                value={flowerColor}
                onChange={(event) => setFlowerColor(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="fruitType"
              label="Fruit Type"
            >
              <Input
                type="text"
                value={fruitType}
                onChange={(event) => setFruitType(event.target.value)}
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

export default TreeSpecies;