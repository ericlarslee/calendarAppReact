import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const EventCard = (props) => {
    return(
        <ListGroupItem>{props.body}</ListGroupItem>
    );
}
export default EventCard;