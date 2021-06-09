import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ListEventCards = (props) => {
    return (
        <Card style={{ display:"flex", justifyContent: "center", verticalAlign: 'center', }}>
            <Card.Body>
                <Card.Title>{props.date}</Card.Title>
                <Card.Text>
                    Hello, {props.name}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {props.mapEventCards}

            </ListGroup>
        </Card>
    );
}
export default ListEventCards;