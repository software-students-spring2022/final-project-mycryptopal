import './Contact.css';

function Contact() {
  return (
    <>
      <div id="page-title">
        <div>Contact Us</div>
      </div>

      <div id="page-content">
        <div id="faq" className="section">
          <div className="contactHeader">
                        Frequently Asked Questions
          </div>
          <div className="faqQuestion">
                        Does myCryptoPal allow me to trade real money in the financial markets?
          </div>
          <div className="faqAnswer">
                        No, myCryptoPal does not allow users to trade real US dollars in financial markets.
                        The mission of our application is to spread awareness and educate users about cryptocurrencies and the
                        technology behind it. We hope users can learn how real crypto traders use tools such as stock graphs
                        to assist them in their financial decisions.
          </div>
          <div className="faqQuestion">
                        The myCryptoPal team seem to be educated about cryptocurrencies, should I ask the team what crypto I should buy?
          </div>
          <div className="faqAnswer">
                        Absolutely not. We are not financial advisors.
          </div>
          <div className="faqQuestion">
                        I feel like I've learned a lot from this application, how can I trade cryptocurrencies in real markets?
          </div>
          <div className="faqAnswer">
                        Our team is delighted to hear that this application has helped you learn more about cryptocurrencies
                        and has inspired you to trade real crypto. Cryptocurrencies are supported in various countries throughout the
                        world and each country has distinct laws in place regarding crypto. Certain countries require a specific age to be
                        reached. In the digital world, more and more retail investors are beginnning to use popular financial brokerage
                        apps to trade their crypto. Some popular apps that allow you to begin trading easily and seamlessly are
                        Coinbase, Binance, Robinhood, and Webull. There are many different ways you can go about the next step in your journey,
                        choose the path that works best for you and we hope that this is the start of a new adventure for you!
          </div>
        </div>

        <div id="contact-us" className="section">
          <div className="contactHeader">
                        Still Need Help? Contact Us!
          </div>
          <form name="contact-form" id="contact-form" action={`${process.env.REACT_APP_BACKEND_URL}/user/contact`} method="POST">
            <label htmlFor="contact-name" className="contactLabel">Your Name</label>
            <input name="contact-name" type="text"></input>
            <label htmlFor="contact-email" className="contactLabel">Your Email</label>
            <input name="contact-email" type="text"></input>
            <label htmlFor="contact-message" className="contactLabel">Your Message or Question</label>
            <textarea name="contact-message" type="text" className="contactMessage"></textarea>
            <input id="submitButton" onClick={popUp} type="submit" value="Submit"></input>
          </form>
        </div>
      </div>
    </>
  );
}

function popUp() {
  alert('Thank you for your message!\nOur team will get back to you as soon as possible :)');
}

export default Contact;
