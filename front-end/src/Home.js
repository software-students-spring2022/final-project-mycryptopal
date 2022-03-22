import React from "react";
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import './Home.css';

const COLORS = ["blue", "green", "yellow", "coral"]

const allocation = [
  {
    name: "BTC",
    value: 0.35,
  },
  {
    name: "ETH",
    value: 0.2,
  },
  {
    name: "DOGE",
    value: 0.2,
  },
  {
    name: "SOL",
    value: 0.25
  }
];

function Home() {

    return (
    <>
        <div>
          <div className="container">
            <PieChart width={730} height={250}>
              <Pie data={allocation} dataKey="value" nameKey="name">
                {allocation.map((item, index) => (
                  <Cell key={index} stroke={'#000'} strokeWidth={1} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        <div className="firstarticle">  
            <a href="/article">
            <img id="photo1" src= {"https://picsum.photos/120"} alt=""></img>
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
            <img id="photo2" src= {"https://picsum.photos/120"} alt=""></img>
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
            <img id="photo3" src= {"https://picsum.photos/120"} alt=""></img>
            </a>
            <p id="paragraph3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ac tincidunt vitae semper quis lectus. Dolor sit amet consectetur 
            adipiscing elit pellentesque.
            </p>
        </div>
        <div>
        <button className="myButton" onClick={event =>  window.location.href='/Article'}>
            Load More News
        </button>
        </div>
    </>

      );
}

export default Home;
