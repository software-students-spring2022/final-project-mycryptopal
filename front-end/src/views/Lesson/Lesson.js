import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './Lesson.css';
import LessonQuiz from '../../components/LessonQuiz/LessonQuiz';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Lesson() {
  const {lessonID: lessonId} = useParams();
  const [lesson, setLesson] = useState({});
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({});

  useEffect(() => {
    async function getCurrentLesson() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lesson/${lessonId}`);
      const data = await res.json();
      setLesson(data);
    }
    getCurrentLesson();
  }, [lessonId]);

  useEffect(() => {
    if (lesson !== undefined) {
      if (lesson.questions) {
        setQuestions(lesson.questions);
      }
    }
  }, [lesson]);

  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions]);

  return (
    <>
      <div id="page-title">
        <Typography variant='h4' fontWeight={'bold'}>Lesson</Typography>
      </div>
      <div id="page-content">
        <Stack id="lesson-body">
          <div className="lessonHeader">
            <Typography variant='h5'>
              {lesson.title}
            </Typography>
          </div>
          <div id="lesson-content">
            <Typography variant='body1'>
              {lesson.content}
            </Typography>
          </div>
        </Stack>        
        
        <div className='divider'></div>

        <div id="lesson-quiz">
          {questions ? 
          (
            <LessonQuiz lessonId={lessonId} questions={questions} />
          ) : (<></>)}
        </div>
        <div id="map-button">
          <button onClick={() => window.location.href='/learn'}>Back to Map</button>
        </div>
      </div>
    </>
  );
}

export default Lesson;
