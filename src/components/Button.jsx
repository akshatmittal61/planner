import React from 'react'
import { useWebContext } from './Context/WebContext'

const Button = ({ className, imgSrc, imgAlt, text, onClick, color }) => {
    const { theme } = useWebContext();
    const style = theme === "light" ? "outline" : "fill";
    console.log(imgSrc);
    return (
        <button className={`btn btn-${style} btn-${style}-${color} ${className}`} onClick={onClick}>
            {imgSrc !== null && <img className="btn__img" src={imgSrc} alt={imgAlt} />}
            {text}
        </button>
    )
}

export default Button