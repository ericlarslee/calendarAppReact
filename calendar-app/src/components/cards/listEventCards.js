import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';


const ListEventCards = (props) => {
    const [weather, setWeather]= useState([]);
    useEffect(()=> {
    setWeather(props.weatherData);
    },[props])
    // console.log('here:', weather.condition);
    if(props.weatherData===undefined){
        return
    }else{
        return (
            <Card style={{ display:"flex", justifyContent: "center", verticalAlign: 'center', }}>
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
                <ListGroup className="list-group-flush">
                    {props.mapEventCards}

                </ListGroup>
            </Card>
        );
    }
}
export default ListEventCards;