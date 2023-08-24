import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import { Row, Col, Space, Input } from "antd";
import L from "leaflet";
import greenIcon from "../assets/images/map-green-icon.svg";
import goldIcon from "../assets/images/map-gold-icon.svg";
import silverIcon from "../assets/images/map-silver-icon.svg";
import service from "./../services/data-service";
import { Button, Modal, Card } from 'antd';
import "antd/dist/antd.css";
import MapChart1 from '../components/chart/MapChart1';
import MapChart2 from '../components/chart/MapChart2';
import LandService from "./../services/landowner-service";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import AuthService from "./../services/auth-service";

function Calculation() {
  const [auditedTrees, setAuditedTrees] = useState([]);
  const [treeID, setTreeID] = useState([]);
  const [plants, setPlants] = useState([]);
  const [lands, setLands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [TreeIdEroor, setTreeIdEroor] = useState(false);
  const [item, setItem] = useState();
  const [invested, setInvested] = useState(false);

  const [photosyntheticBiomassYear1, setPhotosyntheticBiomassYear1] = useState([]);
  const [photosyntheticBiomassYear2, setPhotosyntheticBiomassYear2] = useState([]);
  const [photosyntheticBiomassYear3, setPhotosyntheticBiomassYear3] = useState([]);
  const [photosyntheticBiomassYear4, setPhotosyntheticBiomassYear4] = useState([]);

  const [o2ProductionYear1, setO2ProductionYear1] = useState([]);
  const [o2ProductionYear2, setO2ProductionYear2] = useState([]);
  const [o2ProductionYear3, setO2ProductionYear3] = useState([]);
  const [o2ProductionYear4, setO2ProductionYear4] = useState([]);

  const [h2oProductionYear1, setH2oProductionYear1] = useState([]);
  const [h2oProductionYear2, setH2oProductionYear2] = useState([]);
  const [h2oProductionYear3, setH2oProductionYear3] = useState([]);
  const [h2oProductionYear4, setH2oProductionYear4] = useState([]);

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

  const [map, setMap] = useState(null);
  const { getPlantedTrees, getAuditedTreesOnLifeForceBlockView, updateInvestorID, updateInvestmentValue } = service();
  const { getLandOwners } = LandService();
  const { getID } = AuthService();

  //after investing updating investorID 
  async function updateInvestorIDForTree(treeID, investorID) {
    try {
      const formData = {
        investorID: investorID
      };
      const updatedData = await updateInvestorID(treeID, formData);
      console.log('InvestorID updated successfully:', updatedData);
    } catch (error) {
      console.error('Failed to update InvestorID:', error);
    }
  }
  
  async function updateInvestmentForTree(treeID, investmentValue) {
    try {
      const formData = {
        investment: investmentValue, // Make sure the property name matches the expected parameter in updateInvestmentValue()
      };
      const updatedData = await updateInvestmentValue(treeID, formData);
      console.log('investment value updated successfully to 1', updatedData);
    } catch (error) {
      console.error('Failed to update investmentValue:', error);
    }
  }


  const getTreeDetails = async (item) => {
    console.log("getTreeDetails from Calculation.js", item)
  }

  const getPhotosynthesisBiomassChartData = () => {
    let year1 = photosyntheticBiomassYear1 ? photosyntheticBiomassYear1 : null;
    let year2 = photosyntheticBiomassYear2 ? photosyntheticBiomassYear2 : null;
    let year3 = photosyntheticBiomassYear3 ? photosyntheticBiomassYear3 : null;
    let year4 = photosyntheticBiomassYear4 ? photosyntheticBiomassYear4 : null;

    let data = [0, year1, year2, year3, year4];
    return data;
  }

  const CalculateAverageO2production = () => {
    

    if (photosyntheticBiomassYear1 == null) {
      setO2ProductionYear1(null)
    } else {
      setO2ProductionYear1((photosyntheticBiomassYear1 * 0.4) / 1.429)

    }

    if (photosyntheticBiomassYear2 == null) {
      setO2ProductionYear2(null)
    } else {
      setO2ProductionYear2((photosyntheticBiomassYear2 * 0.4) / 1.429)
    }

    if (photosyntheticBiomassYear3 == null) {
      setO2ProductionYear3(null)
    } else {
      setO2ProductionYear3((photosyntheticBiomassYear3 * 0.4) / 1.429)
    }


    if (photosyntheticBiomassYear4 == null) {
      setO2ProductionYear4(null)
    } else {
      setO2ProductionYear4((photosyntheticBiomassYear4 * 0.4) / 1.429)

    }

    

    let o2Production = [0, o2ProductionYear1, o2ProductionYear2, o2ProductionYear3, o2ProductionYear4];

    return o2Production;
  }

  const reset = () => {
    setPhotosyntheticBiomassYear1(null);
    setPhotosyntheticBiomassYear2(null);
    setPhotosyntheticBiomassYear3(null);
    setPhotosyntheticBiomassYear4(null);
  }


  const CalculateAverageH2Oproduction = () => {
    

    if (photosyntheticBiomassYear1 == null) {
      setH2oProductionYear1(null)
    } else {
      setH2oProductionYear1((photosyntheticBiomassYear1 * 100) / 1000)

    }

    if (photosyntheticBiomassYear2 == null) {
      setH2oProductionYear2(null)
    } else {
      setH2oProductionYear2((photosyntheticBiomassYear2 * 100) / 1000)

    }

    if (photosyntheticBiomassYear3 == null) {
      setH2oProductionYear3(null)
    } else {
      setH2oProductionYear3((photosyntheticBiomassYear3 * 100) / 1000)

    }


    if (photosyntheticBiomassYear4 == null) {
      setH2oProductionYear4(null)
    } else {
      setH2oProductionYear4((photosyntheticBiomassYear4 * 100) / 1000)

    }

    let h2oProduction = [0, h2oProductionYear1, h2oProductionYear2, h2oProductionYear3, h2oProductionYear4];

    return h2oProduction;
  }

  const getAuditedTreesOnLifeForceBlockViewNewFunction = async (Id) => {
    reset()
    const res = await getAuditedTreesOnLifeForceBlockView(Id);
    console.log("HIIII", res.data.Result)
    setAuditedTrees(res.data.Result)
    console.log(auditedTrees)
    if (auditedTrees.length > 0) {

      for (let i = 0; i < auditedTrees.length; i++) {
        const item = auditedTrees[i];

        if (item.servicingYear === 1) {
          setPhotosyntheticBiomassYear1(item.photoBiomass);
        }
        else if (item.servicingYear === 2) {
          setPhotosyntheticBiomassYear2(item.photoBiomass);
        } else if (item.servicingYear === 3) {

          setPhotosyntheticBiomassYear3(item.photoBiomass);

        } else if (item.servicingYear === 4) {

          setPhotosyntheticBiomassYear4(item.photoBiomass);
        }

      }
    }
    else {
      setPhotosyntheticBiomassYear1(null);
      setPhotosyntheticBiomassYear2(null);
      setPhotosyntheticBiomassYear3(null);
      setPhotosyntheticBiomassYear4(null);

    }
  }




  const showModal = (item, invested) => {

    setInvested(item.investment);
    setItem(item);
    setTreeID(item.treeID)

    setTimeout(() => {
      setIsModalVisible(true);
    }, 200);

    console.log("viewed tree:", item);
    console.log("Invested:", invested);
    console.log("viewed tree treeID:", treeID);
    console.log("investor ID :", item.investorID);
    getAuditedTreesOnLifeForceBlockViewNewFunction(item.treeID)
  };

  //setPlants
  useEffect(() => {
    
    async function getAllPlants() {
      const res = await getPlantedTrees();
      setPlants(res);
      console.log("getPlantedTrees", res);
    }
    getAllPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  
  //setLands
  useEffect(() => {
    async function getAllLands() {
      const res = await getLandOwners();
      setLands(res);
      console.log("getAllLands", res);
    }
    
    getAllLands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  //map geo-search

  const renderPlants = (plants) => {
    let plant = plants.filter(v => v?.longitude !== null);
    return plant?.map((item) => {
      var today = new Date();
      var dateofPlanting = new Date(item?.dateofPlanting);
      const diffTime = Math.abs(today - dateofPlanting);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const isExpired = (diffDays > 1460) ? (true) : (false);
      //const invested = (item?.investment === 1) ? (true) : (false);
      return (

        <Marker
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
            click: (e) => {
              showModal(item, invested, isExpired);
            },
          }}
          position={[item?.latitude, item?.longitude]}
          icon={(isExpired) ? (markerIconGold) : (item?.investment) ? (markerIconGreen) : (markerIconSilver)}>
          <Popup>
            <h1>{item.treeSpecies}</h1>
            <h1>{item.treeID}</h1>
          </Popup>
        </Marker>

      )
    })
  };
  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        // style: 'bar',    //uncomment to get bar type appiarance in map geo search
        marker: {
          icon,
        },
      });

      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  }

  const createString = (res) => {
    const replacedObject = res.toString();
    const replacedObject2 = replacedObject.replaceAll("|", ",");
    const replacedObject3 = replacedObject2.replaceAll("[", "");
    const replacedObject4 = replacedObject3.replaceAll("]", "");
    return replacedObject4;
  };

  const renderLand = (lands) => {
    let land = lands.filter((l) => l?.perimeter !== null);
    return land?.map((land) => {
      let peri = land?.perimeter;

      const periNew = createString(peri);
      const arr = periNew.split(",").map((element) => {
        return Number(element);
      });


      if (arr.length >= 6) {
        const perChunk = 2;

        const result = arr.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / perChunk);
          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
          }
          resultArray[chunkIndex].push(item);
          return resultArray;
        }, []);

        result.map((row) => [row[1], row[0]]);
        const greenOptions = { color: "green", opacity: "0.2" };
        return <Polygon pathOptions={greenOptions} positions={result} />;
      } else {
        return null;
      }
    });
  };

  const handleCancel2 = () => {
    setTreeIdEroor(false);
  };

  const markerIconGreen = new L.Icon({
    iconUrl: greenIcon,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const markerIconGold = new L.Icon({
    iconUrl: goldIcon,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const markerIconSilver = new L.Icon({
    iconUrl: silverIcon,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //disply invest button
  const displayButton = (invested) => {
    if (invested === 1) {
      return [
        <Button key="delete" type="primary" disabled onClick={routeChange}>
          Invest
        </Button>,

        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ];
    } else {
      return [
        <Button key="delete" type="primary" onClick={routeChange}>
          Invest
        </Button>,


        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ];
    }
  };

  const routeChange = async () => {
    if (invested === 0) {
      try {
        getTreeDetails(item);
        console.log("invested tree", item);
        const id = getID();
        console.log("investor id", id);
        await updateInvestorIDForTree(treeID, id); // Add 'await' to ensure proper execution order
        console.log("before investing", invested);
      } catch (error) {
        console.error('Failed to update investor ID:', error);
        return;
      }
    }

    const updatedInvestmentValue = 1;
    await updateInvestmentForTree(treeID, updatedInvestmentValue); // Add 'await' to ensure proper execution order
    setInvested(updatedInvestmentValue);
    console.log("after investing", invested);
  };


  const useStyles = makeStyles({
    headerSearch: {
      width: "220px",
      borderRadius: "7px",
      marginRight: "10px",
      marginLeft: "10px",
    },
  })

  const classes = useStyles();
  function DisplayPosition({ map }) {
    const [searchTreeId, setsearchTreeId] = useState();

    const SearchTree = (event) => {
      setsearchTreeId(event.target.value);
    }

    const checkTreeID = () => {
      let plant = plants.filter(v => v?.longitude !== null);
      var setcount = 0
      return plant?.map((item) => {
        if (searchTreeId === item?.treeID) {
          // return (
          const latitude = item?.latitude
          const longitude = item?.longitude
          const area = [latitude, longitude]

          onClick(area)

        }
        else {
          setcount = setcount + 1
        }
        if (plants.length === setcount) {

          setTreeIdEroor(true)
        }
        return null;
      })
    }

    const onClick = (area) => {
      map.flyTo(area, 22)

    }


    return (
      <>
        <p>
          <Input
            className={classes.headerSearch}
            placeholder="Tree ID"
            onChange={SearchTree}
          />
          <Button onClick={checkTreeID}>Search</Button>
        </p>


        <Dialog
          aria-labelledby="dialog-title"
          open={TreeIdEroor}
          onClose={() => handleCancel2(false)}
          hideBackdrop
          PaperProps={{
            elevation: 0,
            sx: {
              boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
            },
          }}
        >
          <DialogTitle id="dialog-title">
            Tree ID Is not valid. Please Enter valid ID
          </DialogTitle>
          <DialogActions>
            <Button type="primary" onClick={() => handleCancel2(false)}>
              OK
            </Button>
          </DialogActions>
        </Dialog>

      </>
    )
  }


  return (
    <>
      <div align="right">
        {map ? <DisplayPosition map={map} /> : null}
      </div>



      <MapContainer center={[6.8259, 80.9982]} zoom={14} scrollWheelZoom={true} maxZoom={25} ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletgeoSearch />

        {renderPlants(plants)}

        {renderLand(lands)}

        <Modal


          title={[<b>{item?.treeSpecies} </b>, <br />, "( ", item?.treeID, " )"]}
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1100}
          footer={displayButton(invested)}
        >
          <Row gutter={[16, 16]}>
            <Col md={12} xs={24}>
              <Space direction="vertical">
                <div key={0}>
                  <b>landOwnerID
                  </b> : {item?.landOwnerID}
                </div>
                <div key={1}>
                  {/* <b>Contact Number</b> : {contactNum} */}
                  <b>Contact Number</b> : {item?.dateofPlanting}
                </div>
              </Space>
            </Col>

            <Col md={12} xs={24}>
              <Space direction="vertical">
                <div key={2}>

                  <b>Land Owner Name</b> : {item?.landOwnerName}
                </div>
                <div key={3}>
                  <b>Date of Plant</b> : {item?.dateofPlanting.split('T')[0]}
                </div>
              </Space>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col md={12} xs={24}>
              <Card bordered={false} className="criclebox h-full">

                {!(auditedTrees.length === 0) && <MapChart1 data={getPhotosynthesisBiomassChartData} />}
                {/* <MapChart1 data={getPhotosynthesisBiomassChartData} /> */}


              </Card>
            </Col>

            <Col md={12} xs={24}>
              <Card bordered={false} className="criclebox h-full">
                {!(auditedTrees.length === 0) && <MapChart2 data1={CalculateAverageH2Oproduction} data2={CalculateAverageO2production} />}

              </Card>
            </Col>
          </Row>
        </Modal>
      </MapContainer>

    </>
  )
}

export default Calculation;