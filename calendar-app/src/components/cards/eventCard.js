import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteEvent } from '../Services/services';
import deleteIcon from '../images/deleteIcon.png';

const EventCard = (props) => {
    return(
        <>
            {props.name}
            <br />
            
                {props.description}
            <img src={deleteIcon} onClick={() => deleteEvent(props.id)} height='20px' width='20px' style={{paddingLeft: '4px', cursor: 'pointer'}}/>
            <br />
        </>
    );
}
export default EventCard;