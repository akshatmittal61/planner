import React from 'react'
import Guide from './Guide.json';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Divider } from '@mui/material';

const HelpGuide = ({ X, Y, submit, GoToLink }) => {
    const GuideObject = Guide[X][Y];
    const submitHelp = (x, y) => {
        submit(x, y);
    }
    return (
        <div className="help-guide">
            <div className="help-guide-box">
                <div className="help-guide-topbar">
                    <div className="help-guide-topbar-back" onClick={() => submitHelp(-1, -1)}>
                        <span className="help-guide-topbar-back__button">
                            <ArrowBackIcon />
                        </span>
                    </div>
                    <div className={X === 4 ? "help-guide-topbar-open dispn" : "help-guide-topbar-open"} onClick={GoToLink}>
                        <div className="help-guide-topbar-open__button">
                            <OpenInNewIcon />
                        </div>
                    </div>
                </div>
                <div className="help-guide-content">
                    <div className="help-guide-content-header">
                        <div className="help-guide-content-header__title">
                            {GuideObject.headerTitle}
                        </div>
                        <div className="help-guide-content-header__subtitle">
                            {GuideObject.headerSubtitle}
                        </div>
                    </div>
                    <Divider sx={{ borderColor: "var(--back-shadow)" }} />
                    <div className="help-guide-content-body">
                        <div className="help-guide-content-body__title">
                            {GuideObject.bodyTitle}
                        </div>
                        <div className="help-guide-content-body__points">
                            <ol className="help-guide-content-body__list">
                                {
                                    GuideObject.points.map((point, index) => (
                                        <li key={index} className="help-guide-content-body__point">
                                            {point}
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                        <div className="help-guide-content-body__image">
                            <img className="help-guide-content-body__image__img" src={`./images/help/${X}/${Y}.png`} alt="Help Guide" />
                        </div>
                    </div>
                    <div className="help-guide-content-footer">
                        <div className="help-guide-content-footer__title">
                            Related Articles
                        </div>
                        <div className="help-guide-content-footer__points">
                            <ul className="help-guide-content-footer__list">
                                {
                                    Guide[X].map((guide, index) => (
                                        index !== parseInt(Y) && <li key={index} className="help-guide-content-footer__point" onClick={() => submitHelp(parseInt(X), index)}>
                                            {guide.headerTitle}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelpGuide
