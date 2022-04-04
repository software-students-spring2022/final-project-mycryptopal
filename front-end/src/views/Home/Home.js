import { useState, useEffect } from 'react';
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import './Home.css';
import ArticleSmall from "../../components/ArticleSmall/ArticleSmall";


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
    const news = [];

    for (let i = 0; i < 5; i++) {
        news.push(<ArticleSmall key={i} />);
    }

    let initialShown = news.length > 3 ? 3 : news.length;

    const [articles, setArticles] = useState(news);
    const [numShown, setNumShown] = useState(initialShown);
    const [expanded, setExpanded] = useState(false);
    
    function showMore(){
        if (numShown === initialShown){
            setNumShown(articles.length);
            setExpanded(true);
        }
        else {
            setNumShown(initialShown);
            setExpanded(false);
        }
    }
    const API_URL = "https://newsapi.org/v2/everything"
    const searchterm = "cryptocurrency"
    const apiKeyNews = "0473a42ea4ee4b1fa9734aea4ab7d84d"
    const pageSize = "3"


    useEffect(() => {
      if (!searchterm | !apiKeyNews) {
        return;
      }
  
      fetch(`http://localhost:4000/Home`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
  
    }, [searchterm, apiKeyNews]);


    return (
    <>
      <div id="page-title">
        <h1>Home</h1>
      </div>
        <div id="page-content">
          <div id="chart">
            <div id="news-header">Asset Allocations</div>
            <div id="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={allocation} dataKey="value" nameKey="name">
                    {allocation.map((item, index) => (
                      <Cell key={index} stroke={'#000'} strokeWidth={1} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div id="news">
            <div id="news-header">News</div>
            {news.slice(0, numShown)}
            <button id="expand-button" onClick={showMore}>
              {expanded ? (
                  <span>Show Less</span>
              ) : (
                  <span>Show More</span>
              )}
            </button>
          </div>
        </div>
        <div>
        </div>
    </>
    );
}

export default Home;
