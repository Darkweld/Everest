import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import style from "../css/main.css";
import everestText from "../assets/text/everestText.js";
import Information from "./infoComponent.js";

class Appear extends React.Component {
  render() {
    let arr = null;
    if (this.props.textSlides) arr = this.props.textSlides.map((c, i) =>
    <CSSTransition key = {i} timeout = {1000} classNames = {style.fade}>
      {c}
    </CSSTransition>
    );

  return (
  <TransitionGroup className = {style.slideTextHolder}>
    {arr}
  </TransitionGroup>
  );
  }
}


class MainTitle extends React.Component {
  render() {
    return(
    <TransitionGroup className = {style.bigTextHolder}>
      <CSSTransition classNames = {style.scaleOffscreen} appear = {true} timeout={10000}>
        <h1 className = {style.everestTitle}>EVEREST</h1>
      </CSSTransition>
      <CSSTransition classNames = {style.subtitleFade} appear = {true} timeout = {10000}>
        <h1 className = {style.subheadingTitle}>THE TALLEST MOUNTAIN</h1>
      </CSSTransition>
    </TransitionGroup>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {title: false, slide: 0, textProgress: 1, started: false, finished: false, currentText: []};
    this.progressInterval = null;
    this.wheelUp = this.wheelUp.bind(this);
    this.textProgress = this.textProgress.bind(this);
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
  clearInterval(this.progressInterval);
  this.progressInterval = setInterval(this.textProgress, 250);
  this.setState({textProgress: 0, slide: slide, title: title, started: started, finished: finished});
}

textProgress() {
  let l = everestText[this.state.slide].text.split(" ").length;
  let num = (this.state.textProgress + 1 < l) ? this.state.textProgress + 1 : l;
  if (num >= l) clearInterval(this.progressInterval);
  this.setState({textProgress: num});
}
componentWillUnmount() {
  clearInterval(this.progressInterval);
}

  render() {
    let s = this.state;
    let slide = everestText[this.state.slide];
    let text = (!this.state.title && this.state.started && !this.state.finished) ? slide.text.split(" ").slice(0, this.state.textProgress)
    .map((v, i) => (slide.bold === v) ?
    <b className = {style.slideTextBold}><span className = {style.slideText} key = {i}>{" " + v}</span></b>
    : <span className = {style.slideText} key = {i}>{" " + v}</span>)
    : null;

    return(
      <div className = {style.wrapper} onWheel = {this.wheelUp}>
        <video className = {style.snowVideo} autoPlay loop>
          <source src = "../assets/video/snow.webm" type="video/webm" />
          <img className = {style.snowFallback} src = "../assets/images/snowFallback.jpg" title="Your browser does not support the <video> tag" />
        </video>
        {s.title && <MainTitle />}
        {(text) ? <Appear textSlides = {text} /> :
        <div className = {style.slideTextHolder} > <p className = {style.slideTextBold}> Scroll up and down to change slides. </p></div> }
        {this.state.finished && <Information />}
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

