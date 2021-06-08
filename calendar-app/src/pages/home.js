import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getUserProfile, decodeJWT, getDate, getAllUserEvents, getAllUserSummarys } from '../components/Services/services';




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
    const [calendar, setCalendar] = useState([]);
    const [date, setDate] = useState();
    const [events, setEvents] = useState([]);
    const [summarys, setSummarys] = useState([]);

    useEffect(() => {
        getUserProfile().then(response => {
            setUser(response.data);
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

    // useEffect(() => {
    //     async function get(){

    //     }
    // });

    // console.log(user.data);
// [user], [jwt], [decodedJwt]
    return(
        <p>
            Hello
        </p>
    );
}
export default Home;