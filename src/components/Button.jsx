import React from 'react'
import { useWebContext } from './Context/WebContext'

const Button = ({ className, imgSrc, imgAlt, text, onClick, color, variant }) => {
    const { theme } = useWebContext();
    const style = theme === "light" ? "outline" : "fill";
    return (
        <button className={`btn btn-${style} btn-${style}-${color} ${className} ${variant === "small" ? "btn-small" : ""}`} onClick={onClick}>
            {variant !== "small" && <img className="btn__img" src={imgSrc} alt={imgAlt} />}
            {text}
        </button>
    )
}

export default Button