import './Registration.css';

function Registration() {
    return (
        <>
            <div id="page-title">
                <h1>Ready to Level Up Your Investing Career?</h1>

                <div id="logo">
                    <img src="https://picsum.photos/300" alt="MyCryptoPal Logo"/>
                </div>

                <div id="title">
                    <h2>Registration</h2>
                </div>
            </div>

            <div id="page-content">
                <div id="registration">
                    <form>
                        <label htmlFor="first">First Name</label>
                        <input name="first" type="text" className="credentials"></input>
                        <label htmlFor="last">Last Name</label>
                        <input name="last" type="text" className="credentials"></input>
                        <label htmlFor="email">Email</label>
                        <input name="email" type="text" className="credentials"></input>
                        <label htmlFor="username">Username</label>
                        <input name="username" type="text" className="credentials"></input>
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" className="credentials"></input>
                        <label htmlFor="repassword">Reenter Password</label>
                        <input name="repassword" type="password" className="credentials"></input>
                        <input onClick={() => window.location.href='/login'} type="button" value="Create Account" className="formButton"></input>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Registration;