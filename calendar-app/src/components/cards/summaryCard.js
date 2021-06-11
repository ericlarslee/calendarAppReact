import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteSummary } from '../Services/services';
import deleteIcon from '../images/deleteIcon.png';

const SummaryCard = (props) => {
    return(
        <Card.Body>
            <blockquote className="blockquote mb-0">
                <em>
                    {props.body}
                </em>
                <img src={deleteIcon} onClick={() => deleteSummary(props.id)} height='20px' width='20px' style={{paddingLeft: '4px', cursor: 'pointer'}}/>
            </blockquote>
        </Card.Body>
    );
}
export default SummaryCard;