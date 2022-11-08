import ReactApexChart from "react-apexcharts";
import { Button, Typography} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import memberService from "../../services/getmembers";
import React,{ useEffect, useState } from "react";
import lineChart from "./configs/lineChart";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function LineChart() {

  const [activeLand, setActiveLand] = useState(null);
  const [completedLand, setcompletedLand] = useState(null);

  const{
    getLandOwnerSum,
  } = memberService();

  useEffect(() => {
    const getAlllandsum = async () =>{
      const resLog = await getLandOwnerSum();

      let actSum = resLog.data.Result.map((data) => data.activeLandOwners);
      console.log(actSum,"actSum");

      let comSum = resLog.data.Result.map((data) => data.completedLandOwners);
      console.log(comSum,"comSum");

      setActiveLand(actSum);
      setcompletedLand(comSum);
    }
    getAlllandsum();
  },[]);

  const printRef = React.useRef();
  //download line chart
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: 'landscape',
    });
    const imgProps= pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(data,2,40,pdfWidth,pdfHeight);
    pdf.save("Land Owner line chart.pdf");
    console.log("Download pdf")
  };


  const { Title } = Typography;

    let series= [
      {
        name: "Active Land Owners",
        data: (activeLand && activeLand) || [],
        offsetY: 0,
      },
      {
        name: "Completed Land Owners",
        data: (completedLand && completedLand) || [],
        offsetY: 0,
      },]


  return (
    <>
   <div ref={printRef}>
    

   
      <div className="linechart" >

        <div>
          <Title level={5}>Active Land Owners</Title>
        </div>
        {/* <div className="sales">
          <ul>
            <li> {<MinusOutlined style={{color:"#2a9df4"}} />}  <Text style={{color:"#2a9df4"}}>Active Land Owner</Text></li>
            <li> {<MinusOutlined style={{color:"#03c04A"}} />} <Text style={{color:"#03c04A"}}>Completed Land Owners</Text></li>
          </ul>
        </div> */}
      </div>
     
      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={series}
        type="area"
        height={300}
     
      />
       
    </div>
   
      {/* download button */}
      <div> 
      <Button 
      type="dashed" 
      block
      icon={<DownloadOutlined/>}
      onClick={handleDownloadPdf}
      > 
      Click to Download </Button>
      </div>
     
    </>
  );
}

export default LineChart;
