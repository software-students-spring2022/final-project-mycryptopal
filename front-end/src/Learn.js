import LearnQuestion from './LearnQuestion';
import { useState } from 'react';
import './Learn.css';

function Learn() {
    const questions = [];
    for (let i = 1; i <= 5; i++) {
        questions.push(<LearnQuestion key={i} num={i}/>);
    }

    const [questionNum, setQuestionNum] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(questions[questionNum - 1])

    function prevQuestion() {
        if(questionNum > 1){
            const newNum = questionNum - 1
            setQuestionNum(newNum);
            setCurrentQuestion(questions[newNum - 1]);
        }
    }

    function nextQuestion() {
        if(questionNum < questions.length){
            const newNum = questionNum + 1
            setQuestionNum(newNum);
            setCurrentQuestion(questions[newNum - 1]);
        }
    }

    function checkAnswer() {
        alert(`Your answer is ${Math.random() > 0.5 ? "correct" : "incorrect"}!`)
    }

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
                {currentQuestion}
                <div id="question-buttons">
                        <input id="prevQuestionButton" type="button" value="Previous" onClick={prevQuestion}></input> 
                        <input id="checkAnswerButton" type="button" value="Check" onClick={checkAnswer}></input>
                        <input id="nextQuestionButton" type="button" value="Next" onClick={nextQuestion}></input> 
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