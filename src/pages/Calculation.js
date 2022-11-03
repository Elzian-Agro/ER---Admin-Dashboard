import React, { useState, useEffect,useCallback } from 'react';
import { MapContainer, TileLayer, Marker,Popup, Polygon} from 'react-leaflet';
import { Row, Col, Space,Input } from "antd";
import L from "leaflet";
import greenIcon from "../assets/images/map-green-icon.svg";
import goldIcon from "../assets/images/map-gold-icon.svg";
import silverIcon from "../assets/images/map-silver-icon.svg";
import service from "./../services/data-service";
import { Button, Modal, Card } from 'antd';
import "antd/dist/antd.css";
import MapChart1 from '../components/chart/MapChart1';
import MapChart2 from '../components/chart/MapChart2';
import AuditorService from '../services/auditor-service';
import LandService from "./../services/landowner-service";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";



function Calculation() {

  const [plants, setPlants] = useState([]);
  const [calData, setCalData] = useState([]);
  const [lands, setLands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [TreeIdEroor, setTreeIdEroor] = useState(false);
  const [item, setItem] = useState();
  const [invested, setInvested] = useState(false);
  const [bioMass, setBioMass] = useState([]);
  const [h2oVal, setH2oVal] = useState([]);
  const [o2Val, setO2val] = useState([]);
  const [landOWner, setLandOWner] = useState();
  const [contactNum, setContactNum] = useState();
  const [email, setEmail] = useState();
  const [map, setMap] = useState(null);
  
  
  let dataForBioMass = [];
  let dataForH2o = [];
  let dataForO2 = []
  
  const {
    getPlantedTrees,
  } = service();
  const {
    getDataForCalculation,
  } = AuditorService();

  const {
    getLandOwners,
  } = LandService();
  
  const getTreeDetails = (item) => { 
    const filttedArray = calData.filter(calData => calData.treeID === item.treeID);
    const sortedArray = filttedArray.sort((a, b) => {
      return parseFloat(a.servicingYear) - parseFloat(b.servicingYear);
    });
    let preDataForBioMass = sortedArray.map(item => parseFloat(item?.photoBiomass));
    let preDataForH2o = sortedArray.map(item => parseFloat(item?.volofH2O));
    let preDataForO2 = sortedArray.map(item => parseFloat(item?.volofOxygen));
    const startingElement = 0
    dataForBioMass = [startingElement].concat(preDataForBioMass)
    dataForH2o = [startingElement].concat(preDataForH2o)
    dataForO2 = [startingElement].concat(preDataForO2)
    const landOwnerName = filttedArray.map(item => item?.landOwnerName);
    const contactNumber = filttedArray.map(item => item?.contactNumber);
    const email = filttedArray.map(item => item?.email);
    
    setBioMass(dataForBioMass);
    setH2oVal(dataForH2o);
    setO2val(dataForO2);
    setLandOWner(landOwnerName[0]);
    setContactNum(contactNumber[0]);
    setEmail(email[0]);
  }
  
  const showModal = (item, invested) => {
    setInvested(invested);
    setItem(item);
    getTreeDetails(item);
    setTimeout(() => {
      setIsModalVisible(true)
    }, 200);
    
  };
  
  useEffect(() => {
      async function getAllPlants() {
        const res = await getPlantedTrees();
        setPlants(res);
      }
      getAllPlants();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  useEffect(() => {
      async function getAllLands() {
        const res = await getLandOwners();
        setLands(res);
      }
      getAllLands();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const renderPlants = (plants) => {
    let plant = plants.filter(v => v?.longitude !== null);
      return plant?.map((item) => {
        var today = new Date();
        var dateofPlanting = new Date(item?.dateofPlanting);
        const diffTime = Math.abs(today - dateofPlanting);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isExpired = (diffDays > 1460) ? (true) : (false);
        const invested = (item?.investment===1) ? (true) : (false);
          return (
        
            <Marker
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (e) => {
                  showModal(item, invested, isExpired );
                },
              }}
              position={[item?.latitude, item?.longitude]} 
              icon={(isExpired) ? (markerIconGold) :  (item?.investment) ? (markerIconSilver) : (markerIconGreen)}>
              <Popup>
                  <h1>{item.treeSpecies}</h1>
                  <h1>{item.treeID}</h1>
              </Popup>
              </Marker>
     
          )
      })
  };

  const createString = (res) => { 
    const replacedObject = res.toString()
    const replacedObject2 = replacedObject.replaceAll('|', ',');
    const replacedObject3 = replacedObject2.replaceAll('[', '');
    const replacedObject4 = replacedObject3.replaceAll(']', '');
    return replacedObject4;
   }
  
  const renderLand = (lands) => {
    let land = lands.filter(l => l?.perimeter !==null);
    return land?.map((land) => {
      let peri = land?.perimeter;
        
      const periNew = createString(peri);
      const arr = periNew.split(',').map(element => {
        return Number(element);
      });

      const perChunk = 2    
          
      const result = arr.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/perChunk)
            
      if(!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []
        }
            
      resultArray[chunkIndex].push(item)
            
      return resultArray
      }, [])
          
       result.map((row) => [row[1], row[0]])
          
       const greenOptions = { color: 'green' , opacity: '0.2' }
          
       return(
         <Polygon pathOptions={greenOptions} positions={result} />
       )
    }) 
};
      
const markerIconGreen = new L.Icon({
  iconUrl : greenIcon,
  iconSize : [35, 45],
  iconAnchor : [17, 46],
  popupAnchor : [0, -46],
});

const markerIconGold = new L.Icon({
  iconUrl : goldIcon,
  iconSize : [35, 45],
  iconAnchor : [17, 46],
  popupAnchor : [0, -46],
});

const markerIconSilver = new L.Icon({
  iconUrl : silverIcon,
  iconSize : [35, 45],
  iconAnchor : [17, 46],
  popupAnchor : [0, -46],
});

const handleCancel = () => {
  setIsModalVisible(false);
  };
const handleCancel2 = () => {
  setTreeIdEroor(false);
  };

useEffect(() => {
  async function getDC() {
    const res = await getDataForCalculation();
    setCalData(res);
  }
  getDC();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const displayButton = (invested) => {
  if (invested===(true)){
    return(
      [
      <Button
        key="delete"
        type="primary"
        disabled
        onClick={routeChange}>
          Invest
      </Button>,

      <Button 
        key="back"
        onClick={handleCancel}>
          Cancel
      </Button>,
    ]
    )
  }
  else{
    return(
      [
        <Button
          key="delete"
          type="primary"
          onClick={routeChange}>
            Invest
        </Button>,

        <Button
          key="back"
          onClick={handleCancel}>
            Cancel
        </Button>,
      ]
      )    
    }
  }
  
  const history = useHistory();
  
  const routeChange = () =>{
    if (invested===(false)){
      let path = `/billing`; 
      history.push(path); 
    }
  }


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
    const [position, setPosition] = useState(() => map.getCenter())
    const [searchTreeId, setsearchTreeId] = useState();

    const SearchTree=(event)=> {
      setsearchTreeId(event.target.value);
      
    }

    const checkTreeID=()=>{
      let plant = plants.filter(v => v?.longitude !== null);
      var setcount = 0
        return plant?.map((item) => {
          const invested = (item?.investment===1) ? (true) : (false);
          if (searchTreeId === item?.treeID) {
            // return (
              const latitude = item?.latitude
              const longitude = item?.longitude
              const area = [latitude,longitude]
              
              onClick(area)
              setPosition(area)  
          }
          else{
            setcount = setcount+1
          }

          if (plants.length === setcount ) {

             setTreeIdEroor(true)
          }
        })
    }
  
    const onClick = (area) => {
      map.flyTo(area, 22)
      //const circle = L.marker(event, radius);
      //circle.addTo(map);
    }
  
    const onMove = useCallback(() => {
      setPosition(map.getCenter())
    }, [map])
  
    useEffect(() => {
      map.on('move', onMove)
      return () => {
        map.off('move', onMove)
      }
    }, [map, onMove])
  
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
  
       
  
    <MapContainer center={[6.8259, 80.9982]} zoom={14} scrollWheelZoom={true}  maxZoom={25} ref={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
   
      {renderPlants(plants)}

      {renderLand(lands)}
    
      <Modal 
        title= {[ <b>{item?.treeSpecies} </b>,<br/>, '( ',item?.treeID, ' )']}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1100}
        footer={displayButton(invested)}>
          <Row gutter={[16, 16]}>
          <Col md={12} xs={24}>
              <Space direction="vertical">
                <div key={0}>
                  <b>landOwner Name</b> : {landOWner} ( {item?.landOwnerID} )
                </div>
                <div key={1}>
                  <b>Contact Number</b> : {contactNum}
                </div>
              </Space>
            </Col>

            <Col md={12} xs={24}>
              <Space direction="vertical">
                <div key={2}>
                  <b>Email Address</b> : {email}
                </div>
                <div key={3}>
                  <b>Date of Plant</b> : {item?.dateofPlanting}
                </div>
              </Space>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col md={12} xs={24}>
              <Card bordered={false} className="criclebox h-full">
                <MapChart1 data={bioMass}/>
              </Card>
            </Col>

            <Col md={12} xs={24}>
              <Card bordered={false} className="criclebox h-full">
                <MapChart2 data1={h2oVal} data2={o2Val}/>
              </Card>
            </Col>
          </Row>
        </Modal>
    </MapContainer>
   
    </>
  )
}

export default Calculation;