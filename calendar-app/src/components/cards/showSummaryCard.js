import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';

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