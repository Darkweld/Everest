import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import style from "../css/main.css";

//video src in "../assets/*[video_name]*";

class Background extends React.Component {
  render() {

    return(
      <CSSTransition in = {this.props.bool} classNames = {style.slideIn} timeout = {2000} appear = {true}
      onExited = {e => {this.props.exit()}}>
        <img className = "background" src = {this.props.src} />
      </CSSTransition>
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
      <CSSTransition in = {true} classNames = {style.scaleOffscreen} appear = {true} timeout={10000}
       onEntered = {() => {this.props.sub()}}>
        <h1 className = {style.everestTitle}>EVEREST</h1>
      </CSSTransition>
      <CSSTransition in = {this.props.bool} classNames = {style.fade} timeout = {2000}>
        <h1 className = {style.subheadingTitle}>THE TALLEST MOUNTAIN</h1>
      </CSSTransition>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {title: false, subHeading: false, transition: true, img: 1};
    this.setSubheading = this.setSubheading.bind(this);
    this.exitImage = this.exitImage.bind(this);
  }

setSubheading () {
  this.setState({subHeading: true});
}
exitImage() {
  let num = this.state.img;
  (num >= 4) ? num = 1 : num = num + 1;
  this.setState({img: num});
}

  render() {
    let title = (this.state.title) ? <MainTitle sub = {this.setSubheading} bool = {this.state.subHeading} /> : null;


    return(
      <div className = {style.wrapper}>
        <button onClick = {e => this.setState({title: !this.state.title, subHeading: false, transition: false})} />
        {title}
        <Background bool = {this.state.transition} src = {"../assets/everest" + this.state.img.toString() + ".jpg"}
        exit = {this.exitImage}/>
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

