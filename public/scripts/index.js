import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import style from "../css/main.css";
import everestText from "../assets/text/everestText.js";
import Information from "./infoComponent.js";


function Intro () {
  return(
  <TransitionGroup className = {style.slideTextHolder}>
    <CSSTransition appear = {true} timeout = {1000} classNames = {style.fade}>
      <p className = {style.subheadingTitle}> Scroll up and down to change slides. </p>
    </CSSTransition>
  </TransitionGroup>
  );
}

class Appear extends React.Component {
  render() {
    let arr = null;
    if (this.props.textSlides) arr = this.props.textSlides.map((c, i) =>
    <CSSTransition key = {Math.random().toString() + " " + i.toString()} appear = {true}
    timeout = {i * 200} classNames = {style.fade} exit = {false}>
      {c}
    </CSSTransition> );


  return (
  <TransitionGroup className = {style.slideTextHolder}>
    {arr}
  </TransitionGroup>  );
  }
}


class MainTitle extends React.Component {
  render() {
    return(
    <TransitionGroup className = {style.bigTextHolder}>
      <CSSTransition classNames = {style.scaleOffscreen} appear = {true} timeout={5000}>
        <h1 className = {style.everestTitle}>EVEREST</h1>
      </CSSTransition>
      <CSSTransition classNames = {style.subtitleFade} appear = {true} timeout = {5000}>
        <h1 className = {style.subheadingTitle}>THE TALLEST MOUNTAIN</h1>
      </CSSTransition>
    </TransitionGroup>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {title: false, slide: 0, started: false, finished: false};
    this.progressInterval = null;
    this.wheelUp = this.wheelUp.bind(this);
}

wheelUp(e) {
let s = this.state;
let [slide, title, started, finished] = [s.slide, false, s.started, s.finished];

  if (e.deltaY < 0) {
       switch(true) {
          case (s.title):
            slide++;
            title = false;
            break;
          case (slide === 0):
            (started) ? slide++ : started = true;
            break;
          case (slide === 3):
            title = true;
            break;
          case (slide + 1 < everestText.length):
            slide++;
            break;
          case (slide + 1 === everestText.length):
            if (!finished) finished = true;
            break;
       }

  } else {

    switch(true) {
      case (finished):
        finished = false;
        break;
      case (slide === 0):
        started = false;
        break;
      case (slide === 4):
        title = true;
        slide--;
        break;
       case (slide > 0):
        slide--;
        break;
    }

  }
  this.setState({slide: slide, title: title, started: started, finished: finished});
}

  render() {
    let s = this.state;
    let slide = everestText[s.slide];
    let slideText = slide.text.split(" ").map((v, i) => (slide.bold === v) ?
    <b className = {style.slideTextBold}><span className = {style.slideText} key = {i}>{" " + v}</span></b>
    : <span className = {style.slideText} key = {i}>{" " + v}</span>);

    let information = null;
    switch (true) {
      case !s.started:
        information =  <Intro />;
        break;
      case s.title:
        information = <MainTitle />;
        break;
      case s.finished:
        information = <Information />;
        break;
      default:
        information = <Appear textSlides = {slideText} />;
        break;
    }

    return(
      <div className = {style.wrapper} onWheel = {this.wheelUp}>
        <video className = {style.snowVideo} autoPlay loop>
          <source src = "../assets/video/snow.webm" type="video/webm" />
          <img className = {style.snowFallback} src = "../assets/images/snowFallback.jpg" title="Your browser does not support the <video> tag" />
        </video>
        {information}
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

