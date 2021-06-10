import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteEvent } from '../Services/services'

const EventCard = (props) => {
    return(
        <>
            {props.name}
            <br />
            {props.description}
            <br />
            <Button onClick={() =>deleteEvent(props.id)}>Delete event</Button>
            <br />
        </>
    );
}
export default EventCard;