import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({ className, text, variant, size, color, onClick, type, imgSrc, imgAlt, containsLink = false, link = '' }) => {
    let classes = "btn";
    if (variant === "fill" || variant === "outline") {
        classes += ` btn-${variant}`;
        if (color === "light" || color === "dark" || color === "red" || color === "blue" || color === "green" || color === "yellow") {
            classes += `-${color}`
        }
    }
    else {
        if (color === "light" || color === "dark" || color === "red" || color === "blue" || color === "green" || color === "yellow") {
            classes += ` btn-${color}`
        }
    }
    if (size === "small") {
        classes += " btn-sm";
    }
    if (size === "large") {
        classes += " btn-lg";
    }
    return (
        <>
            {!containsLink ? (
                <button className={`${classes} ${className}`} onClick={onClick} type={type}>
                    {size !== "small" && <img className="btn__img" src={imgSrc} alt={imgAlt} />}
                    {text}
                </button>
            ) : (
                <Link to={link}>
                    <button className={`${classes} ${className}`} type={type}>
                        {size !== "small" && <img className="btn__img" src={imgSrc} alt={imgAlt} />}
                        {text}
                    </button>
                </Link>
            )}
        </>
    )
}

export default Button