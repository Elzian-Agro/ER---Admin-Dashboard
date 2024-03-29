const eChart = {
  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "350",
      toolbar: {
        show: false,
      },
    
      stacked: false,
      zoom: {
        enabled: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },

    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },

  
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          fontSize: "14px",
            fontWeight: 600,
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff", 
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          fontSize: "14px",
            fontWeight: 600,
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return + val + " Investors";
        },
      },
    },
  },
};

export default eChart;
