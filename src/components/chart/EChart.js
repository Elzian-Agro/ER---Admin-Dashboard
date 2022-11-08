import {useState,useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {Typography } from "antd";
import eChart from "./configs/eChart";
import memberService from "../../services/getmembers";

function EChart() {
  const [intvesData, setIntvesData] = useState(null);

  const {
    getMonthlyUsers
  } = memberService();

  useEffect(() => {
    const getMonthlyUsersd  = async () =>{
      const resLog = await getMonthlyUsers();
      let tempData = resLog.data.Result.map((data) =>data.activeInvestors); 
      console.log(tempData,"tempdata");
  
      setIntvesData(tempData);
    }
    getMonthlyUsersd();
  }, []);


  let series=[
    {
      name: "Monthly Investors",
      data:(intvesData && intvesData) || [],
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
      <div className="chart-vistior">
        {/* <Title level={5}>Active Investors</Title> */}
        {/* <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph> */}
         {/* <Paragraph className="lastweek">
          
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph> */}
        {/* <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>  */}
      </div>
     
    </>
  );
}

export default EChart;
