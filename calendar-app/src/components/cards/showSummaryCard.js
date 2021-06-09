import React from 'react';
import { Card } from 'react-bootstrap';

const ShowSummaryCard = (props) => {
    return (
        <Card.Body>
            {props.mapSummaryCard}
        </Card.Body>
    );
}
export default ShowSummaryCard;