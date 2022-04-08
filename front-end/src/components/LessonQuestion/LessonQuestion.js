import './LessonQuestion.css';

function LessonQuestion(props) {
  return (
    <div className="quizQuestion">
      <div className="questionNumber">
                Question {props.num}
      </div>
      <div className="questionContent">
        {props.content}
      </div>
    </div>
  );
}

export default LessonQuestion;
