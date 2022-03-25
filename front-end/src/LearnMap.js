import LearnCircle from './LearnCircle';
import './LearnMap.css';

function LearnMap() {
    const lessons = []
    let num = 1;
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 3; j++) {
            lessons.push(<LearnCircle key={num} num={num}/>);
            num += 1;
        }
    }

    return (
        <>
            <div id="page-title">
                <h1>LearnMap</h1>
            </div>
            <div id="page-content">
                <div id="lesson-map">
                    {lessons}
                </div>
            </div>  
        </>
        )
}

export default LearnMap;