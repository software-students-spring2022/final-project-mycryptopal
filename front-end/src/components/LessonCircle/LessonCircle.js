import './LessonCircle.css';

function LessonCircle(props) {
    const COLORS = ['color1', 'color2', 'color3', 'color4'];
    let sizeClass;
    if(props.windowWidth > 780) {
        sizeClass = 'desktopCircle';
    }
    else{
        sizeClass = 'mobileCircle';
    }

    return (
        <>
            <div className={`mapButton ${COLORS[props.num % 4]} ${sizeClass}`} onClick={() => {
                window.location.href=`/lesson/${props.num}`
            }}>
                Lesson {props.num}
            </div>
        </>
    )
}

export default LessonCircle;