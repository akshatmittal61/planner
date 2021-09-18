import React from 'react'
const SocialObject = ({ link, name }) => {
    return (
        <div className="col-lg-50 side-bar-social-object">
            <a href={link} className="side-bar-social-link">{name}</a>
        </div>
    )
}
export default SocialObject;