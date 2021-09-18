import React from "react";
import AppBoxLink from './AppBoxLink';
import AppLinks from '../AppLinks.js';
const AppBox = () => {
    return (
        <div className="header-appbox">
            {
                AppLinks.map((AppLink => (
                    <AppBoxLink icon={AppLink.icon} label={AppLink.label} link={AppLink.link} />
                )))
            }
        </div>
    );
}
export default AppBox;