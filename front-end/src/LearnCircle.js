import './LearnCircle.css';

function LearnCircle(props) {
    const COLORS = ['greenButton', 'yellowButton', 'blueButton', 'redButton'];

    return (
        <>
            <div className={"mapButton " + COLORS[props.num % 4]} onClick={() => {
                window.location.href='/learn'
            }}>
                Lesson {props.num}
            </div>
        </>
    )
}

export default LearnCircle;