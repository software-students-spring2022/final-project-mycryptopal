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

function Home() {
    const news = [];
    const COLORS = ["blue", "green", "orange", "coral"]

    for (let i = 0; i < 5; i++) {
        news.push(<ArticleSmall key={i} />);
    }

    let initialShown = news.length > 3 ? 3 : news.length;

    const [allocations, setAllocations] = useState([]);
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

    useEffect(() => {
      async function getAllocations() {
        const res = await fetch(`http://localhost:4000/assets`);
        const data = await res.json();
        const assetSum = Object.values(data).reduce((sum, current) => sum + current, 0);
        const formattedData = Object.keys(data).reduce((result, current, index) => {
          const entry = {};
          entry.name = current;
          entry.value = parseFloat((Object.values(data)[index] / assetSum).toFixed(2));
          result.push(entry);
          return result;
        }, []);
        setAllocations(formattedData);
      }
      getAllocations();
    }, []);

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
                  <Pie data={allocations} dataKey="value" nameKey="name">
                    {allocations.map((item, index) => (
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
