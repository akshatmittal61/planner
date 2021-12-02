import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Guide from './Guide.json';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Divider } from '@mui/material';
import i00 from '../../images/help/0/0.png';
import i01 from '../../images/help/0/1.png';
import i02 from '../../images/help/0/2.png';
import i10 from '../../images/help/1/0.png';
import i11 from '../../images/help/1/1.png';
import i12 from '../../images/help/1/2.png';
import i13 from '../../images/help/1/3.png';
import i14 from '../../images/help/1/4.png';
import i15 from '../../images/help/1/5.png';
import i20 from '../../images/help/2/0.png';
import i21 from '../../images/help/2/1.png';
import i22 from '../../images/help/2/2.png';
import i23 from '../../images/help/2/3.png';
import i24 from '../../images/help/2/4.png';
import i25 from '../../images/help/2/5.png';
import i26 from '../../images/help/2/6.png';
import i30 from '../../images/help/3/0.png';
import i31 from '../../images/help/3/1.png';
import i32 from '../../images/help/3/2.png';
import i33 from '../../images/help/3/3.png';
import i34 from '../../images/help/3/4.png';
import i35 from '../../images/help/3/5.png';
import i40 from '../../images/help/4/0.png';
import useDocumentTitle from '../../components/Title';

const HelpGuide = ({ X, Y, submit, GoToLink }) => {
    AOS.init();
    const GuideObject = Guide[X][Y];
    useDocumentTitle(GuideObject.headerTitle);
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    const images = [
        [i00, i01, i02],
        [i10, i11, i12, i13, i14, i15],
        [i20, i21, i22, i23, i24, i25, i26],
        [i30, i31, i32, i33, i34, i35],
        [i40]
    ];
    const submitHelp = (x, y) => {
        submit(x, y);
    }
    return (
        <div className="help-guide" data-aos="zoom-out">
            <div className="help-guide-box">
                <div className="help-guide-topbar">
                    <div className="help-guide-topbar-back" onClick={() => submitHelp(-1, -1)}>
                        <span className="help-guide-topbar-back__button">
                            <ArrowBackIcon />
                        </span>
                    </div>
                    <Link className={X === 4 ? "help-guide-topbar-open dispn" : "help-guide-topbar-open"} to={GoToLink}>
                        <div className="help-guide-topbar-open__button">
                            <OpenInNewIcon />
                        </div>
                    </Link>
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
                            <img className="help-guide-content-body__image__img" src={images[X][Y]} alt="Help Guide" />
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
