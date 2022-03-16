import './Contact.css';

function Contact() {
    return (
        <>
            <div id="page-title">
                <h1>Contact Page</h1>
            </div>
            
            <div id="page-content">
                <div id="faq" className="section">
                    <div className="section-header">
                        Frequently Asked Questions
                    </div>
                    <div className="question">
                        Sample Question 1
                    </div>
                    <div className="answer">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    </div>
                    <div className="question">
                        Sample Question 2
                    </div>
                    <div className="answer">
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    </div>
                    <div className="question">
                        Sample Question 3
                    </div>
                    <div className="answer">
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    </div>
                </div>

                <div id="contact-us" className="section">
                    <div className="section-header">
                        Still Need Help? Contact Us!
                    </div>
                    <form name="contact-form" action="/contact" method="GET">
                        <label htmlFor="contact-name">Your Name</label>
                        <input name="contact-name" type="text"></input>
                        <label htmlFor="contact-email">Your Email</label>
                        <input name="contact-email" type="text"></input>
                        <label htmlFor="contact-message">Your Message or Question</label>
                        <textarea name="contact-message" type="text"></textarea>
                        <input id="submitButton" onClick={popUp} type="button" value="Send"></input>
                    </form>
                </div>
            </div>
        </>
    )
}

function popUp() {
    alert("Thank you for your message!\nOur team will get back to you as soon as possible :)");
}

export default Contact;