import './Login.css';

function Login() {
    return (
        <>
            <div id="bg"></div>
            <div id="page">
                <div className="loginSection">
                    <div className="tagLine">
                        Ready to Level Up Your Investing Career?
                    </div>

                    <div className="appLogo">
                        <img src="https://picsum.photos/1000" alt="MyCryptoPal Logo"/>
                    </div>
                </div>

                <div className="loginSection">
                    <form id="login-form" action="http://localhost:4000/login" method="POST">
                        <label htmlFor="username" className="label">Username</label>
                        <input name="username" type="text" className="credentials" required />
                        <label htmlFor="password" className="label">Password</label>
                        <input name="password" type="password" className="credentials"required />
                        <input type="submit" value="Login" className="submitButton"></input>
                    </form>

                    <form id="redirect">
                        <h2>Don't Have An Account?</h2>
                        <input onClick={() => window.location.href='/registration'} type="button" value="Register!" className="submitButton"></input>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;