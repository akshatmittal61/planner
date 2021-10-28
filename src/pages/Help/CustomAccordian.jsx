import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomAccordian = ({ style, title, paras, x, submit }) => {
    const submitHelp = (y) => {
        submit(x, y);
    }
    return (
        <Accordion defaultExpanded={false} sx={style}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className="help-body-accordian-title">
                    {title}
                </div>
            </AccordionSummary>
            <AccordionDetails>
                {
                    paras.map((para, index) => (
                        <div key={index} className="help-body-accordian-paragraph" onClick={() => submitHelp(index)}>
                            {para}
                        </div>
                    ))
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default CustomAccordian
