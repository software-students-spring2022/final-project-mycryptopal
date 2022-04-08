import './Login.css';

function Login() {
    return (
        <>
            <div id="login-title">
                <h1>Ready to Level Up Your Investing Career?</h1>

                <div id="logo">
                    <img src="https://picsum.photos/1000" alt="MyCryptoPal Logo"/>
                </div>

                <div id="title">
                    <h2>Login</h2>
                </div>
            </div>

            <div id="login-content">
                <div id="login">
                    <form>
                        <label htmlFor="username" className="loginLabel">Username</label>
                        <input name="username" type="text" className="credentials"></input>
                        <label htmlFor="password" className="loginLabel">Password</label>
                        <input name="password" type="password" className="credentials"></input>
                        <input onClick={() => window.location.href='/'} type="button" value="Login" className="formButton"></input>
                        <h2>Don't Have An Account?</h2>
                        <input onClick={() => window.location.href='/registration'} type="button" value="Create Account" className="formButton"></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;