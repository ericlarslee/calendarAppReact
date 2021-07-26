import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';


const ListEventCards = (props) => {
    const [weather, setWeather]= useState([]);
    
    useEffect(()=> {
        setWeather(props.weatherData);
    },[props])
    
    if(props.weatherData===undefined){
        return
    }else{
        return (
            // <Card style={{ display:"flex", justifyContent: "center", verticalAlign: 'center', }}>
                <>
                <Card.Body>
                    <Card.Title>{props.date}</Card.Title>
                    {weather && <Card.Text>
                        Hello, {props.name}
                        <br />
                        <img src={props.image} alt="weather conditions"/>
                        <br />
                        Current Temp: {weather.temp_f} &deg;F
                        <br />
                        Feels Like: {weather.feelslike_f} &deg;F
                    </Card.Text>}
                </Card.Body>
                <Card.Body>
                    <ListGroup className="list-group-flush">
                        Events: <br />
                        {props.mapEvents()}

                    </ListGroup>
                </Card.Body>
            {/* // </Card> */}
            </>
        );
    }
}
export default ListEventCards;