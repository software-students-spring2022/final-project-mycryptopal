import './Learn.css';

function Learn() {
    return (
    <div className='learn'>
        <h1>Lesson Example</h1>
        <div>
        <div className="question"> Quiz Question 1 </div>
            <form>
                <label for="answer">Answer:</label>
                <input name="answer" type="text"></input>
                <input id="checkAnswerButton" type="button" value="Check"></input> 
            </form>
        </div>
        <a href = '/learn'>
        <button className= "page-button"> Previous Lesson </button>
        </a>
        <a href = '/learn'>
        <button className= "page-button"> Next Lesson </button>
        </a>
    </div>
    )
}

export default Learn;