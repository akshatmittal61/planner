import React, { useState } from 'react'
import { Tooltip } from '@mui/material'

const ScrollToTop = () => {
    const [showScrollButton, setshowScrollButton] = useState(false);
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 200) setshowScrollButton(true);
        else setshowScrollButton(false);
    }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return (
        <>
            {
                showScrollButton && (
                    <Tooltip title="Scroll To Top">
                        <button className="scroll-to-top" onClick={topFunction}>
                            <span className="material-icons">
                                arrow_upward
                            </span>
                        </button>
                    </Tooltip>
                )
            }
        </>
    )
}

export default ScrollToTop
