import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getUserProfile, getAllUserEvents, getAllUserSummarys, getWeather, logoutUser } from '../components/Services/services';
import SummaryCard from '../components/cards/summaryCard';
import ShowSummaryCard from '../components/cards/showSummaryCard.js';
import EventCard from '../components/cards/eventCard.js';
import ListEventCards from '../components/cards/listEventCards.js';
import "react-datepicker/dist/react-datepicker.css";
import useForm from '../components/formFiles/useForm';
import { Form, Button } from 'react-bootstrap';




const Home = (props) => {
    const [user, setUser] = useState([]);
    const [jwt, setJwt] = useState(localStorage.getItem('token'));
    const [weatherData, setWeatherData] = useState([]);
    const [weatherImage, setWeatherImage] = useState("");
    const [dataDate, setDataDate] = useState();
    const [userDate, setUserDate]= useState();
    const [events, setEvents] = useState([]);
    const [summarys, setSummarys] = useState([]);
    const [dateForm, setDateForm] = useForm({date: ''});

    useEffect(() => {
    },[props])

    useEffect(async() => {
        async function fetchUserData() {
            let userResponse = await getUserProfile();
            return userResponse
        }
        let userData = await fetchUserData();
        setUser(userData.data[0]);
        let today = new Date().toISOString().substring(0,10);
        let today2 = new Date().toDateString().substring(0,10);
        setDataDate(today);
        setUserDate(today2);
    }, []);
    
    useEffect(async() =>{
        let weatherResponse = await getWeather(56601);
            setWeatherData(weatherResponse.current);
            setWeatherImage(weatherResponse.current.condition.icon);  
    },[user])
    
    useEffect(async() => {
        async function fetchEventData() {
            let eventResponse = await getAllUserEvents();
            return eventResponse.data
        }
        let eventsData = await fetchEventData();
        setEvents(eventsData);
        async function fetchSummaryData() {
            let summaryResponse = await getAllUserSummarys();
            return summaryResponse.data
        }
        let summaryData = await fetchSummaryData();
        setSummarys(summaryData);
        
    }, [weatherData]);

    useEffect(() => {
        console.log('user:', user, 'jwt:', jwt, 'datadate:', dataDate, 'userdate:', userDate, 'events:', events, 'summarys:', summarys, 'weatherData:', weatherData, 'selectedDate:', dateForm.date);
    },[user, jwt, dataDate, userDate, events, summarys])


    function mapEvents(events){
        if(events === undefined){
            return
        }else{
            return events.map((event, index) =>
                <EventCard
                key={index}
                name={event.name}
                description={event.description}
                />
            );
        }
    }

    function mapSummary(summarys){
        if(summarys === undefined){
            return
        }else{
            return summarys.map((summary, index) =>
                <SummaryCard
                key={index}
                body={summary.body}
                />
            );
        }
    }

    return(
        <div>
            <Button onClick={logoutUser} type="submit">Logout</Button>
            <Form>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Selected Date:</Form.Label>
                    <Form.Control type="date" placeholder={dataDate} name="date" value={dateForm.date} onChange={setDateForm} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
            </Form>
            <ListEventCards mapEvents={() => mapEvents(events)}
            date={userDate}
            name={user.first_name}
            weatherData={weatherData}
            image={weatherImage}
            />
            <ShowSummaryCard mapSummary={() => mapSummary(summarys)} />
        </div>
    );
}
export default Home;