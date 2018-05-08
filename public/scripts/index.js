import React from "react";
import ReactDOM from "react-dom";
import style from "../css/main.css";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {text: ""};
  }


  render() {
      let text = (this.state.text) ? null :
    (
      <div className = {style.textHolder}>
        <h1 className = {style.bigTitle}>This is</h1>
        <h1 className = {style.everestTitle}>Everest</h1>
      </div>
    );

    return(
      <div className = {style.wrapper}>
        {text}
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

