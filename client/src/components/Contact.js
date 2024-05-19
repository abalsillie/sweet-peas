import React from 'react';

function Contact() {
    return (
        <div className="container d-flex flex-column justify-content-center min-vh-60">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="title">Get in touch!</h1>
                    <form
                        action="https://getform.io/f/(customSlugHere)"
                        method="POST"
                        className="d-flex flex-column"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="inputField"
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            rows="10"
                            className="inputField"
                        />
                        <button
                            type="button"
                            className="submitButton"
                        >
                            Let's Collaborate!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;
