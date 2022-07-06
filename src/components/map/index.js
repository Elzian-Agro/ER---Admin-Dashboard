import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({lat, lon}) {

return (
    <MapContainer center={[lat, lon]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <Marker id="marker" position={[lat,lon]} />
       <Popup position={[lat,lon]}>
        <div>latitude : {lat}</div> 
        <div>longitude : {lon}</div>  
      </Popup>
    </MapContainer>
  );
}