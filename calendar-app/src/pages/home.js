import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getUserProfile, decodeJWT, getDate, getAllUserEvents, getAllUserSummarys } from '../components/Services/services';
import SummaryCard from '../components/cards/summaryCard';
import ShowSummaryCard from '../components/cards/showSummaryCard.js';
import EventCard from '../components/cards/eventCard.js';
import ListEventCards from '../components/cards/listEventCards.js';




const Home = () => {
    // const [user, setUser] = useState([]);
    // const [jwt, setJwt] = useState();
    // const [decodedJwt, setDecodedJwt] = useState();
    // var userProfile = getUserProfile();
    // setUser(userProfile);
    // setJwt(localStorage.getItem('token'));
    // setDecodedJwt(decodeJWT());    
    //     console.log('user:', user, 'jwt:', jwt, 'decodedJWT:', decodedJwt, 'profile:', userProfile);
    //     return (
    //         <div>
    //             Hello
    //         </div>
    // )
    const [user, setUser] = useState([]);
    const [jwt, setJwt] = useState(localStorage.getItem('token'));
    const [decodedJwt, setDecodedJwt] = useState([]);
    const [date, setDate] = useState();
    const [events, setEvents] = useState([]);
    const [summarys, setSummarys] = useState([]);

    useEffect(() => {
        getUserProfile().then(response => {
            setUser(response.data[0]);
        }).catch(error => {
            console.log(error)
        });
        // if(user === undefined || user === null){
        //     Redirect
        // }
        let tempDecodedJwt = decodeJWT();
        setDecodedJwt(tempDecodedJwt);
        let tempDate = getDate();
        setDate(tempDate);
        console.log('user:', user, 'jwt:', jwt, 'decodedJWT:', decodedJwt, 'date:', date);
    }, []);

    useEffect(() => {
        console.log(decodedJwt);
        getAllUserEvents().then(response => {
            setEvents(response.data);
            console.log(events);
        }).catch(error => {
            console.log(error)
        });
        getAllUserSummarys().then(response => {
            setSummarys(response.data);
            console.log(summarys);
        }).catch(error => {
            console.log(error)
        });
    }, [user]);

    function mapEvents(events){
        return events.map(event =>
            <EventCard
            key={event.id}
            body={event.body}
            />
        );
    }

    function mapSummary(summary){
        return summary.map(summary =>
            <SummaryCard
            key={summary.id}
            body={summary.body}
            />
        );
    }

    return(
        <div>
            <ListEventCards mapEvents={() => mapEvents(events)}
            date={date}
            name={user.first_name}
            />
            {/* <ShowSummaryCard mapSummary={() => mapSummary(summarys[0])} /> */}
        </div>
    );
}
export default Home;