import "./Home.css";
import React, { useEffect } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import Article from "../../components/article/Article";
import Carousel from "../../components/carousel/Carousel";

const Home = () => {
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Home);
  });
  return (
    <div>
      <Carousel/>
      <div className="columns">
        <div className="column main-column">
         
          
          <article className="article">Hello World</article>
          <article className="article">Hello Konjo</article>
        </div>

        <div className="column">
          <article className="article">Hello Esther</article>
          <article className="article">Foo Bar</article>
          <article className="article">Hello World</article>
        </div>
        <div className="column">
          <article className="article">Hello Esther</article>
          <article className="article">Foo Bar</article>
          <article className="article">Hello World</article>
        </div>
        <div className="column">
          <article className="article">Hello Esther</article>
          <article className="article">Foo Bar</article>
          <article className="article">Hello World</article>
        </div>
      </div>
    </div>
  );
};

export default Home;
