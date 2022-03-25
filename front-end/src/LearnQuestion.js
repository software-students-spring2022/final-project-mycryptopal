import './LearnQuestion.css';

function LearnQuestion(props) {
    return (
        <div class="quizQuestion">
            <div class="questionNumber">
                Question {props.num}
            </div>
            <div class="questionContent">
                Lorem ipsum dolor sit amet?
            </div>
            <div class="questionAnswer">
                <form>
                    <label htmlFor="user-answer">Answer:</label>
                    <input name="user-answer" type="text"></input>
                </form>
            </div>
        </div>
    )
}

export default LearnQuestion;