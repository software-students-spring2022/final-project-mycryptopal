import './Login.css';

function Login() {
    return (
    <div className="login">
        <h1>Login</h1>
        <div>
            <form>
                <label for="username">Username:</label>
                <input name="username" type="text"></input>
                <label for="password">Password:</label>
                <input name="password" type="text"></input>
                <input id="loginButton" type="button" onclick="window.location.href = '/home';" value="Login"></input>
            </form>
        </div>
        <a href = '/registration'>
        <button className= "page-button"> Create Account </button>
        </a>
    </div>
    )
}

export default Login;