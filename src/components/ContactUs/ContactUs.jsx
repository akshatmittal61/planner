import React from 'react'
import Card from './Card';
import people from './people.json';

const ContactUs = () => {
    return (
        <div className="contact">
            <div className="contact-container">
                <div className="row">
                    {
                        people.map((person, index) => (
                            index === 0 && <div key={index} className="contact-card-container col-lg-50 col-md-100 col-sm-100">
                                <Card
                                    name={person.name}
                                    image={person.image}
                                    skills={person.skills}
                                    summary={person.summary}
                                    about={person.about}
                                    socialLinks={person.socialLinks}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ContactUs
