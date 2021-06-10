import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteSummary } from '../Services/services';

const SummaryCard = (props) => {
    return(
        <Card.Body>
            <blockquote className="blockquote mb-0">
                <em>
                    {props.body}
                </em>
                <Button onClick={() => deleteSummary(props.id)}>Delete Summary</Button>
            </blockquote>
        </Card.Body>
    );
}
export default SummaryCard;