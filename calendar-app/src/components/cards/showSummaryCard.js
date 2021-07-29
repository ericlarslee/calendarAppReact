import React from 'react';
import { Card } from 'react-bootstrap';

const ShowSummaryCard = (props) => {
    return (
        <>
            <Card.Body >
                    Summary:
                    {props.mapSummary()}
            </Card.Body>
        </>
    );
}
export default ShowSummaryCard;