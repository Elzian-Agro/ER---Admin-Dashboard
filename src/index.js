// import React from "react";
// import ReactDOM from "react-dom";
// import { HashRouter } from "react-router-dom";
// import App from "./App";

// ReactDOM.render(
//   <HashRouter>
//     <App />
//   </HashRouter>,
//   document.getElementById("root"),
// );

import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";

ReactDOM.render(
  <BrowserRouter basename="/ER---Admin-Dashboard">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
