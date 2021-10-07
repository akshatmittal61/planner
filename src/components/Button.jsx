import React from 'react'

const Button = ({ className, imgSrc, imgAlt, text, onClick, color, style }) => {
    return (
        <button className={`btn btn-${style} btn-${style}-${color} ${className}`} onClick={onClick}>
            <img className="btn__img" src={imgSrc} alt={imgAlt} />
            {text}
        </button>
    )
}

export default Button