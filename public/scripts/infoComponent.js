import React from "react";
import style from "../css/main.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Information () {
  return (
    <TransitionGroup component = {null}>
    <CSSTransition appear = {true} timeout = {3000} classNames = {style.slideIn}>
    <div className = {style.slideInHolder}>
      <div>
      <h1 className = {style.attrHeader}>Attributions</h1>
      <h3 className = {style.attrSub}>Information</h3>
      <a className = {style.attribution} href = "http://www.alanarnette.com/blog/2017/12/17/everest-by-the-numbers-2018-edition/">
      Everest by the numbers: 2018 edition
      </a>
      <br/>
      <a className = {style.attribution} href = "https://en.wikipedia.org/wiki/Mount_Everest">
      Mount Everest (Wikipedia)
      </a>
      <h3 className = {style.attrSub}>Background</h3>
      <a className = {style.attribution} href = "https://vimeo.com/114789268">
      {'"Falling Snow Realistic Overlay Loop"'}
      </a>
    </div>
    </div>
    </CSSTransition>
    </TransitionGroup>
  );
}

export default Information;

