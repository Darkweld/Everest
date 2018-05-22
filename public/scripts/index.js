import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import style from "../css/main.css";
import everestText from "../assets/text/everestText.js";




class Appear extends React.Component {
  render() {
    let arr = null;
    if (this.props.textSlides) arr = this.props.textSlides.map((c, i) =>
    <CSSTransition key = {i} timeout = {1000} classNames = {style.fade}>
      {c}
    </CSSTransition>
    );


  return (
  <TransitionGroup>
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
    this.state = {title: false, slide: 0, textProgress: 1, maxSlides: everestText.length, currentText: []};
    this.progressInterval = null;
    this.wheelUp = this.wheelUp.bind(this);
    this.textProgress = this.textProgress.bind(this);
}

wheelUp(e) {
let [slide, title, currentSlide] = [0, false, this.state.slide];

  if (e.deltaY < 0) {
     if (this.state.title) {
       if (currentSlide + 1 < this.state.maxSlides) {
         slide = currentSlide + 1;
         title = false;
       }
     } else {
        if (currentSlide === 3) {
          title = true;
        } else if (currentSlide + 1 < this.state.maxSlides) slide = currentSlide + 1;
     }

  } else {
     if (this.state.title) {
        title = false;
     } else {
       if (currentSlide === 4) {
         title = true;
         slide = currentSlide - 1;
       } else if (currentSlide > 0) {
         slide = currentSlide - 1;
       }
     }
  }
  clearInterval(this.progressInterval);
  this.progressInterval = setInterval(this.textProgress, 250);
  this.setState({textProgress: 0, slide: slide, title: title});
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
    let title = (this.state.title) ? <MainTitle sub = {this.setSubheading} bool = {this.state.subHeading} /> : null;
    let slide = everestText[this.state.slide];
    let text = (!this.state.title) ? slide.text.split(" ").slice(0, this.state.textProgress)
    .map((v, i) => (slide.bold === v) ?
    <b><span key = {i}>{" " + v}</span></b> : <span key = {i}>{" " + v}</span>)
    : null;

    return(
      <div className = {style.wrapper} onWheel = {this.wheelUp}>
        <video className = {style.snowVideo} autoPlay loop>
          <source src = "../assets/video/snow.mp4" type="video/mp4" />
          <img className = {style.snowFallback} src = "../assets/images/snowFallback.jpg" title="Your browser does not support the <video> tag" />
        </video>
        {title}
        <Appear textSlides = {text} />
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

