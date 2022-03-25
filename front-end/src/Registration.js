import './Registration.css';

function Registration() {
    return (
        <>
            <div id="registration-title">
                <h1>Ready to Level Up Your Investing Career?</h1>

                <div id="logo">
                    <img src="https://picsum.photos/1000" alt="MyCryptoPal Logo"/>
                </div>

                <div id="title">
                    <h2>Registration</h2>
                </div>
            </div>

            <div id="registration-content">
                <div id="registration">
                    <form>
                        <label htmlFor="first" className="registerLabel">First Name</label>
                        <input name="first" type="text" className="credentials"></input>
                        <label htmlFor="last" className="registerLabel">Last Name</label>
                        <input name="last" type="text" className="credentials"></input>
                        <label htmlFor="email" className="registerLabel">Email</label>
                        <input name="email" type="text" className="credentials"></input>
                        <label htmlFor="username" className="registerLabel">Username</label>
                        <input name="username" type="text" className="credentials"></input>
                        <label htmlFor="password" className="registerLabel">Password</label>
                        <input name="password" type="password" className="credentials"></input>
                        <label htmlFor="repassword" className="registerLabel">Reenter Password</label>
                        <input name="repassword" type="password" className="credentials"></input>
                        <input onClick={() => window.location.href='/login'} type="button" value="Create Account" className="formButton"></input>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Registration;