import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Lesson.css';
import LessonQuestion from '../../components/LessonQuestion/LessonQuestion';

function Lesson() {
    const { lessonID } = useParams();
    const [lesson, setLesson] = useState({});
    const [questions, setQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [correctCount, setCorrectCount] = useState(0);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        if(windowWidth > 780) {
            document.getElementById('prevButton').classList.add('desktopQuestionButtons');
            document.getElementById('prevButton').classList.remove('mobileQuestionButtons');
            document.getElementById('nextButton').classList.add('desktopQuestionButtons');
            document.getElementById('nextButton').classList.remove('mobileQuestionButtons');
            document.getElementById('centerButton').classList.add('desktopCenterButton');
            document.getElementById('centerButton').classList.remove('mobileCenterButton');

        }
        else{
            document.getElementById('prevButton').classList.add('mobileQuestionButtons');
            document.getElementById('prevButton').classList.remove('desktopQuestionButtons');
            document.getElementById('nextButton').classList.add('mobileQuestionButtons');
            document.getElementById('nextButton').classList.remove('desktopQuestionButtons');
            document.getElementById('centerButton').classList.add('mobileCenterButton');
            document.getElementById('centerButton').classList.remove('desktopCenterButton');
        }
    }, [windowWidth]);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);   
        }
        window.addEventListener('resize', handleResize);
        async function getCurrentLesson() {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lesson/${lessonID}`);
            const data = await res.json();
            setLesson(data);
        }
        getCurrentLesson();
    }, [lessonID]);

    useEffect(() => {
        if(lesson !== undefined) {
            if(lesson.questions){
                setQuestions(lesson.questions);
            }
        }
    }, [lesson]);

    useEffect(() => {
        if(questions){
            setCurrentQuestion(questions[0]);
        }
    }, [questions]);

    useEffect(() => {
        if(questions) {
            if(currentQuestion.answered){
                document.getElementById('answer-box').value=currentQuestion.answer;
                document.getElementById('answer-box').setAttribute('readonly', true);
                document.getElementById('centerButton').style.visibility = 'hidden';
            }
            else{
                document.getElementById('answer-box').value='';
                document.getElementById('answer-box').removeAttribute('readonly', false);
                document.getElementById('centerButton').style.visibility = 'visible';
            }
            const questionNum = currentQuestion.questionNumber;
            if(questionNum === questions[0].questionNumber) {
                document.getElementById('prevButton').style.visibility = 'hidden';
            }
            else if(questionNum === questions.slice(-1)[0].questionNumber) {
                document.getElementById('nextButton').style.visibility = 'hidden';
            }
            else {
                document.getElementById('prevButton').style.visibility = 'visible';
                document.getElementById('nextButton').style.visibility = 'visible';
            }
        }
    }, [currentQuestion]);

    useEffect(() => {
        if(questions) {
            if(correctCount === questions.length){
                alert('You got all correct answers!');
                setComplete(true);
                document.getElementById('centerButton').style.visibility = 'visible';
            }
        }
    }, [correctCount]);

    function getQuestionIndex(questionNum) {
        return questionNum - 1 - 3 * (lesson.id - 1);
    }

    function prevQuestion() {
        setCurrentQuestion(questions[getQuestionIndex(currentQuestion.questionNumber) - 1]);
    }

    function nextQuestion() {
        setCurrentQuestion(questions[getQuestionIndex(currentQuestion.questionNumber) + 1]);
    }

    function checkAnswer() {
        const answerBox = document.getElementById('answer-box');
        const isCorrect = (answerBox.value.toLowerCase() === currentQuestion.answer.toLowerCase());
        if(isCorrect){
            currentQuestion.answered = true;
            document.getElementById('centerButton').style.visibility = 'hidden';
            alert(`Your answer is correct!`);
            setCorrectCount(correctCount+1);
        }
        else{
            alert(`Your answer is incorrect!`);
        }
    }

    function redirectEnterKey(){
        const centerButton = document.getElementById('centerButton');
        centerButton.click();
    }

    return (
    <>
        <div id="page-title">
            <div>Lesson</div>
        </div>
        <div id="page-content">
            <div id="lesson-body">
                <div className="lessonHeader">
                    {lesson.title}
                </div>
                <div id="lesson-content">
                    {lesson.content}
                </div>
            </div>
            <div className='divider'></div>
            <div id="lesson-quiz">
                <div className="lessonHeader">
                    Quiz
                </div>
                {<LessonQuestion num={currentQuestion.questionNumber} content={currentQuestion.questionText} />}
                <div className="questionAnswer">
                <form>
                    <input name="user-answer" id="answer-box" type="text" onKeyDown={(evt) => {
                        if(evt.key === 'Enter') {
                            evt.preventDefault();
                            if(!currentQuestion.answered){
                                redirectEnterKey();
                            }
                        }
                    }}></input>
                </form>
                </div>
                <div id="lesson-buttons">
                        <input id="prevButton" className="imageButton" type="image" src={`${process.env.REACT_APP_BACKEND_URL}/static/left-arrow.png`} onClick={prevQuestion}></input> 
                        {(complete ? (
                            <input id="centerButton" type="button" value="Next Lesson" onClick={() => window.location.href=`/lesson/${parseInt(lessonID)+1}`}></input>
                        ) : 
                        (
                            <input id="centerButton" type="button" value="Check" onClick={checkAnswer}></input>
                        ))}
                        
                        <input id="nextButton" className="imageButton" type="image" src={`${process.env.REACT_APP_BACKEND_URL}/static/right-arrow.png`} onClick={nextQuestion}></input> 
                </div>
            </div>
            <div id="map-button">
                <button onClick={() => window.location.href='/learn'}>Back to Map</button>
            </div>
        </div>    
    </>
    )
}

export default Lesson;