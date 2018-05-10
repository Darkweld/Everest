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
    console.log(this.props.bool);
    return(
      <div className = {style.bigTextHolder}>
      <CSSTransition in = {true} classNames = {style.scaleOffscreen} appear = {true} timeout={10000}
       onEntered = {() => {this.props.sub()}}>
        <h1 className = {style.everestTitle}>EVEREST</h1>
      </CSSTransition>
      <CSSTransition in = {this.props.bool} classNames = {style.fade} timeout = {2000}>
        <h1 className = {style.subheadingTitle}>The tallest mountain</h1>
      </CSSTransition>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {title: false, subHeading: false};
    this.setSubheading = this.setSubheading.bind(this);
  }

setSubheading () {
  this.setState({subHeading: true});
}

  render() {
    let title = (this.state.title) ? <MainTitle sub = {this.setSubheading} bool = {this.state.subHeading} /> : null;


    return(
      <div className = {style.wrapper}>
        <button onClick = {e => this.setState({title: !this.state.title, subHeading: false})} />
        {title}
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

