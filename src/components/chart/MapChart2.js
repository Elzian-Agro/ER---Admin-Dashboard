import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import mapChart2 from "./configs/mapChart2";
import { useEffect, useState } from "react";



/*
  This Function is created for display Tree species chart
  Usage: web application
  User: Admin
*/
function MapChart2(props) {
  const { Title } = Typography;
  const [data1, setData1] = useState([0,0,0,0,0])
  const [data2, setData2] = useState([0,0,0,0,0])

  let series = [
    {
      name: "Average O2 production (L)",
      data: data1,
      offsetY: 0,
    },
    {
      name: "Average H2O production (L)",
      data: data2,
      offsetY: 0,
    },
  ]
  

  useEffect(() => {
    setData1(props?.data1)
    setData2(props?.data2)
  }, [props])

  return (
    <>
      <div className="mapChart2">
        <div>
          <Title level={5}>Average O2 and H2O production</Title>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={mapChart2.options}
        series={series}
        type="area"
        height={200}
        width={"100%"}
      />
    </>
  );
}

export default MapChart2;
