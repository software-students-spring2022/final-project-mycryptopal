import {useState, useEffect} from 'react';
import './LessonQuiz.css';
import LessonQuestion from '../../components/LessonQuestion/LessonQuestion';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function LessonQuiz(props) {
    const [questions, setQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [correctCount, setCorrectCount] = useState(0);
    const [complete, setComplete] = useState(false);
    const [correctOpen, setCorrectOpen] = useState(false);
    const [incorrectOpen, setIncorrectOpen] = useState(false);
    const [completeOpen, setCompleteOpen] = useState(false);

    function redirectEnterKey() {
        const centerButton = document.getElementById('quiz-center');
        centerButton.click();
    }

    function getQuestionIndex(questionNum) {
        return questionNum - 1 - 3 * (props.lessonId - 1);
    }

    function prevQuestion() {
        setCurrentQuestion(questions[getQuestionIndex(currentQuestion.questionNumber) - 1]);
    }
    
    function nextQuestion() {
        setCurrentQuestion(questions[getQuestionIndex(currentQuestion.questionNumber) + 1]);
    }

    function checkAnswer() {
        const userAnswer = document.getElementById('quiz-answer').value.toLowerCase();
        const isCorrect = (userAnswer === currentQuestion.answer.toLowerCase());
        if (isCorrect) {
            currentQuestion.answered = true;
            document.getElementById('quiz-center').style.visibility = 'hidden';
            setCorrectOpen(true);
            setCorrectCount(correctCount + 1);
        } else {
            setIncorrectOpen(true);
        }
    }

    function advanceLessons() {
        window.location.href=`/lesson/${parseInt(props.lessonId)+1}`;
    }

    function handleCorrectClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
        setCorrectOpen(false);
    };

    function handleIncorrectClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
        setIncorrectOpen(false);
    };

    function handleCompleteClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
        setCompleteOpen(false);
    };


    useEffect(() => {
        setQuestions(props.questions);
    }, [])

    useEffect(() => {
        if (questions) {
          setCurrentQuestion(questions[0]);
        }
      }, [questions]);


    useEffect(() => {
        if (questions) {
            if (currentQuestion.answered) {
                document.getElementById('quiz-answer').value = currentQuestion.answer;
                document.getElementById('quiz-answer').setAttribute('readonly', true);
                if(!complete) {
                    document.getElementById('quiz-center').style.visibility = 'hidden';
                }
            } else {
                document.getElementById('quiz-answer').value='';
                document.getElementById('quiz-answer').removeAttribute('readonly', false);
                document.getElementById('quiz-center').style.visibility = 'visible';
            }
            const questionNum = currentQuestion.questionNumber;
            if (questionNum === questions[0].questionNumber) {
                document.getElementById('left-arrow').style.visibility = 'hidden';
            } else if (questionNum === questions.slice(-1)[0].questionNumber) {
                document.getElementById('right-arrow').style.visibility = 'hidden';
            } else {
                document.getElementById('left-arrow').style.visibility = 'visible';
                document.getElementById('right-arrow').style.visibility = 'visible';
            }
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (questions) {
            if (correctCount === questions.length) {
                setCompleteOpen(true);
                setComplete(true);
                document.getElementById('quiz-center').style.visibility = 'visible';
            }
        }
    }, [correctCount]);
    

    return (
        <>
            <Stack>
                <div className='quizHeader'>
                    <Typography variant='h5'>
                        Quiz
                    </Typography>
                </div>

                <div className='quizQuestion'>
                    {<LessonQuestion num={currentQuestion.questionNumber} content={currentQuestion.questionText} />}
                </div>

                <div className="quizAnswer">
                    <TextField name="user-answer" id="quiz-answer" variant="filled"  onKeyDown={(evt) => {
                        if(evt.key === 'Enter') {
                            if (!currentQuestion.answered) {
                                redirectEnterKey();
                            }
                        }
                    }}/>
                </div>

                {questions ? (
                    <div id="quiz-progress">
                        <LinearProgress variant="determinate" value={correctCount / questions.length * 100} />
                    </div>
                ) : (<></>)}


                <Grid container className="quizButtons">

                    <Grid item xs={3.5} md={1} alignItems={'center'} justifyContent={'center'}>
                        <IconButton id="left-arrow" className="quizArrows leftArrow" onClick={prevQuestion}>
                            <ArrowCircleLeftIcon color='primary' sx={{ fontSize: 50 }}  />
                        </IconButton>
                    </Grid>

                    <Grid item xs={4} md={3}>
                        {(complete ? (
                                <Button id="quiz-center" variant="outlined" type="button" value="Check" onClick={advanceLessons}>Continue</Button>
                            ) :
                            (
                                <Button id="quiz-center" variant="outlined" type="button" value="Check" onClick={checkAnswer}>Check</Button>
                            ))}
                    </Grid>

                    <Grid item xs={3.5} md={1} alignItems={'center'} justifyContent={'center'}>
                        <IconButton id="right-arrow" className="quizArrows rightArrow" onClick={nextQuestion}>
                            <ArrowCircleRightIcon color='primary' sx={{ fontSize: 50 }}  />
                        </IconButton>
                    </Grid>                                                

                </Grid>

            </Stack>

            <Snackbar open={correctOpen} autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} onClose={handleCorrectClose}>
                <Alert onClose={handleCorrectClose} severity="success" sx={{width: '100%'}}>
                    Your answer is correct!
                </Alert>
            </Snackbar>

            <Snackbar open={incorrectOpen} autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} onClose={handleIncorrectClose}>
                <Alert onClose={handleIncorrectClose} severity="warning" sx={{width: '100%'}}>
                    Your answer is incorrect!
                </Alert>
            </Snackbar>

            <Snackbar open={completeOpen} autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} onClose={handleCompleteClose}>
                <Alert onClose={handleCompleteClose} severity="success" sx={{width: '100%'}}>
                    You got all correct answers and completed this lesson's quiz!
                </Alert>
            </Snackbar>
        </>
    )
}

export default LessonQuiz;