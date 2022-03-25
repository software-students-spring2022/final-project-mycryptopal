import './Learn.css';

function Learn() {
    return (
    <>
        <div id="page-title">
            <h1>Lesson Page</h1>
        </div>
        <div id="page-content">
            <div id="lesson-body">
                <div className="lessonSectionTitle">
                    <h3>Lesson: Lorem ipsum dolor sit amet</h3>
                </div>
                <div id="lesson-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.
                </div>
            </div>
            <div id="lesson-quiz">
                <div className="lessonSectionTitle">
                    <h3>Quiz</h3>
                </div>
                <div id="quiz-question">
                    <div id="quiz-question-number">
                        Question
                    </div>
                    <div id="quiz-question-content">
                        Lorem ipsum dolor sit amet?
                    </div>
                    <div id="quiz-answer">
                        <form>
                            <label htmlFor="user-answer">Answer:</label>
                            <input name="user-answer" type="text"></input>
                            <input id="checkAnswerButton" type="button" value="Check"></input> 
                        </form>
                    </div>
                </div>
            </div>
            <div id="lesson-buttons">
                <button id= "retButton" onClick={() => window.location.href='/learnmap'}> Back to Map </button>
                <button id= "nextButton" onClick={() => window.location.href='/learn'}> Next </button>
            </div>
        </div>    
    </>

    )
}

export default Learn;