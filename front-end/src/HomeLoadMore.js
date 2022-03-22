import React from "react";
import "./HomeLoadMore.css";

function HomeLoadMore() {
    return (
    <>
        <div className="firstarticle">  
            <a href="/article">
            <img id="photo1" src= {"https://picsum.photos/120"}></img>
            </a>
            <p id="paragraph1"> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ac tincidunt vitae semper quis lectus. Dolor sit amet consectetur 
            adipiscing elit pellentesque.
            </p>
        </div>
        <div className="secondarticle">  
            <a href="article">
            <img id="photo2" src= {"https://picsum.photos/120"}></img>
            </a>
            <p id="paragraph2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ac tincidunt vitae semper quis lectus. Dolor sit amet consectetur 
            adipiscing elit pellentesque.
            </p>
        </div>
        <div className="thirdarticle">  
            <a href="/article">
            <img id="photo3" src= {"https://picsum.photos/120"}></img>
            </a>
            <p id="paragraph3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ac tincidunt vitae semper quis lectus. Dolor sit amet consectetur 
            adipiscing elit pellentesque.
            </p>
        </div>
    </>

      );
}

export default HomeLoadMore;
