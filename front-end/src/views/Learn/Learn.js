import LessonCircle from '../../components/LessonCircle/LessonCircle';
import './Learn.css';

function Learn() {
    const lessons = []
    let num = 1;
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 3; j++) {
            lessons.push(<LessonCircle key={num} num={num}/>);
            num += 1;
        }
    }

    return (
        <>
            <div id="page-title">
                <h1>Learn</h1>
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