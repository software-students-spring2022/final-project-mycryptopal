import { useState } from 'react';
import './Article.css';
import ArticleSmall from './ArticleSmall';

function Article() {
    const related = [];

    for (let i = 0; i < 10; i++) {
        related.push(<ArticleSmall key={i} />);
    }

    let initialShown = related.length > 3 ? 3 : related.length;

    const [articles, setArticles] = useState(related);
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

    return (
        <>
            <div id="page-title">
                <h1>News</h1>
            </div>

            <div id="page-content">
                <div id="article">
                    <div id="picture">
                        <img src="https://picsum.photos/1200/600" alt="enlarged article pic"></img>
                    </div>
                    <div id="title">
                        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</h3>
                    </div>
                    <div id="contents">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.
                    </div>
                </div>

                <div id="related">
                    <div id="related-header">Related</div>
                    {related.slice(0, numShown)}
                    <button id="expand-button" onClick={showMore}>
                        {expanded ? (
                            <span>Show Less</span>
                        ) : (
                            <span>Show More</span>
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Article;