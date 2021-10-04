import React, { useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '@mui/material';

const JumpToMonth = ({ currentMonth, close, submit }) => {
    const inputStyle = { color: "var(--tcolor)" };
    const [month, setMonth] = useState(currentMonth);
    console.log(month);
    const handleChange = (e) => {
        setMonth(e.target.value);
    }
    const submitMonth = (e) => {
        e.preventDefault();
        submit(month);
        setMonth(() => {
            return month;
        })
    }
    return (
        <div className="calendar-edit">
            <div className="calendar-edit-box">
                <div className="calendar-edit-box-topbar">
                    <div className="calendar-edit-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </div>
                </div>
                <form className="calendar-edit-box-form" onSubmit={submitMonth}>
                    <div className="calendar-edit-box-form__content">
                        <div className="calendar-edit-box-form__group">
                            <label className="calendar-edit-box-form__label" htmlFor="month">
                                <AccessTimeIcon />
                            </label>
                            <Input
                                type="month"
                                className="calendar-edit-box-form__input"
                                id="month"
                                name="month"
                                placeholder={month}
                                style={inputStyle}
                                value={month}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="calendar-edit-box-form__buttons">
                        <div className="calendar-edit-box__button">
                            <Button variant="text" className="calendar-edit-box__button-cancel" onClick={close}>Cancel</Button>
                        </div>
                        <div className="calendar-edit-box__button">
                            <Button variant="contained" className="calendar-edit-box__button-cancel" type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default JumpToMonth
