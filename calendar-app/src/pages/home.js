import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getUserProfile, getAllUserEvents, getAllUserSummarys, getWeather, logoutUser, decodeJWT } from '../components/Services/services';
import SummaryCard from '../components/cards/summaryCard';
import ShowSummaryCard from '../components/cards/showSummaryCard.js';
import EventCard from '../components/cards/eventCard.js';
import ListEventCards from '../components/cards/listEventCards.js';
import "react-datepicker/dist/react-datepicker.css";
import useForm from '../components/formFiles/useForm';
import { Form, Button, Modal } from 'react-bootstrap';


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
    const [showFutureEventForm, setShowFutureEventForm] = useState(true);
    const [futureEventForm, setFutureEventForm] = useForm({name: '', description:'', date: '', user: '', })
    const [showEventForm, setShowEventForm] = useState(false);
    const [eventForm, setEventForm] = useForm({name: '', description:'', date: '', user: '', })
    const [showSummaryForm, setShowSummaryForm] = useState(false);
    const [summaryForm, setSummaryForm] = useForm({user: '', date: '', body: ''})
    const [showCloseButton, setShowCloseButton] = useState(false);

    const SummaryFormAction = () => {
        setShowSummaryForm(true);
        setShowEventForm(false);
        setShowCloseButton(true);
    }

    const EventFormAction = () => {
        setShowEventForm(true);
        setShowSummaryForm(false);
        setShowCloseButton(true);
    }

    const CloseForm = () => {
        setShowSummaryForm(false);
        setShowEventForm(false);
    }

    useEffect(() => {
    },[props])

    useEffect(async() => {
        async function fetchUserData() {
            let userResponse = await getUserProfile();
            return userResponse
        }
        let decodedJWT = await decodeJWT();
        console.log("JWT:", decodedJWT);
        eventForm.user = decodedJWT.user_id;
        summaryForm.user = decodedJWT.user_id;
        let userData = await fetchUserData();
        setUser(userData.data[0]);
        let today = new Date().toISOString().substring(0,10);
        let today2 = new Date().toDateString().substring(0,10);
        setDataDate(today);
        eventForm.date = today;
        summaryForm.date = today;
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
        console.log('user:', user, 'jwt:', jwt, 'datadate:', dataDate, 'userdate:', userDate, 'events:', events, 'summarys:', summarys, 'weatherData:', weatherData, 'selectedDate:', dateForm.date, 'event form:', eventForm, 'summary form:', summaryForm, 'future event form:', futureEventForm);
    },[user, jwt, dataDate, userDate, events, summarys, weatherData, dateForm, futureEventForm])


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
            {showCloseButton && <Button onClick={() => CloseForm()} type="submit">Close form</Button>}
            <Button onClick={() => EventFormAction()} type="submit">Add an Event for Today</Button>
            <Button onClick={() => SummaryFormAction()} type="submit">Add a Reflection for Today</Button>
            
            {showFutureEventForm &&
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter event name" name="name" value={futureEventForm.name} onChange={setFutureEventForm} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter a description" name="description" value={futureEventForm.description} onChange={setFutureEventForm} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control type="date" name="date" value={futureEventForm.date} onChange={setFutureEventForm} />
                </Form.Group>
            </Form>}
            
            {showEventForm && 
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter event name" name="name" value={eventForm.name} onChange={setEventForm} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter a description" name="description" value={eventForm.description} onChange={setEventForm} />
                </Form.Group>
            </Form>}
            {showSummaryForm &&
            <Form>
                <Form.Group className="mb-3" controlId="body">
                    <Form.Label>Enter a summary</Form.Label>
                    <Form.Control type="text-area" placeholder="Write an entry here" name="body" value={summaryForm.body} onChange={setSummaryForm} />
                </Form.Group>
            </Form>
            }

        </div>
    );
}
export default Home;