import './AvatarUploader.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

function AvatarUploader(props) {
    const fileDialog = useRef(null);
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
        if(props.userId){
            async function getAvatarURL() {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/avatar/${props.userId}`);
                const data = await res.json();
                console.log(data);
                setAvatarURL(`${process.env.REACT_APP_BACKEND_URL}/static/${data.url}`);
              }
            getAvatarURL();
        }
    }, [props.userId]);

    function onOverlayClick() {
       fileDialog.current.click();
    };

    function onFileChange(evt) {
        const uploadFile = evt.target.files[0];
        if(uploadFile.type.startsWith('image/')){
            const uploadForm = new FormData();
            uploadForm.append('userId', props.userId);
            uploadForm.append('avatar', uploadFile);
            axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/avatar`, uploadForm, {})
            .then(res => {
                window.location.href = '/settings';
            })
            .catch(err => console.log(err));    
        };
    }

    return (
        <div id="avatar-uploader">
            <input id="file-dialog" type='file' ref={fileDialog} accept="image/*" onChange={onFileChange}/>
            <img id="current-pic" src={avatarURL} alt="avatar" onError={(evt) => {evt.target.src = 'https://picsum.photos/320'}} />
            <div id="upload-overlay" onClick={onOverlayClick}>
                Change Profile Picture
            </div>
        </div>
    )
}

export default AvatarUploader;