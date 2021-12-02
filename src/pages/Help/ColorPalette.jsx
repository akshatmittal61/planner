import React, { useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Divider, Tooltip } from '@mui/material';

const ColorPalette = ({ submit }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const submitHelp = (x, y) => {
        submit(x, y);
    }
    const weights = [100, 400, 700];
    const primary = ["bgcolor", "tcolor"];
    const secondary = [
        "red",
        "pink",
        "purple",
        "dark-purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "green",
        "light-green",
        "yellow",
        "orange",
        "deep-orange",
        "brown",
        "grey",
        "blue-grey"
    ];
    return (
        <div className="help-guide">
            <div className="help-guide-box">
                <div className="help-guide-topbar">
                    <div className="help-guide-topbar-back" onClick={() => submitHelp(-1, -1)}>
                        <span className="help-guide-topbar-back__button">
                            <ArrowBackIcon />
                        </span>
                    </div>
                    <div className="help-guide-topbar-open dispn">
                        <div className="help-guide-topbar-open__button">
                            <OpenInNewIcon />
                        </div>
                    </div>
                </div>
                <div className="help-guide-content">
                    <div className="help-guide-content-header">
                        <div className="help-guide-content-header__title">
                            Color Palette
                        </div>
                    </div>
                    <Divider sx={{ borderColor: "var(--back-shadow)" }} />
                    <div className="help-guide-content-body">
                        <div className="help-guide-content-body__title">
                            Primary Colors
                        </div>
                        <div className="help-guide-content-body__color-blocks">
                            <div className="row">
                                {
                                    primary.map((color, index) => (
                                        <div key={index} className="col-lg-20 col-md-20 col-sm-20">
                                            <Tooltip title={color}>
                                                <span
                                                    className="help-guide-content-body__color-blocks__block"
                                                    style={{ backgroundColor: "var(--" + color + ")" }}
                                                />
                                            </Tooltip>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__colors row">
                                {
                                    primary.map((color, index) => (
                                        <div key={index} className="col-lg-33 col-md-50 col-sm-50">
                                            <div className="help-guide-content-body__color">
                                                <div
                                                    className="help-guide-content-body__color__main"
                                                    style={{
                                                        backgroundColor: `var(--${color})`,
                                                        color: index === 0 ? "var(--tcolor)" : "var(--bgcolor)"
                                                    }}
                                                >
                                                    {color}
                                                </div>
                                                <div className="help-guide-content-body__color__weights">
                                                    {
                                                        weights.map((weight, index2) => (
                                                            <span
                                                                key={index2}
                                                                className="help-guide-content-body__color__weight"
                                                                style={{
                                                                    backgroundColor: `var(--${color}-${weight})`,
                                                                    color: index === 0 ? "var(--tcolor)" : "var(--bgcolor)"
                                                                }}
                                                            >
                                                                {`${color}-${weight}`}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="help-guide-content-body__title">
                            Secondary Colors
                        </div>
                        <div className="help-guide-content-body__color-blocks">
                            <div className="row">
                                {
                                    secondary.map((color, index) => (
                                        <div key={index} className="col-lg-20 col-md-20 col-sm-20">
                                            <Tooltip title={color}>
                                                <span
                                                    className="help-guide-content-body__color-blocks__block"
                                                    style={{ backgroundColor: "var(--" + color + ")" }}
                                                />
                                            </Tooltip>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__colors row">
                                {
                                    secondary.map((color, index) => (
                                        <div key={index} className="col-lg-33 col-md-50 col-sm-50">
                                            <div className="help-guide-content-body__color">
                                                <div
                                                    className="help-guide-content-body__color__main"
                                                    style={{
                                                        backgroundColor: `var(--${color})`,
                                                    }}
                                                >
                                                    {color}
                                                </div>
                                                <div className="help-guide-content-body__color__weights">
                                                    {
                                                        weights.map((weight, index2) => (
                                                            <span
                                                                key={index2}
                                                                className="help-guide-content-body__color__weight"
                                                                style={{
                                                                    backgroundColor: `var(--${color}-${weight})`,
                                                                }}
                                                            >
                                                                {`${color}-${weight}`}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorPalette
