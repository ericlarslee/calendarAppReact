import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const EventCard = (props) => {
    return(
        <>
            {props.name}
            {props.description}
        </>
    );
}
export default EventCard;