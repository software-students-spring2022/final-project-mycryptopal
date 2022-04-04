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

let initialShown = 0;

function Home() {
    const COLORS = ["blue", "green", "orange", "coral"]
    const [allocations, setAllocations] = useState([]);
    const [articles, setArticles] = useState([]);
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

    // API calls for news articles
    useEffect(() => {
     async function getArticles() {
        const res = await fetch(`http://localhost:4000/Home`)  
        const data = (await res.json()).articles
        const news = data.map((current, index) => {
          return <ArticleSmall key={index} title={current.title} summary={current.description} picture={current.urlToImage} link={current.url}/>
        });
        setArticles(news);
      }
      getArticles();
    }, []);

    useEffect(() => {
      initialShown = articles.length > 3 ? 3 : articles.length;
      setNumShown(initialShown);
    }, [articles]);

    // API call for mock asset allocation data

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
            {articles.slice(0, numShown)}
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
