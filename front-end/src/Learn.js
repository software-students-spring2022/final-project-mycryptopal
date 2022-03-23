import './Learn.css';

function Learn() {
    return (
    <div id="page-title">
        <h1>Lesson Page</h1>

        <div className="question"> Question 1 </div>
        <div className="sampleQ"> Sample question here? </div>
        <div>
            <form>
                <label for="answer">Answer:</label>
                <input name="answer" type="text"></input>
                <input id="checkAnswerButton" type="button" value="Check"></input> 
            </form>
        </div>
        <a href = '/learnmap'>
        <button id= "retButton"> Back to Map </button>
        </a>
        <a href = '/learn'>
        <button id= "nextButton"> Next </button>
        </a>
    </div>
    )
}

export default Learn;