import React from 'react'
import useDocumentTitle from '../../components/Title';
import Card from './Card';
import people from './people.json';
import user1 from '../../images/akshat.png'

const ContactUs = () => {
    useDocumentTitle('Contact Us');
    return (
        <div className="contact">
            <div className="contact-container">
                <div className="row">
                    {
                        people.map((person, index) => (
                            index === 0 && <div key={index} className="contact-card-container col-lg-100 col-md-100 col-sm-100">
                                <Card
                                    name={person.name}
                                    image={user1}
                                    skills={person.skills}
                                    summary={person.summary}
                                    about={person.about}
                                    socials={person.socials}
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
