import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';

const ShowSummaryCard = (props) => {
    return (
        <>
        
                {/* <Card className="text-center justify-content-center" style={{border: '1px solid black'}} > */}
                    <Card.Body >
                        Summary:
                        {props.mapSummary()}

                    </Card.Body>
                {/* </Card> */}
            
        </>
    );
}
export default ShowSummaryCard;