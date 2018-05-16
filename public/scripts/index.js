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
      <p>{c}</p>
    </CSSTransition>
    );


  return (
  <TransitionGroup className = "test">
  {arr}
  </TransitionGroup>
  );
  }
}


class MainTitle extends React.Component {
  render() {
    return(
      <div className = {style.bigTextHolder}>
      <CSSTransition in = {true} classNames = {style.scaleOffscreen} appear = {true} timeout={10000}>
        <h1 className = {style.everestTitle}>EVEREST</h1>
      </CSSTransition>
      <CSSTransition in = {true} classNames = {style.test} appear = {true} timeout = {10000}>
        <h1 className = {style.subheadingTitle}>THE TALLEST MOUNTAIN</h1>
      </CSSTransition>
      </div>
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

componentDidMount() {
  this.setState({title: true});
}

wheelUp(e) {
  if (e.deltaY < 0) {
     if (this.state.title) {
       this.progressInterval = setInterval(() => this.textProgress(), 500);
       this.setState({title: false})
     } else if (this.state.slide + 1 < this.state.maxSlides){
       this.setState({slide: this.state.slide + 1})
     }
  } else {
     (this.state.slide > 0) ? this.setState({slide: this.state.slide - 1}) : this.setState({slide: 0, title: true});
  }
}

textProgress() {
  let l = everestText[this.state.slide].text.split(" ").length;
  let num = (this.state.textProgress + 1 < l) ? this.state.textProgress + 1 : l;
  if (num === l) clearInterval(this.progressInterval);
  this.setState({textProgress: num});

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

