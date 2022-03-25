import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import './Home.css';
import ArticleSmall from "./ArticleSmall";

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
        <div id="page-content">
          <div id="news">
            <div id="news-header">News</div>
            {news}
          </div>
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
