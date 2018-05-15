import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import style from "../css/main.css";

//video src in "../assets/*[video_name]*";

class Background extends React.Component {
    //onExit = {e => {this.props.exit()}}>
  render() {
    let arr = this.props.num.map((v, i) =>
      (v === true) ?
      <CSSTransition key = {i} classNames = {style.slideIn} timeout = {2000} >
      <img className = {style.background} src = {"../assets/everest" + (i + 1).toString() + ".jpg"} />
      </CSSTransition> : null);

    return(
    <TransitionGroup className = "test">
      {arr}
    </TransitionGroup>
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
    this.state = {title: false, subHeading: false, img: [true, false, false, false]}
    this.setSubheading = this.setSubheading.bind(this);
    this.exitImage = this.exitImage.bind(this);
  }

setSubheading () {
  this.setState({subHeading: true});
}
exitImage() {
  let l = this.state.img.length;
  let num = (this.state.img.indexOf(true) + 1 < l - 1) ? this.state.img.indexOf(true) + 1 : 0;
  let arr = Array(this.state.img.length).fill(false);
  arr[num] = true;
  this.setState({img: arr});
}

  render() {
    let title = (this.state.title) ? <MainTitle sub = {this.setSubheading} bool = {this.state.subHeading} /> : null;



    return(
      <div className = {style.wrapper}>
        <button onClick = {this.exitImage} />
        {title}
        <Background num = {this.state.img} exit = {this.exitImage}/>
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

