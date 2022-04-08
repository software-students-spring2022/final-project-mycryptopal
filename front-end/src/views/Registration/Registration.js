import './Registration.css';

function Registration() {
  return (
    <>
      <div id="bg"></div>
      <div id="page">
        <div className="registrationSection">
          <div className="tagLine">
                        Start Your Journey Today!
          </div>

          <div className="appLogo">
            <img src="https://picsum.photos/1000" alt="MyCryptoPal Logo"/>
          </div>
        </div>

        <div className="registrationSection">
          <form id="registration-form" action={`${process.env.REACT_APP_BACKEND_URL}/register`} method="POST">
            <label htmlFor="first" className="label">First Name</label>
            <input name="first" type="text" className="credentials" required />
            <label htmlFor="last" className="label">Last Name</label>
            <input name="last" type="text" className="credentials" required />
            <label htmlFor="email" className="label">Email</label>
            <input name="email" type="text" className="credentials" required />
            <label htmlFor="username" className="label">Username</label>
            <input name="username" type="text" className="credentials" required />
            <label htmlFor="password" className="label">Password</label>
            <input name="password" type="password" className="credentials" required />
            <label htmlFor="repassword" className="label">Reenter Password</label>
            <input name="repassword" type="password" className="credentials" required />
            <input type="submit" value="Register" className="submitButton"></input>
          </form>

          <form id="redirect">
            <h2>Already Have An Account?</h2>
            <input onClick={() => window.location.href='/login'} type="button" value="Login!" className="submitButton"></input>
          </form>
        </div>
      </div>
    </>

  );
}

export default Registration;
