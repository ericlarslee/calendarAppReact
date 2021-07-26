import { React, useState, useEffect } from 'react';
import { getUserProfile, getAllUserEvents, getAllUserSummarys, getWeather, logoutUser, decodeJWT, postEvent, postSummary, deleteEvent, getCat, getDog, getIrohQuote } from '../components/Services/services';
import SummaryCard from '../components/cards/summaryCard';
import ShowSummaryCard from '../components/cards/showSummaryCard.js';
import EventCard from '../components/cards/eventCard.js';
import ListEventCards from '../components/cards/listEventCards.js';
import useForm from '../components/formFiles/useForm';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Home = (props) => {
    const [user, setUser] = useState([]);
    const [jwt, setJwt] = useState(localStorage.getItem('token'));
    const [cat, setCat] = useState();
    const [dog, setDog] = useState();
    const [quote, setQuote] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const [weatherData, setWeatherData] = useState([]);
    const [weatherImage, setWeatherImage] = useState("");
    const [dataDate, setDataDate] = useState();
    const [userDate, setUserDate]= useState();
    const [events, setEvents] = useState([]);
    const [summarys, setSummarys] = useState([]);
    const [dateForm, setDateForm] = useForm({date: ''});
    const [showFutureEventForm, setShowFutureEventForm] = useState(false);
    const [futureEventForm, setFutureEventForm] = useForm({name: '', description:'', date: '', user: '', })
    const [showEventForm, setShowEventForm] = useState(false);
    const [eventForm, setEventForm] = useForm({name: '', description:'', date: '', user: '', })
    const [showSummaryForm, setShowSummaryForm] = useState(false);
    const [summaryForm, setSummaryForm] = useForm({user: '', date: '', body: ''})
    const [showButton, setShowButton] = useState(true);

    const FutureEventFormAction = () => {
        setShowSummaryForm(false);
        setShowEventForm(false);
        setShowFutureEventForm(true);
        setShowButton(false);
    }

    const SummaryFormAction = () => {
        setShowSummaryForm(true);
        setShowEventForm(false);
        setShowFutureEventForm(false);
        setShowButton(false);
    }

    const EventFormAction = () => {
        setShowEventForm(true);
        setShowSummaryForm(false);
        setShowFutureEventForm(false);
        setShowButton(false);
    }

    const CloseForm = () => {
        setShowSummaryForm(false);
        setShowEventForm(false);
        setShowFutureEventForm(false);
        setShowButton(true);
    }

    useEffect(async() => {
        if(jwt===null || jwt===undefined){
            return window.location="/login";
        }
        let decodedJWT = await decodeJWT();
        eventForm.user = (decodedJWT.user_id -2);
        summaryForm.user = (decodedJWT.user_id -2);
        futureEventForm.user = (decodedJWT.user_id-2);
        let userData = await getUserProfile();
        setUser(userData.data[0]);
        let today = new Date().toISOString().substring(0,10);
        let today2 = new Date().toDateString().substring(0,10);
        setDataDate(today);
        eventForm.date = today;
        summaryForm.date = today;
        dateForm.date = today;
        setUserDate(today2);
        let catData = await getCat();
        setCat(catData);
        let dogData = await getDog();
        setDog(dogData);
        let quoteData = await getIrohQuote();
        setQuote(quoteData);
    }, []);
    
    useEffect(async() =>{
        let weatherResponse = await getWeather(56601);
            setWeatherData(weatherResponse.current);
            setWeatherImage(weatherResponse.current.condition.icon);  
    },[user])
    
    useEffect(async() => {
        async function fetchEventData() {
            let eventResponse = await getAllUserEvents();
            if (eventResponse.status===400){
                return;
            }else{
            return eventResponse.data}
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
    
    // useEffect(() => {
    //     console.log('user:', user, 'jwt:', jwt, 'datadate:', dataDate, 'userdate:', userDate, 'events:', events, 'summarys:', summarys, 'weatherData:', weatherData, 'selectedDate:', dateForm.date, 'event form:', eventForm, 'summary form:', summaryForm, 'future event form:', futureEventForm);
    // },[user, jwt, dataDate, userDate, events, summarys, weatherData, dateForm, futureEventForm])


    function mapEvents(events){
        if(events === undefined){
            return
        }else{
            let tempEvents = events.filter(event => event.date.includes(dateForm.date));
            return tempEvents.map((event) =>
                <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                description={event.description}
                deleteEvent={deleteEvent}
                />
            );
        }
    }

    function mapSummary(summarys){
        if(summarys === undefined){
            return
        }else{
            let tempSummarys = summarys.filter(summary => summary.date.includes(dateForm.date));
            return tempSummarys.map((summary) =>
                <SummaryCard
                key={summary.id}
                id={summary.id}
                body={summary.body}
                />
            );
        }
    }

    async function setCatTheme(){
        localStorage.setItem("theme", "cat");
        setTheme("cat");
    }

    async function setDogTheme(){
        localStorage.setItem("theme", "dog");
        setTheme("dog");
    }

    async function setIrohTheme(){
        localStorage.setItem("theme", "iroh");
        setTheme("iroh");
    }

    return(
        <Container className="justify-content-md-center">
            {/* <div style={{maxWidth:'50%', maxHeight:'10%'}}>
                {theme === "cat" && <img src={cat} style={{maxHeight: '100px'}} />}
                {theme === "dog" && <img src={dog} style={{height: '100px'}} />}
            </div> */}
            <Row>
                <Col>
                {showButton && <Button onClick={() => FutureEventFormAction()} type="submit">Add a future Event</Button>}
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button size="sm" onClick={setCatTheme} type="submit">Cat Theme</Button>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button size="sm" onClick={setDogTheme} type="submit">Dog Theme</Button>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button size="sm" onClick={setIrohTheme} type="submit">Iroh Theme</Button>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="danger" size="sm" onClick={logoutUser} type="submit">Logout</Button>
                </Col>
            </Row>
            <Row>
                {showFutureEventForm &&
                <Form style={{font: '20px Arial, sans-serif'}}>
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
                    <Button onClick={() => postEvent(futureEventForm)} >Add event</Button>
                    <Button onClick={() => CloseForm()} type="submit">Close form</Button>
                </Form>}
            </Row>
            <Row>
                <Form style={{width: '18rem', font: '20px Arial, sans-serif'}}>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Selected Date:</Form.Label><Form.Control type="date" placeholder={dataDate} name="date" value={dateForm.date} onChange={setDateForm} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Row>
            {/* <Card style={{display:"block", justifyContent: "center", textAlign: 'center', verticalAlign: 'middle', border: '1px solid black', marginTop: '5%', width: '30%', position:'relative', left:'25%'}}> */}
            <Row className="justify-content-md-center mb-3">
                <Card border="secondary" style={{ width: '18rem'}} >
                    <ListEventCards mapEvents={() => mapEvents(events)}
                    date={userDate}
                    name={user.first_name}
                    weatherData={weatherData}
                    image={weatherImage}
                    />
                    <ShowSummaryCard mapSummary={() => mapSummary(summarys)} />
                </Card>            
            </Row>
            <Row className="justify-content-md-center">
                <Col xs lg="2">
                    {showButton && <Button size="sm" onClick={() => EventFormAction()} type="submit">Add an Event</Button>}
                </Col>
                <Col xs lg="2">
                    {showButton && dateForm.date===dataDate  && <Button size="sm" onClick={() => SummaryFormAction()} type="submit">Add a Reflection</Button>}
                </Col>
            </Row>
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
                <Button onClick={() => postEvent(eventForm)} >Add event</Button><Button onClick={() => CloseForm()} type="submit">Close form</Button>
            </Form>}
            
            {showSummaryForm &&
            <Form>
                <Form.Group className="mb-3" controlId="body">
                    <Form.Label>Enter a summary</Form.Label>
                    <Form.Control type="text-area" placeholder="Write an entry here" name="body" value={summaryForm.body} onChange={setSummaryForm} />
                </Form.Group>
                <Button onClick={() => postSummary(summaryForm)} >Add summary</Button><Button onClick={() => CloseForm()} type="submit">Close form</Button>
            </Form>
            }
        {theme === "iroh" && <h2>Random quote from Uncle Iroh: <em>{quote}</em></h2>}
        </Container>
    );
}
export default Home;