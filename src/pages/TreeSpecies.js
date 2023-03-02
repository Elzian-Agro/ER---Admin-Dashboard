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
import { Button, Modal, Form, Input, Row, Col, Space ,Image} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import {
  SearchOutlined,
} from "@ant-design/icons";

import service from "./../services/tree-species-service";
import MapChart1 from '../components/chart/MapChart1';
import MapChart2 from '../components/chart/MapChart2';
import { useCallback } from "react";
import { Card } from "@mui/material";

const useStyles = makeStyles({
  mainHeading: {
    fontWeight: "bold",
    fontSize: 18,
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
  },

});

function TreeSpecies() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteTreeSpecies, setDeleteTreeSpecies] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
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
  const [updatePlantName, setUpdatePlantName] = useState("");
  const [updateCommonNames, setUpdateCommonNames] = useState("");
  const [updateBotanicalName, setUpdateBotanicalName] = useState("");
  const [updateOriginofSpecies, setUpdateOriginofSpecies] = useState("");
  const [updateFamily, setUpdateFamily] = useState("");
  const [updateAfNotationPhysiognomy, setUpdateAfNotationPhysiognomy] = useState("");
  const [updatePlantReference_onERPlantDatabase, setUpdatePlantReference_onERPlantDatabase] = useState("");
  const [updatePhotosyntheticBiomassYear1, setUpdatePhotosyntheticBiomassYear1] = useState("");
  const [updatePhotosyntheticBiomassYear2, setUpdatePhotosyntheticBiomassYear2] = useState("");
  const [updatePhotosyntheticBiomassYear3, setUpdatePhotosyntheticBiomassYear3] = useState("");
  const [updatePhotosyntheticBiomassYear4, setUpdatePhotosyntheticBiomassYear4] = useState("");
  const [updateWeightPerLeaf, setUpdateWeightPerLeaf] = useState("");
  const [updateLeafCycle, setUpdateLeafCycle] = useState("");
  const [updateLength, setUpdateLength] = useState("");
  const [updateWidth, setUpdateWidth] = useState("");
  const [updateTexture, setUpdateTexture] = useState("");
  const [updateConservationStatus, setUpdateConservationStatus] = useState("");
  const [updateGrowthRate, setUpdateGrowthRate] = useState("");
  const [updateCrownType, setUpdateCrownType] = useState("");
  const [updatePropagationMethod, setUpdatePropagationMethod] = useState("");
  const [updateRootType, setUpdateRootType] = useState("");
  const [updatePreferredSolis, setUpdatePreferredSolis] = useState("");
  const [updateImpactOnSoil, setUpdateImpactOnSoil] = useState("");
  const [updateSalinityTolerance, setUpdateSalinityTolerance] = useState("");
  const [updateHumanUses, setUpdateHumanUses] = useState("");
  const [updateEconomicImportance, setUpdateEconomicImportance] = useState("");
  const [updateDistribution, setUpdateDistribution] = useState("");
  const [updateLightPreferences, setUpdateLightPreferences] = useState("");
  const [updateFloweringTime, setUpdateFloweringTime] = useState("");
  const [updateFlowerColor, setUpdateFlowerColor] = useState("");
  const [updateFruitType, setUpdateFruitType] = useState("");
  const [searchTreeSpecies, setSearchTreeSpecies] = useState("");
  const [form] = Form.useForm();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonDisabled2, setButtonDisabled2] = useState(true);

  const [isModalVisibleModel, setIsModalVisibleModel] = useState(false);
  const [modelData, setModeldata] = useState({})

  const [imagePath,setImagePath]=useState();
  const [imagePath1,setImagePath1]=useState();
  const [imagePath2,setImagePath2]=useState();
  const [imagePath3,setImagePath3]=useState();

  const [updsteImagePath,setUpdsteImagePath]=useState();
  const [checkTempupdsteImagePath,setCheckTempUpdsteImagePath]=useState();

  const [updsteImagePath1,setUpdsteImagePath1]=useState();
  const [checkTempupdsteImagePath1,setCheckTempUpdsteImagePath1]=useState();

  const [updsteImagePath2,setUpdsteImagePath2]=useState();
  const [checkTempupdsteImagePath2,setCheckTempUpdsteImagePath2]=useState();

  const [updsteImagePath3,setUpdsteImagePath3]=useState();
  const [checkTempupdsteImagePath3,setCheckTempUpdsteImagePath3]=useState();

 let imageFlag1=0
 let imageFlag2=0
 let imageFlag3=0
 let imageFlag4=0
 



  const {
    getAllTreeSpecies,
    deleteTreeSpeciesById,
    updateTreeSpeciesById,
    addNewTreeSpecies,
    getTreeSpeciesById
  } = service();
  
  const getTreeSpecies = useCallback( async () => {
    const res = await getAllTreeSpecies();
    setData(res);
  },[getAllTreeSpecies])
  
  useEffect(() => {
  
    getTreeSpecies()
  }, [getTreeSpecies]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const handleCancel = () => {
  

    setIsModalVisible(false);
  };

  const handleUpdateCancel = () => {
    imageFlag1 = 0
    imageFlag2 = 0
    imageFlag3 = 0
    imageFlag4 = 0
    setIsUpdateModalVisible(false);
  }

  const getTreeDetails = async (Id) => {
    const res = await getTreeSpeciesById(Id);

    setModeldata(res.data.Result[0])
  }

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
    formData.append("image", imagePath);
    formData.append("image", imagePath1);
    formData.append("image", imagePath2);
    formData.append("image", imagePath3);

    try {
      await addNewTreeSpecies(formData);
      getTreeSpecies()
      setIsModalVisible(false);

    } catch (error) {
      alert("Error Occcured");
      setIsModalVisible(false);
    }


  };


  const handleUpdateTreeSpecies = async () => {
    if (updsteImagePath !== checkTempupdsteImagePath) { imageFlag1 = 1 } else { imageFlag1 = 0 }
    if (updsteImagePath1 !== checkTempupdsteImagePath1) { imageFlag2 = 1 } else { imageFlag2 = 0 }
    if (updsteImagePath2 !== checkTempupdsteImagePath2) { imageFlag3 = 1 } else { imageFlag3 = 0 }
    if (updsteImagePath3 !== checkTempupdsteImagePath3) { imageFlag4 = 1 } else { imageFlag4 = 0 }
    const formData = new FormData();
    formData.append("plantName", updatePlantName);
    formData.append("commonNames", updateCommonNames);
    formData.append("botanicalName", updateBotanicalName);
    formData.append("originofSpecies", updateOriginofSpecies);
    formData.append("family", updateFamily);
    formData.append("afNotationPhysiognomy", updateAfNotationPhysiognomy);
    formData.append("plantReference_onERPlantDatabase", updatePlantReference_onERPlantDatabase);
    formData.append("photosyntheticBiomassYear1", updatePhotosyntheticBiomassYear1);
    formData.append("photosyntheticBiomassYear2", updatePhotosyntheticBiomassYear2);
    formData.append("photosyntheticBiomassYear3", updatePhotosyntheticBiomassYear3);
    formData.append("photosyntheticBiomassYear4", updatePhotosyntheticBiomassYear4);
    formData.append("weightPerLeaf", updateWeightPerLeaf);
    formData.append("leafCycle", updateLeafCycle);
    formData.append("length", updateLength);
    formData.append("width", updateWidth);
    formData.append("texture", updateTexture);
    formData.append("conservationStatus", updateConservationStatus);
    formData.append("growthRate", updateGrowthRate);
    formData.append("crownType", updateCrownType);
    formData.append("propagationMethod", updatePropagationMethod);
    formData.append("rootType", updateRootType);
    formData.append("preferredSolis", updatePreferredSolis);
    formData.append("impactOnSoil", updateImpactOnSoil);
    formData.append("salinityTolerance", updateSalinityTolerance);
    formData.append("humanUses", updateHumanUses);
    formData.append("economicImportance", updateEconomicImportance);
    formData.append("distribution", updateDistribution);
    formData.append("lightPreferences", updateLightPreferences);
    formData.append("floweringTime", updateFloweringTime);
    formData.append("flowerColor", updateFlowerColor);
    formData.append("fruitType", updateFruitType);
    formData.append("image", updsteImagePath);
    formData.append("image", updsteImagePath1);
    formData.append("image", updsteImagePath2);
    formData.append("image", updsteImagePath3);
    formData.append("imageFlag1", imageFlag1);
    formData.append("imageFlag2", imageFlag2);
    formData.append("imageFlag3", imageFlag3);
    formData.append("imageFlag4", imageFlag4);
    try {
      await updateTreeSpeciesById(selectedId, formData);
      setIsUpdateModalVisible(false);
      getTreeSpecies()

    } catch (error) {
      console.log(error);
      setIsUpdateModalVisible(false);
    }

  };


  const handleDeleteTreeSpecies = async () => {

    try {
      await deleteTreeSpeciesById(selectedId);
      getTreeSpecies();
      setDeleteTreeSpecies(false);
    } catch (error) {
      console.log(error);
      setDeleteTreeSpecies(false);
    }
  };


  const handleCancelModel = () => {
    setIsModalVisibleModel(false);
    setModeldata({});

  };

  const getPhotosynthesisBiomassChartData=()=>{
    let year1=modelData?.photosyntheticBiomassYear1?modelData.photosyntheticBiomassYear1:0;
    let year2=modelData?.photosyntheticBiomassYear2?modelData.photosyntheticBiomassYear2:0;
    let year3=modelData?.photosyntheticBiomassYear3?modelData.photosyntheticBiomassYear3:0;
    let year4=modelData?.photosyntheticBiomassYear3?modelData.photosyntheticBiomassYear3:0;

    let data=[0,year1,year2,year3,year4];
    return data;
  }
  const CalculateAverageO2production = () => {
    let year1 = modelData?.photosyntheticBiomassYear1 ? modelData.photosyntheticBiomassYear1 : 0;
    let year2 = modelData?.photosyntheticBiomassYear2 ? modelData.photosyntheticBiomassYear2 : 0;
    let year3 = modelData?.photosyntheticBiomassYear3 ? modelData.photosyntheticBiomassYear3 : 0;
    let year4 = modelData?.photosyntheticBiomassYear3 ? modelData.photosyntheticBiomassYear3 : 0;

    let o2ProductionYear2 = (year1 * 0.4) / 1.429;
    let o2ProductionYear1 = (year2 * 0.4) / 1.429;
    let o2ProductionYear3 = (year3 * 0.4) / 1.429;
    let o2ProductionYear4 = (year4 * 0.4) / 1.429;
    let o2Production = [0,o2ProductionYear1, o2ProductionYear2, o2ProductionYear3, o2ProductionYear4];
  
    return o2Production;
  }

  const CalculateAverageH2Oproduction = () => {
    let year1 = modelData?.photosyntheticBiomassYear1 ? modelData.photosyntheticBiomassYear1 : 0;
    let year2 = modelData?.photosyntheticBiomassYear2 ? modelData.photosyntheticBiomassYear2 : 0;
    let year3 = modelData?.photosyntheticBiomassYear3 ? modelData.photosyntheticBiomassYear3 : 0;
    let year4 = modelData?.photosyntheticBiomassYear3 ? modelData.photosyntheticBiomassYear3 : 0;

    let h2oProductionYear1 = (year1 * 100) / 1000;
    let h2oProductionYear2 = (year2 * 100) / 1000;
    let h2oProductionYear3 = (year3 * 100) / 1000;
    let h2oProductionYear4 = (year4 * 100) / 1000;
    let h2oProduction = [0,h2oProductionYear1, h2oProductionYear2, h2oProductionYear3, h2oProductionYear4];

    return h2oProduction;
  }


  return (
    <div>
      <Modal
      // eslint-disable-next-line no-useless-concat
        title={"Tree Species"+(" ")+ "("+ modelData.commonNames+ ")"}
        visible={isModalVisibleModel}
        onCancel={handleCancelModel}
        destroyOnClose={true}
        width={1000}
        style={{
          textAlign:"center"
        }}
        footer={[
          <Button key="back" onClick={handleCancelModel}>
            Cancel
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '40px' }}>
          <Row align="center ">
          <Space size={[8, 16]} wrap>
            <Col>
              <Image
                width={150}
                src={modelData.imageUrl}
              />
            </Col>
            <Col  >
              <Image
                width={150}
                src={modelData.imageUrl1}
              />
            </Col>
            <Col  >
              <Image
                width={150}
                src={modelData.imageUrl2}
              />
            </Col>
            <Col  >
              <Image
                width={150}
                src={modelData.imageUrl3}
              />
            </Col>
            </Space>
          </Row>
        </div>
        <div style={{marginBottom:'40px'}}>
        <Row gutter={[16, 16]}>
          <Col md={12} xs={24}>
            <MapChart1 data={getPhotosynthesisBiomassChartData} />
          </Col>
          <Col md={12} xs={24}>
            <MapChart2 data1={CalculateAverageO2production} data2={CalculateAverageH2Oproduction} />
          </Col>
        </Row>
        </div>
        <Card
        style={{
          marginBottom: "40px",
          // textAlign: "center",
          marginLeft: "10px",
          marginRight: "10px",
          borderRadius: "15px",
          
        }}>
        <div style={{marginBottom:'40px'}}>
        <Row gutter={[16, 16]}
        style={{
          marginBottom: "40px",
          fontSize: "17px",
          marginLeft: "35px",
          marginRight: "10px",
          marginTop: "30px"
        }}>
          <Col md={12} xs={24}
          >
            <Space direction="vertical">
             
              <div>
                <b>Plant ID</b> : {modelData.plant_id}
              </div>
              <div>
                <b>Plant Name</b> : {modelData.plantName}
              </div>
              <div>
                <b>Common Name(s)</b> : {modelData.commonNames}
              </div>
              <div>
                <b>Botanical Name	</b> : {modelData.botanicalName}
              </div>
              <div>
                <b>Origin of species</b> : {modelData.originofSpecies}
              </div>
              <div>
                <b>AF notation / physiognomy	</b> : {modelData.afNotationPhysiognomy}
              </div>
              <div>
                <b>Plant reference # on ER Plant DATABASE	</b> : {modelData.plantReference_onERPlantDatabase}
              </div>
              <div>
                <b>weightPerLeaf</b> : {modelData.weightPerLeaf}
              </div>
              <div>
                <b>Leaf cycle	</b> : {modelData.leafCycle}
              </div>
              <div>
                <b>Length</b> : {modelData.length}
              </div>

              <div>
                <b>Width</b> : {modelData.width}
              </div>
              <div>
                <b>Texture</b> : {modelData.texture}
              </div>
              <div>
                <b>Conservation Status	</b> : {modelData.conservationStatus}
              </div>
              <div>
                <b>Growth Rate	</b> : {modelData.growthRate}
              </div>


            </Space>
          </Col>
          <Col md={12} xs={24}>
            <Space direction="vertical">
              <div>
                <b>Crown type	</b> : {modelData.crownType}
              </div>
              <div>
                <b>Propagation method	</b> : {modelData.propagationMethod}
              </div>
              <div>
                <b>Root type	</b> : {modelData.rootType}
              </div>
              <div>
                <b>Preferred Soils	</b> : {modelData.preferredSolis}
              </div>
              <div>
                <b>Impact on Soil	</b> : {modelData.impactOnSoil}
              </div>
              <div>
                <b>Salinity tolerance	</b> : {modelData.salinityTolerance}
              </div>

              <div>
                <b>Human uses	</b> : {modelData.humanUses}
              </div>
              <div>
                <b>Economic Importance	</b> : {modelData.economicImportance}
              </div>
              <div>
                <b>Distribution	</b> : {modelData.distribution}
              </div>
              <div>
                <b>Light preferences	</b> : {modelData.lightPreferences}
              </div>
              <div>
                <b>Flowering time	</b> : {modelData.floweringTime}
              </div>
              <div>
                <b>Flower Color	</b> : {modelData.flowerColor}
              </div>
              <div>
                <b>Fruit type	</b> : {modelData.fruitType}
              </div>
            </Space>
          </Col>
        </Row>
        </div>
        </Card>
      </Modal>

      <Box
        component="span"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mt={1}
      >
        <h1 className={classes.mainHeading}>Tree Species</h1>
        <Input
          placeholder="Search Tree Species..."
          prefix={<SearchOutlined />}
          className={classes.headerSearch}
          onChange={(event) => { setSearchTreeSpecies(event.target.value) }}
        />
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          New
        </Button>

      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Plant Name</b></TableCell>
              <TableCell><b>Common Names</b></TableCell>
              <TableCell><b>Botanical Name</b></TableCell>
              <TableCell><b>Origin Of Species</b></TableCell>
              <TableCell><b>Fruit Type</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.filter(row => {
              if (searchTreeSpecies === '') {
                return row
              } else if (
                row.plantName.toLowerCase().includes(searchTreeSpecies.toLowerCase()) ||
                row.commonNames.toLowerCase().includes(searchTreeSpecies.toLowerCase()) ||
                row.originofSpecies.toLowerCase().includes(searchTreeSpecies.toLowerCase())
              ) {
                return row
              }
              return null
            }).map((row) => (
              <TableRow className="hoverOnRow"
                key={row.plant_id}
                id={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell onClick={() => {
                  setIsModalVisibleModel(true)
                  getTreeDetails(row.plant_id)
                }}>{row.plantName}
                </TableCell>
                <TableCell onClick={() => {
                  setIsModalVisibleModel(true)
                  getTreeDetails(row.plant_id)
                }}>{row.commonNames}
                </TableCell>
                <TableCell onClick={() => {
                  setIsModalVisibleModel(true)
                  getTreeDetails(row.plant_id)
                }}>{row.botanicalName}
                </TableCell>
                <TableCell onClick={() => {
                  setIsModalVisibleModel(true)
                  getTreeDetails(row.plant_id)
                }}>{row.originofSpecies}
                </TableCell>
                <TableCell onClick={() => {
                  setIsModalVisibleModel(true)
                  getTreeDetails(row.plant_id)
                }}>{row.fruitType}
                </TableCell>
                <TableCell align="center">
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item md={12} lg={6}>
                      <Button
                        className={classes.featuredButton}
                        type="primary"
                        onClick={() => {
                          showUpdateModal();
                          setSelectedId(row.plant_id);
                          setUpdatePlantName(row.plantName);
                          setUpdateCommonNames(row.commonNames);
                          setUpdateBotanicalName(row.botanicalName);
                          setUpdateOriginofSpecies(row.originofSpecies);
                          setUpdateFamily(row.family);
                          setUpdateAfNotationPhysiognomy(row.afNotationPhysiognomy);
                          setUpdatePlantReference_onERPlantDatabase(row.plantReference_onERPlantDatabase);
                          setUpdatePhotosyntheticBiomassYear1(row.photosyntheticBiomassYear1);
                          setUpdatePhotosyntheticBiomassYear2(row.photosyntheticBiomassYear2);
                          setUpdatePhotosyntheticBiomassYear3(row.photosyntheticBiomassYear3);
                          setUpdatePhotosyntheticBiomassYear4(row.photosyntheticBiomassYear4);
                          setUpdateWeightPerLeaf(row.weightPerLeaf);
                          setUpdateLeafCycle(row.leafCycle);
                          setUpdateLength(row.length);
                          setUpdateWidth(row.width);
                          setUpdateTexture(row.texture);
                          setUpdateConservationStatus(row.conservationStatus);
                          setUpdateGrowthRate(row.growthRate);
                          setUpdateCrownType(row.crownType);
                          setUpdatePropagationMethod(row.propagationMethod);
                          setUpdateRootType(row.rootType);
                          setUpdatePreferredSolis(row.preferredSolis);
                          setUpdateImpactOnSoil(row.impactOnSoil);
                          setUpdateSalinityTolerance(row.salinityTolerance);
                          setUpdateHumanUses(row.humanUses);
                          setUpdateEconomicImportance(row.economicImportance);
                          setUpdateDistribution(row.distribution);
                          setUpdateLightPreferences(row.lightPreferences);
                          setUpdateFloweringTime(row.floweringTime);
                          setUpdateFlowerColor(row.flowerColor);
                          setUpdateFruitType(row.fruitType);
                          setUpdsteImagePath(row.imageUrl)
                          setUpdsteImagePath1(row.imageUrl1)
                          setUpdsteImagePath2(row.imageUrl2)
                          setUpdsteImagePath3(row.imageUrl3)
                          setCheckTempUpdsteImagePath(row.imageUrl);
                          setCheckTempUpdsteImagePath1(row.imageUrl1)
                          setCheckTempUpdsteImagePath2(row.imageUrl2)
                          setCheckTempUpdsteImagePath3(row.imageUrl3)
                          
                         

                          form.setFieldsValue({
                            updatePlantName: row.plantName,
                            updateCommonNames: row.commonNames,
                            updateBotanicalName: row.botanicalName,
                            updateOriginofSpecies: row.originofSpecies,
                            updateFamily: row.family,
                            updateAfNotationPhysiognomy: row.afNotationPhysiognomy,
                            updatePlantReference_onERPlantDatabase: row.plantReference_onERPlantDatabase,
                            updatePhotosyntheticBiomassYear1: row.photosyntheticBiomassYear1,
                            updatePhotosyntheticBiomassYear2: row.photosyntheticBiomassYear2,
                            updatePhotosyntheticBiomassYear3: row.photosyntheticBiomassYear3,
                            updatePhotosyntheticBiomassYear4: row.photosyntheticBiomassYear4,
                            updateWeightPerLeaf: row.weightPerLeaf,
                            updateLeafCycle: row.leafCycle,
                            updateLength: row.length,
                            updateWidth: row.width,
                            updateTexture: row.texture,
                            updateConservationStatus: row.conservationStatus,
                            updateGrowthRate: row.growthRate,
                            updateCrownType: row.crownType,
                            updatePropagationMethod: row.propagationMethod,
                            updateRootType: row.rootType,
                            updatePreferredSolis: row.preferredSolis,
                            updateImpactOnSoil: row.impactOnSoil,
                            updateSalinityTolerance: row.salinityTolerance,
                            updateHumanUses: row.humanUses,
                            updateEconomicImportance: row.economicImportance,
                            updateDistribution: row.distribution,
                            updateLightPreferences: row.lightPreferences,
                            updateFloweringTime: row.floweringTime,
                            updateFlowerColor: row.flowerColor,
                            updateFruitType: row.fruitType,
                            updateImageUrl:row.imageUrl
                          })
                        }}
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
                          setSelectedId(row.plant_id);
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
                      onClick={handleDeleteTreeSpecies}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableRow>
            ))}

            <Modal
              title="Add New Tree Species"
              destroyOnClose={true}
              visible={isModalVisible}
              onCancel={handleCancel}
              onOk={() => { handleAddFormSubmit() }}
              okButtonProps={{ disabled: buttonDisabled }}
              
            >
              <Form {...layout}
                form={form}
                onFieldsChange={() => {
                  if (!plantName ||
                    !commonNames ||
                    !botanicalName ||
                    !plantName ||
                    !commonNames ||
                    !botanicalName ||
                    !originofSpecies ||
                    !family ||
                    !afNotationPhysiognomy ||
                    !plantReference_onERPlantDatabase ||
                    !photosyntheticBiomassYear1 ||
                    !photosyntheticBiomassYear2 ||
                    !photosyntheticBiomassYear3 ||
                    !photosyntheticBiomassYear4 ||
                    !weightPerLeaf ||
                    !leafCycle ||
                    !length ||
                    !width ||
                    !texture ||
                    !conservationStatus ||
                    !growthRate ||
                    !crownType ||
                    !propagationMethod ||
                    !rootType ||
                    !preferredSolis ||
                    !impactOnSoil ||
                    !salinityTolerance ||
                    !humanUses ||
                    !economicImportance ||
                    !distribution ||
                    !lightPreferences ||
                    !floweringTime ||
                    !flowerColor ||
                    !fruitType 
                  ) {
                    setButtonDisabled(true);
                  }
                  else if (form.getFieldsError().some((field) => field.errors.length > 0)) {
                    setButtonDisabled(true)
                  } else {
                    setButtonDisabled(false)
                  }
                }
                }
              >
                <Form.Item
                  name={["user", "image"]}
                  label="Image 1">
                  <Input
                    type="file"
                    accept="image/*"

                    onChange={(event) =>
                      setImagePath(event.target.files[0])
                    }
                  />
                  <br/>
                  
                  {imagePath &&  <img src={URL.createObjectURL(imagePath)} alt="img" />}
                 
                </Form.Item>
                <Form.Item
                  name={["user", "image"]}
                  label="Image 2">
                  <Input
                    type="file"
                    accept="image/*"

                    onChange={(event) =>
                      setImagePath1(event.target.files[0])
                    }
                  />
                  <br/>
                  
                  {imagePath1 &&  <img src={URL.createObjectURL(imagePath1)} alt="img" />}
                 
                </Form.Item>
                <Form.Item
                  name={["user", "image"]}
                  label="Image 3">
                  <Input
                    type="file"
                    accept="image/*"

                    onChange={(event) =>
                      setImagePath2(event.target.files[0])
                    }
                  />
                  <br/>
                  
                  {imagePath2 &&  <img src={URL.createObjectURL(imagePath2)} alt="img" />}
                 
                </Form.Item>
                <Form.Item
                  name={["user", "image"]}
                  label="Image 4">
                  <Input
                    type="file"
                    accept="image/*"

                    onChange={(event) =>
                      setImagePath3(event.target.files[0])
                    }
                  />
                  <br/>
                  
                  {imagePath3 &&  <img src={URL.createObjectURL(imagePath3)} alt="img" />}
                 
                </Form.Item>
                <Form.Item
                  name="plantName"
                  label="Plant Name"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter plant name"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="text"
                    value={plantName}
                    onChange={(event) => setPlantName(event.target.value)}
                  />
                </Form.Item>
                <Form.Item name="commonNames" label="Common Names"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter common names"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="text"
                    value={commonNames}
                    onChange={(event) => setCommonNames(event.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="botanicalName"
                  label="Botanical Name"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter botanical name"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter origin of species"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter family"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter af notation physiognomy"
                    },
                    {
                      whitespace: true
                    },
                    { min: 2 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter plant preference"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter photosynthetic biomass year 1"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter photosynthetic biomass year 2"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter photosynthetic biomass year 3"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="text"
                    value={photosyntheticBiomassYear3}
                    onChange={(event) => setPhotosyntheticBiomassYear3(event.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="photosyntheticBiomassYear4"
                  label="Photosynthetic Biomass Year 4"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter photosynthetic biomass year 4"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter weight per leaf"
                    },
                    {
                      whitespace: true
                    },
                    { max: 5 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter leaf cycle"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter length"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter width"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z-]",
                      message: "Please enter texture"
                    },
                    {
                      whitespace: true
                    },

                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z-]",
                      message: "Please enter conservation status"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter growth rate"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter crown type"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter propagation method"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter root type"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter preferred soils"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter impact on soil"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z-]",
                      message: "Please enter salinity tolerance"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z-]",
                      message: "Please enter human uses"
                    },
                    {
                      whitespace: true
                    },

                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter economic distribution"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },

                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter distribution"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter light preferences"
                    },
                    {
                      whitespace: true
                    },

                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter flowering time"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
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
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter flower color"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="text"
                    value={flowerColor}
                    onChange={(event) => setFlowerColor(event.target.value)}
                  />


                  {/* Try Some Dropdown to select color */}
                  {/* <select style={{width:"236px",
              padding:"5px",
              borderRadius:"5px",
              marginRight: "0px",
              marginLeft: "0px",
              height:"40px",
              borderColor : "#C8C8C8",
              background: "transparent",
              cursor: "pointer"
            }} onChange={(e) => {  
                  const selectedcolor = e.target.value;
                  setFlowerColor(selectedcolor)
              }}>
                <option value="">---Select Color---</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
                <option value="Red">red</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
                <option value="Red">red</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
                <option value="Red">red</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
                <option value="Red">red</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
                <option value="Red">red</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
                <option value="Red">red</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
                <option value="Red">red</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
                <option value="Red">red</option>
                <option value="Green">green</option>
                <option value="blue">blue</option>
              </select> */}

                </Form.Item>
                <Form.Item
                  name="fruitType"
                  label="Fruit Type"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter fruit type"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="text"
                    value={fruitType}
                    onChange={(event) => setFruitType(event.target.value)}
                  />

                </Form.Item>
              </Form>
            </Modal>



            <Modal
              title="Update Tree Species"
              visible={isUpdateModalVisible}
              onCancel={handleUpdateCancel}
              onOk={() => { handleUpdateTreeSpecies() }}
              okButtonProps={{ disabled: buttonDisabled2 }}
              destroyOnClose={true}
            >
              <Form autoComplete="off"
                form={form}
                onFieldsChange={() => {
                 
            
                  if (form.getFieldsError().some((field) => field.errors.length > 0)) {
                    setButtonDisabled2(true)
                  } else {
                    setButtonDisabled2(false)
                  }
                }}
              >
                 <Form.Item
                  name={["user", "image"]}
                  label="Image">
                  <Input
                    type="file"
                    accept="image/*"

                    onChange={(event) => {
                      setUpdsteImagePath(event.target.files[0])
                      setButtonDisabled2(false)
                    }
                    }
                  />
                  <br/>
                  
                  {updsteImagePath === checkTempupdsteImagePath ? <img src={updsteImagePath} alt="img" />: <img src={URL.createObjectURL(updsteImagePath)} alt="img" />}
                 
                </Form.Item>

                 <Form.Item
                  name={["user", "image"]}
                  label="Image">
                  <Input
                    type="file"
                    accept="image/*"

                    onChange={(event) =>{
                      setUpdsteImagePath1(event.target.files[0])
                      setButtonDisabled2(false)
                    }
                     
                    }
                  />
                  <br/>
                  
                  {updsteImagePath1 === checkTempupdsteImagePath1 ? <img src={updsteImagePath1} alt="img" />: <img src={URL.createObjectURL(updsteImagePath1)} alt="img" />}
                 
                </Form.Item>
                <Form.Item
                  name={["user", "image"]}
                  label="Image">
                  <Input
                    type="file"
                    accept="image/*"

                    onChange={(event) =>{
                      setUpdsteImagePath2(event.target.files[0])
                      setButtonDisabled2(false)
                    }
                      
                    }
                  />
                  <br/>
                  
                  {updsteImagePath2 === checkTempupdsteImagePath2 ? <img src={updsteImagePath2} alt="img" />: <img src={URL.createObjectURL(updsteImagePath2)} alt="img" />}
                 
                </Form.Item>
                <Form.Item
                  name={["user", "image"]}
                  label="Image">
                  <Input
                    type="file"
                    accept="image/*"

                    onChange={(event) =>{
                      setUpdsteImagePath3(event.target.files[0])
                      setButtonDisabled2(false)
                    }
                      
                    }
                  />
                  <br/>
                  
                  {updsteImagePath3 === checkTempupdsteImagePath3 ? <img src={updsteImagePath3} alt="img" />: <img src={URL.createObjectURL(updsteImagePath3)} alt="img" />}
                 
                </Form.Item> 
                <Form.Item
                  name="updatePlantName"
                  label="Plant Name"
                  rules={[
                    {
                      required: true,
                      pattern: "[A-Za-z]",
                      message: "Please enter plant name"

                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input name="updatePlantName" onChange={(event) => setUpdatePlantName(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateCommonNames"
                  label="Common Names"
                  rules={[
                    {
                      required: true,
                      pattern: "[A-Za-z]",
                      message: "Please enter common name"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateCommonNames" onChange={(event) => setUpdateCommonNames(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateBotanicalName"
                  label="Botanical Name"
                  rules={[
                    {
                      required: true,
                      pattern: "[A-Za-z]",
                      message: "Please enter botanical name"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateBotanicalName" onChange={(event) => setUpdateBotanicalName(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateOriginofSpecies"
                  label="Origin Of Species"
                  rules={[
                    {
                      required: true,
                      pattern: "[A-Za-z]",
                      message: "Please enter origin of species"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },

                  ]}
                  hasFeedback
                >
                  <Input name="updateOriginofSpecies" onChange={(event) => setUpdateOriginofSpecies(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateFamily"
                  label="Family"
                  rules={[
                    {
                      required: true,
                      pattern: "[A-Za-z]",
                      message: "Please enter family"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateFamily" onChange={(event) => setUpdateFamily({ email: event.target.value })} />
                </Form.Item>

                <Form.Item
                  name="updateAfNotationPhysiognomy"
                  label="Af Notation Physiognomy"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter Af Notation Physiognomy"
                    },
                    {
                      whitespace: true
                    },
                    { min: 2 },

                  ]}
                  hasFeedback
                >
                  <Input name="updateAfNotationPhysiognomy" onChange={(event) => setUpdateAfNotationPhysiognomy(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updatePlantReference_onERPlantDatabase"
                  label="Plant Reference_on ER Plant Database"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter plant reference"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updatePlantReference_onERPlantDatabase" onChange={(event) => setUpdatePlantReference_onERPlantDatabase(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updatePhotosyntheticBiomassYear1"
                  label="Photosynthetic Biomass Year 1"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter photosynthetic biomass year 1"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updatePhotosyntheticBiomassYear1" onChange={(event) => setUpdatePhotosyntheticBiomassYear1(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updatePhotosyntheticBiomassYear2"
                  label="Photosynthetic Biomass Year 2"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter photosynthetic biomass year 2"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updatePhotosyntheticBiomassYear2" onChange={(event) => setUpdatePhotosyntheticBiomassYear2(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updatePhotosyntheticBiomassYear3"
                  label="Photosynthetic Biomass Year 3"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter photosynthetic biomass year 3"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updatePhotosyntheticBiomassYear3" onChange={(event) => setUpdatePhotosyntheticBiomassYear3(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updatePhotosyntheticBiomassYear4"
                  label="Photosynthetic Biomass Year 4"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter photosynthetic biomass year 4"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updatePhotosyntheticBiomassYear4" onChange={(event) => setUpdatePhotosyntheticBiomassYear4(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateWeightPerLeaf"
                  label="Weight Per Leaf"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter weight per leaf"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateWeightPerLeaf" onChange={(event) => setUpdateWeightPerLeaf(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateLeafCycle"
                  label="Leaf Cycle"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter leaf cycle"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateLeafCycle" onChange={(event) => setUpdateLeafCycle(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateLength"
                  label="Length"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter length"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateLength" onChange={(event) => setUpdateLength(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateWidth"
                  label="Width"
                  rules={[
                    {
                      required: true,
                      pattern: "^[0-9]",
                      message: "Please enter width"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateWidth" onChange={(event) => setUpdateWidth(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateTexture"
                  label="Texture"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z-]",
                      message: "Please enter texture"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateTexture" onChange={(event) => setUpdateTexture(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateConservationStatus"
                  label="Conservation Status"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter perimeter"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateConservationStatus" onChange={(event) => setUpdateConservationStatus(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateGrowthRate"
                  label="Growth Rate"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter growth rate"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateGrowthRate" onChange={(event) => setUpdateGrowthRate(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateCrownType"
                  label="Crown Type"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter crown type"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },

                  ]}
                  hasFeedback
                >
                  <Input name="updateCrownType" onChange={(event) => setUpdateCrownType(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updatePropagationMethod"
                  label="Propagation Method"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter propagation method"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4 },

                  ]}
                  hasFeedback
                >
                  <Input name="updatePropagationMethod" onChange={(event) => setUpdatePropagationMethod(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateRootType"
                  label="Root Type"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter root type"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateRootType" onChange={(event) => setUpdateRootType(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updatePreferredSolis"
                  label="Preferred Soils"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter preferred soils"
                    },
                    {
                      whitespace: true
                    },
                    { min: 4 }
                  ]}
                  hasFeedback
                >
                  <Input name="updatePreferredSolis" onChange={(event) => setUpdatePreferredSolis(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateImpactOnSoil"
                  label="Impact On Soil"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter impact on soil"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateImpactOnSoil" onChange={(event) => setUpdateImpactOnSoil(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateSalinityTolerance"
                  label="Salinity Tolerance"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter salinity tolerance"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateSalinityTolerance" onChange={(event) => setUpdateSalinityTolerance(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateHumanUses"
                  label="Human Uses"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z-]",
                      message: "Please enter human uses"
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
                >
                  <Input name="updateHumanUses" onChange={(event) => setUpdateHumanUses(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateEconomicImportance"
                  label="Economic Importance"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter economic importance"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateEconomicImportance" onChange={(event) => setUpdateEconomicImportance(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateDistribution"
                  label="Distribution"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter distribution"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateDistribution" onChange={(event) => setUpdateDistribution(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateLightPreferences"
                  label="Light Preferences"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter light preferences"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateLightPreferences" onChange={(event) => setUpdateLightPreferences(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateFloweringTime"
                  label="Flowering Time"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter flowering time"
                    },
                    {
                      whitespace: true
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateFloweringTime" onChange={(event) => setUpdateFloweringTime(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateFlowerColor"
                  label="Flower Color"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter flower color"
                    },
                    {
                      whitespace: true
                    },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input name="updateFlowerColor" onChange={(event) => setUpdateFlowerColor(event.target.value)} />
                </Form.Item>

                <Form.Item
                  name="updateFruitType"
                  label="Fruit Type"
                  rules={[
                    {
                      required: true,
                      pattern: "^[A-Za-z]",
                      message: "Please enter fruit type"
                    },
                    {
                      whitespace: true
                    }
                  ]}
                  hasFeedback
                >
                  <Input name="updateFruitType" onChange={(event) => setUpdateFruitType(event.target.value)} />
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