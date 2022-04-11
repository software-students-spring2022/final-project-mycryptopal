import {useState, useEffect} from 'react';
import LessonCircle from '../../components/LessonCircle/LessonCircle';
import './Learn.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Learn() {
  const [lessonCount, setLessonCount] = useState(0);
  const [lessons, setLessons] = useState([]);

  function generateLessonGrid(grid, lessons, spacing, xs, marginBottom) {
    let min = 0; let max;
    const elements = [];
    for (const num of grid) {
      max = min + num;
      elements.push(
          <Grid container spacing={spacing} className='lessonMap'>
            {
              lessons.slice(min, max).map((lesson) => {
                return (
                  <Grid item xs={xs} marginBottom={marginBottom}>
                    {lesson}
                  </Grid>
                );
              })
            }
          </Grid>
      );
      min = max;
    }
    return elements;
  }

  useEffect(() => {
    async function getLessonCount() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lesson/`);
      const data = await res.json();
      const length = Object.keys(data).length;
      setLessonCount(length);
    }
    getLessonCount();
  }, []);

  useEffect(() => {
    const lessons = new Array(lessonCount).fill(0).map((ele, i) => {
      return <LessonCircle key={i+1} num={i+1} />;
    });
    setLessons(lessons);
  }, [lessonCount]);

  return (
    <>
      <div id="page-title">
        <Typography variant='h4' fontWeight={'bold'}>Learn</Typography>
      </div>

      <div id="page-content">
        <Box id="desktop-map" display={{'xs': 'none', 'md': 'block'}}>
          {
            generateLessonGrid([4, 3, 4], lessons, 2, 2)
          }
        </Box>

        <Box id="mobile-map" display={{'xs': 'block', 'md': 'none'}}>
          {
            generateLessonGrid([2, 2, 2, 2, 2, 1], lessons, 2, 5, '1vh')
          }
        </Box>
      </div>
    </>
  );
}

export default Learn;
