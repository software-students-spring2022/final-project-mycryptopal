import { useState, useEffect } from 'react';
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import './Home.css';
import ArticleSmall from '../../components/ArticleSmall/ArticleSmall';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
    const [allocations, setAllocations] = useState([]);
    const [articles, setArticles] = useState([]);
    const [minShown, setMinShown] = useState(0);
    const [numShown, setNumShown] = useState(0);
    const [colors, setColors] = useState([]);

    // API calls for news articles
    useEffect(() => {
     async function getArticles() {
        const res = await fetch(`http://localhost:4000/news`)  
        const data = (await res.json()).articles
        const news = data.map((current, index) => {
          return <ArticleSmall key={index} title={current.title} summary={current.description} picture={current.urlToImage} link={current.url}/>
        });
        setArticles(news);
      }
      getArticles();
    }, []);

    useEffect(() => {
      setMinShown(articles.length > 4 ? 4 : articles.length);
    }, [articles]);

    useEffect(() => {
      setNumShown(minShown);
    }, [minShown]);

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

    useEffect(() => {
      function getRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16).toString();
      }
      const randomColors = new Array(allocations.length).fill(0).map(() => getRandomColor());
      setColors(randomColors);
    }, [allocations]);

    return (
    <>
      <div id="page-title">
        <h1>Home</h1>
      </div>
      <div id="page-content">
        <div id="chart">
          <div className="homeHeader">Asset Allocations</div>
          <div id="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={allocations} dataKey="value" nameKey="name">
                  {allocations.map((item, index) => (
                    <Cell key={index} stroke={'#000'} strokeWidth={1} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div id="news">
          <div className="homeHeader">News</div>
          {articles.slice(0, numShown)}
          <div id="feed-buttons">
            {numShown > minShown ? (
              <button className="newsButton" onClick={() => setNumShown(minShown)}>
                <span>Show Less</span>
              </button>
            ) : (<></>)}
          </div>
        </div>
        <InfiniteScroll
          dataLength={numShown}
          next={() => setNumShown(Math.min(numShown + 5, articles.length))}
          hasMore={() => numShown >= articles.length ? false : true}
          id="infinite-scroll"
        >
        </InfiniteScroll>
      </div>
    </>
    );
}

export default Home;
