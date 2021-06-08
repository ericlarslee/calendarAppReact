import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getUserProfile, decodeJWT, getDate } from '../components/Services/services';




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
    const [decodedJwt, setDecodedJwt] = useState();
    const [calendar, setCalendar] = useState([]);
    const [date, setDate] = useState();
    // useEffect(() => {
    //     async function getUser(){
    //         const tempUser = await getUserProfile();
    //         setUser(tempUser.data);
    //     }
    //     getUser();
    //     let tempDecodedJwt = decodeJWT();
    //     setDecodedJwt(tempDecodedJwt);
    //     let tempDate = getDate();
    //     setDate(tempDate);
    //     console.log('user:', user, 'jwt:', jwt, 'decodedJWT:', decodedJwt, 'date:', date);
    // });

    useEffect(() => {
        async function getUser(){
            const tempUser = await getUserProfile();
            setUser(tempUser.data[0]);
        }
        getUser();
    },[]);
    
    useEffect(() => {
        let tempDecodedJwt = decodeJWT();
        setDecodedJwt(tempDecodedJwt);
    },[]);

    useEffect(() => {
        let tempDate = getDate();
        setDate(tempDate);
    },[]);

    console.log('user:', user, 'jwt:', jwt, 'decodedJWT:', decodedJwt, 'date:', date);

    // console.log(user.data);
// [user], [jwt], [decodedJwt]
    return(
        <p>
            Hello
        </p>
    );
}
export default Home;