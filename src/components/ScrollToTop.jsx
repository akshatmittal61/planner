import React from 'react'

const ScrollToTop = ({ onClick }) => {
    return (
        <button className="scroll-to-top" onClick={onClick}>
            <span className="material-icons">
                arrow_upward
            </span>
        </button>
    )
}

export default ScrollToTop
