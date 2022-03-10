import './Login.css';

function Login() {
    return (
    <div className="login">
        <h1>Login</h1>
        <div>
            <form>
                <label>
                    Username: <input type="text" />
                </label>
                <br />
                <label>
                    Password: <input type="text" />
                </label>
            </form>
        </div>
        <button
            // onClick={() => navigateToPage('/home')} //need to decide on page after login - commented out as the onClick function is a placeholder that breaks the app
            className="page-button"
        >
            Login
        </button>
        <button
            // onClick={() => navigateToPage('/registration')} //need to talk to backend - commented out as the onClick function is a placeholder that breaks the app 
            className="page-button"
        >
            Create Account
        </button>
    </div>
    )
}

export default Login;