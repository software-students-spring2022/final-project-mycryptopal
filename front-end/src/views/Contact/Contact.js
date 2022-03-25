import './Contact.css';

function Contact() {
    return (
        <>
            <div id="page-title">
                <h1>Contact Us</h1>
            </div>
            
            <div id="page-content">
                <div id="faq" className="section">
                    <div className="section-header">
                        Frequently Asked Questions
                    </div>
                    <div className="faqQuestion">
                        Sample Question 1
                    </div>
                    <div className="faqAnswer">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    </div>
                    <div className="faqQuestion">
                        Sample Question 2
                    </div>
                    <div className="faqAnswer">
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    </div>
                    <div className="faqQuestion">
                        Sample Question 3
                    </div>
                    <div className="faqAnswer">
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    </div>
                </div>

                <div id="contact-us" className="section">
                    <div className="section-header">
                        Still Need Help? Contact Us!
                    </div>
                    <form name="contact-form" id="contact-form" action="/contact" method="GET">
                        <label htmlFor="contact-name" className="contactLabel">Your Name</label>
                        <input name="contact-name" type="text"></input>
                        <label htmlFor="contact-email" className="contactLabel">Your Email</label>
                        <input name="contact-email" type="text"></input>
                        <label htmlFor="contact-message" className="contactLabel">Your Message or Question</label>
                        <textarea name="contact-message" type="text" className="contactMessage"></textarea>
                        <input id="submitButton" onClick={popUp} type="button" value="Submit"></input>
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