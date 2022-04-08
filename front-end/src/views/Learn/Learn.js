import { useState, useEffect } from 'react';
import LessonCircle from '../../components/LessonCircle/LessonCircle';
import './Learn.css';

function Learn() {
    const [lessonCount, setLessonCount] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);   
        }
        window.addEventListener('resize', handleResize);
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
            return <LessonCircle key={i+1} num={i+1} windowWidth={windowWidth}/>;
        });
        setLessons(lessons);
    }, [lessonCount, windowWidth]);

    return (
        <>
            <div id="page-title">
                <div>Learn</div>
            </div>
            <div id="page-content">
                <div id="lesson-map">
                    {lessons}
                </div>
            </div>  
        </>
        )
}

export default Learn;