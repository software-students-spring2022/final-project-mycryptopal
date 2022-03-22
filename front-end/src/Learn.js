import './Learn.css';

function Learn() {
    return (
    <div id="page-title">
        <h1>Lesson Page</h1>

        <div className="question"> Quiz Question 1 </div>
        <div>
            <form>
                <label for="answer">Answer:</label>
                <input name="answer" type="text"></input>
                <input id="checkAnswerButton" type="button" value="Check"></input> 
            </form>
        </div>
        <a href = '/learn'>
        <button id= "prevButton"> Previous Lesson </button>
        </a>
        <a href = '/learn'>
        <button id= "nextButton"> Next Lesson </button>
        </a>
    </div>
    )
}

export default Learn;