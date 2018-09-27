import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Compilador from "./Compilador";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Compilador />, document.getElementById("root"));
registerServiceWorker();
