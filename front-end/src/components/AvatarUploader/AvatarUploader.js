import './AvatarUploader.css';


function AvatarUploader(props) {
    return (
        <div id="avatar-uploader">
            <img id="current-pic" src="https://picsum.photos/500" alt="avatar" />
            <div id="upload-overlay">
                Change Profile Picture
            </div>
        </div>
    )
}

export default AvatarUploader;