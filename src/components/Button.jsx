import React from 'react'
import { useWebContext } from './Context/WebContext'

const Button = ({ className, text, variant, size, color, onClick, type, imgSrc, imgAlt }) => {
    const { theme } = useWebContext();
    variant = theme === "light" ? "outline" : "fill";
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
        <button className={classes + ` ${className}`} onClick={onClick} type={type}>
            {size !== "small" && <img className="btn__img" src={imgSrc} alt={imgAlt} />}
            {text}
        </button>
    )
}

export default Button