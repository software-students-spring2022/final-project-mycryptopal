import { useEffect, useState } from 'react';
import './Settings.css';

function Settings() {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUser() {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/data`);
            const data = await res.json();
            setUser(data);
        }
        getUser();
    }, []);

    return (
        <>
            <div id="page-title">
                <div>Settings</div>
            </div>

            <div id="page-content">
                <div id="info">
                    <div id="profile-pic">
                        <img id="user-pic" src="https://picsum.photos/500" alt="profile" />
                        <div id="overlay">
                            Change Profile Picture
                        </div>
                    </div>
                    <h2>{user.firstName} {user.lastName}</h2>
                </div>

                <div id="personalization">
                    <form className="settingsForm">
                        <h3>Personalize</h3>
                        <label htmlFor="fname">First Name</label>
                        <input name="fname" type="text" value={user.firstName}></input>
                        <label htmlFor="lname">Last Name</label>
                        <input name="lname" type="text" value={user.lastName}></input>
                        <label htmlFor="uname">Username</label>
                        <input name="uname" type="text" value={user.userName}></input>
                        <label htmlFor="email">Email</label>
                        <input name="email" type="text" value={user.email}></input>
                        <input type="button" value="Save" id="saveButton"></input>
                    </form>

                    <form className="settingsForm">
                        <h3>Security</h3>
                        <label htmlFor="currpass">Current Password</label>
                        <input name="currpass" type="password"></input>
                        <label htmlFor="newpass">New Password</label>
                        <input name="newpass" type="password"></input>
                        <label htmlFor="newpassre">Retype New Password</label>
                        <input name="newpassre" type="password"></input>
                        <input type="button" value="Save" id="saveButton"></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Settings;