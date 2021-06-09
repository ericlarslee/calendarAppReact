import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';

const ShowSummaryCard = (props) => {
    return (
        <>
        <Container className="display-flex" style={{display:"flex", justifyContent: "center"}}>
            <Row className="justify-content-center">
                <Card className="text-center justify-content-center" >
                    <Card.Body >
                        {props.mapSummary()}

                    </Card.Body>
                </Card>
            </Row>
        </Container>
        </>
    );
}
export default ShowSummaryCard;