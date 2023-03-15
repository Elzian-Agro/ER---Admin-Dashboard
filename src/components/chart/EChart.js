import {useState,useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {Typography } from "antd";
import eChart from "./configs/eChart";
import memberService from "../../services/getmembers";


/*
  This Function is created for display Active Investors data
  Usage: web application
*/


function EChart() {
  const [InvestorsData, setInvestorsData] = useState(null);

  const {
    getMonthlyUsers
  } = memberService();

  useEffect(() => {
    const getMonthlyUsersd  = async () =>{
      const resLog = await getMonthlyUsers();
      let tempData = resLog.data.Result.map((data) =>data.activeInvestors); 
  
      setInvestorsData(tempData);
    }
    getMonthlyUsersd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  let series=[
    {
      name: "Monthly Investors",
      data:(InvestorsData && InvestorsData) || [],
      color: "#fff",
    },
  ]

  const { Title } = Typography;

  // const items = [
  //   {
  //     Title: "3,6K",
  //     user: "Users",
  //   },
  //   {
  //     Title: "2m",
  //     user: "Clicks",
  //   },
  //   {
  //     Title: "$772",
  //     user: "Sales",
  //   },
  //   {
  //     Title: "82",
  //     user: "Items",
  //   },
  // Paragraph
  // Row,Col,
  // ]


  return (
    <>
     <div className="linechart">
     <Title level={5}>Active Investors</Title>
     </div>
     <br/>

     <div id="chart">
    <ReactApexChart
            className="bar-chart"
            options={eChart.options}
            series={series}
            type="bar"
            height={250}
          />
      </div>     
    </>
  );
}

export default EChart;
