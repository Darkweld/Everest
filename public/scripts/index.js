import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import style from "../css/main.css";

//video src in "../assets/*[video_name]*";

class Video extends React.Component {
  render() {

    return(
      <video autoPlay = "true">
        <source src = "../assets/everest01" type = "video/mp4" />
      </video>
    );
  }
}


class TextLeft extends React.Component {

  render() {

    return(
      <div className = {style.leftTextHolder}>

      </div>
    );
  }
}

class TextRight extends React.Component{

  render() {

    return(
      <div className = {style.rightTextHolder}>

      </div>
    );
  }
}


class MainTitle extends React.Component {
  render() {
    return(
      <div className = {style.bigTextHolder}>
      <CSSTransition in = {this.props.bool}
        classNames = {style.everestTitle}
        timeout={300}
        >
        <h1 className = {style.everestTitle}>Everest</h1>
      </CSSTransition>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {title: false};
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 5000);
  }
  tick() {
    this.setState({title: !this.state.title});
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {

    return(
      <div className = {style.wrapper}>
        <MainTitle bool = {this.state.title}/>
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

