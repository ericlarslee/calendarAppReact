import React from 'react';
import { Card } from 'react-bootstrap';

const SummaryCard = (props) => {
    return(
        <Card.Body>
            <blockquote className="blockquote mb-0">
                <p>
                    {props.body}
                    place button here later for changing
                </p>
            </blockquote>
        </Card.Body>
    );
}
export default SummaryCard;