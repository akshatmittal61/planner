import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HelpGuide = () => {
    return (
        <div className="help-guide">
            <div className="help-guide-box">
                <div className="help-guide-topbar">
                    <div className="help-guide-topbar-back">
                        <span className="help-guide-topbar-back__button">
                            <ArrowBackIcon />
                        </span>
                    </div>
                </div>
                <div className="help-guide-content">
                    <div className="help-guide-title"></div>
                </div>
            </div>
        </div>
    )
}

export default HelpGuide
