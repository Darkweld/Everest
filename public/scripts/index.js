import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import style from "../css/main.css";
import everestText from "../assets/text/everestText.js";

//video src in "../assets/*[video_name]*";

class Background extends React.Component {
    //onExit = {e => {this.props.exit()}}>
  render() {
    return(
      <div>
      </div>
    );
  }
}


class Appear extends React.Component {
  render() {
    let arr = null;
    if (this.props.textSlides) arr = this.props.textSlides.map((c, i) =>
    <CSSTransition key = {i} timeout = {4000} classNames = {style.fade}>
      <span>{" " + c}</span>
    </CSSTransition>
    );


  return (
  <TransitionGroup style = {{}}>
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
      <CSSTransition classNames = {style.test} appear = {true} timeout = {10000}>
        <h1 className = {style.subheadingTitle}>THE TALLEST MOUNTAIN</h1>
      </CSSTransition>
    </TransitionGroup>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {title: false, slide: 0, textProgress: 1, maxSlides: everestText.length};
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
       } else if (currentSlide > 0) {
         slide = currentSlide - 1;
       }
     }
  }
  if (!title) this.progressInterval = setInterval(() => this.textProgress(), 500);
  this.setState({textProgress: 0, slide: slide, title: title});
}

textProgress() {
  let l = everestText[this.state.slide].text.split(" ").length;
  let num = (this.state.textProgress + 1 < l) ? this.state.textProgress + 1 : l;
  if (num === l) clearInterval(this.progressInterval);
  this.setState({textProgress: num});
}

componentWillUnmount() {
  clearInterval(this.progressInterval);
}

  render() {
    let title = (this.state.title) ? <MainTitle sub = {this.setSubheading} bool = {this.state.subHeading} /> : null;
    let text = (!this.state.title) ? everestText[this.state.slide].text.split(" ").slice(0, this.state.textProgress) : null;

    return(
      <div className = {style.wrapper} onWheel = {this.wheelUp}>
        {title}
        <Appear textSlides = {text} />
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById("root"));

