import React from 'react'
import { useWebContext } from './Context/WebContext'

const Button = ({ className, imgSrc, imgAlt, text, onClick, color, variant }) => {
    const { theme } = useWebContext();
    const style = theme === "light" ? "outline" : "fill";
    const btnStyle = {
        fontSize: variant === "small" ? "0.75rem" : "0.875rem",
        padding: variant === "small" ? "0.6rem 0.75rem" : ".625rem 1rem .625rem 0.75rem"
    };
    console.log(imgSrc);
    return (
        <button className={`btn btn-${style} btn-${style}-${color} ${className}`} onClick={onClick} style={btnStyle}>
            {variant !== "small" && <img className="btn__img" src={imgSrc} alt={imgAlt} />}
            {text}
        </button>
    )
}

export default Button