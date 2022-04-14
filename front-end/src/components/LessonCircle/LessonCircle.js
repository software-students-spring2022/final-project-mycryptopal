import './LessonCircle.css';
import Typography from '@mui/material/Typography';

function LessonCircle(props) {
  const COLORS = ['color1', 'color2', 'color3', 'color4'];

  return (
    <>
      <div className={`mapButton ${COLORS[props.num % 4]} circle`} onClick={() => {
        window.location.href=`/lesson/id/${props.num}`;
      }}>
        <Typography variant='h6'>
          Lesson {props.num}
        </Typography>
      </div>
    </>
  );
}

export default LessonCircle;
