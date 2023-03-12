import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import mapChart1 from "./configs/mapChart1";
import { useEffect, useState } from "react";

/*
  This Function is created for display Tree species chart
  Usage: web application
  User: Admin
*/
function MapChart1(props) {
  const { Title } = Typography;
  const [data, setData] = useState([0,0,0,0,0])
  let series = [
    {
      name: "Photosynthetic Biomass (g)",
      data: data,
      offsetY: 0,
    },
  ]


  useEffect(() => {
    setData(props?.data)
  }, [props?.data])
  


  return (
    <>
      <div className="mapChart1">
        <div>
          <Title level={5}>Photosynthetic Biomass (g)</Title>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={mapChart1.options}
        series={series}
        type="area"
        height={200}
        width={"100%"}
      />
    </>
  );
}

export default MapChart1;
