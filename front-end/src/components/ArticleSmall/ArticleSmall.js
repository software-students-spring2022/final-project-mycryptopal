import './ArticleSmall.css';

function ArticleSmall(props) {
  let layoutClasses;
  if (props.windowWidth > 780) {
    layoutClasses = {
      general: 'desktopArticleSmall',
      picture: 'desktopArticlePicture',
      content: 'desktopArticleContent',
      title: 'desktopArticleTitle',
      summary: 'desktopArticleSummary',
    };
  } else {
    layoutClasses = {
      general: 'mobileArticleSmall',
      picture: 'mobileArticlePicture',
      content: 'mobileArticleContent',
      title: 'mobileArticleTitle',
      summary: 'mobileArticleSummary',
    };
  }
  return (
    <>
      <div className={`articleSmall ${layoutClasses.general}`} onClick={() => window.open(props.link)}>
        <div className={`articleSmallPicture ${layoutClasses.picture}`}>
          <img src={props.picture} alt=""></img>
        </div>
        <div className={`articleSmallContent ${layoutClasses.content}`}>
          <div className={`articleSmallTitle ${layoutClasses.title}`}>{props.title}</div>
          <div className={`articleSmallSummary ${layoutClasses.summary}`}>{props.summary}</div>
        </div>
      </div>
    </>
  );
}

export default ArticleSmall;
