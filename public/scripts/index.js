import React from "react";
import ReactDOM from "react-dom";
import style from "./css/main.css";

class Main extends React.Component () {

  render() {
    return(
      <div className = {style.wrapper}>
        <p> Hello World </p>
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("index"));

