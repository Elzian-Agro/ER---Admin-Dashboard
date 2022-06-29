import React, { useState, useEffect } from 'react';
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function Calculation() {

  const [marker, setMarker] = useState([]);
  useEffect(() => {
  const headers = {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk",
  };

  axios
    .get("http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/landOwners/", {headers})
    .then((res) => {
      setMarker(res.data.Result);
    })
    
}, []);

const mapStyles = {        
    height: "100%",
    width: "100%"
};
  
const defaultCenter = {
  lat: 6.9271, lng: 79.8612
}
  
  return (
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={14}
          center={defaultCenter}
        >
          {marker.map((landMark) => {
            let lat = (landMark.latitude);
            let lng = (landMark.longitude);

            return(
              <Marker
                id={landMark.landOwnerID}
                key={landMark.landOwnerID}
                position={{ lat: lat, lng: lng }}
                title={landMark.landOwnerName}
              />
            )
          })}
         {/* <Marker position={{ lat: 6.9271, lng: 79.8612 }}/> */}
         {/* <Marker position={{ lat: 89.8612, lng: 2.9271 }}/> */}
         {/* <Marker position={{ lat: 6.96906039, lng: 79.9208362 }}/> */}
        </GoogleMap>
      </LoadScript>
  )
}

export default Calculation;




