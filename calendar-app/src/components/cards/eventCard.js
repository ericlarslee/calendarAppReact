import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const EventCard = (props) => {
    return(
        <>
        <ListGroupItem>
            {props.name}
            <br />
            {props.description}
        </ListGroupItem>
        </>
    );
}
export default EventCard;