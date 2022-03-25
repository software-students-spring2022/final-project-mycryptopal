import './LessonCircle.css';

function LessonCircle(props) {
    const COLORS = ['greenButton', 'yellowButton', 'blueButton', 'redButton'];

    return (
        <>
            <div className={"mapButton " + COLORS[props.num % 4]} onClick={() => {
                window.location.href='/lesson'
            }}>
                Lesson {props.num}
            </div>
        </>
    )
}

export default LessonCircle;