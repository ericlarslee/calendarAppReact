import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import weatherKey from './weatherKey';

// 2/5

let apiEndpoint = 'http://127.0.0.1:8000/';

export async function registerUser(input){
    let user = {"email": input.email, "password": input.password, "profile":{"first_name": input.first_name, "last_name": input.last_name, "address": input.address}}
    try {
        const response = await axios.post(apiEndpoint + 'signup', user);
        if (response.status ===201){
            console.log('User has been registered', response.data);
            return window.location = '/login';
        }
    }
    catch(ex){
        alert("Invalid input has been given");
        console.log('Error', ex);
        throw ex;
    }
}

export async function loginUser(user){
    try {
        const response = await axios.post(apiEndpoint + 'signin', user);
        console.log('User has been logged in');
        localStorage.setItem('token', response.data.token);
        console.log(response.data);
        return window.location = '/';
    }
    catch(ex){
        console.log("Error", ex);
        throw ex;
    }
}

export async function getUserProfile(){
    try {
        const jwt = localStorage.getItem('token');
        const response = await axios.get(apiEndpoint + 'profile', {headers: {Authorization: 'Bearer ' + jwt}});

        if (response.status === 200){
            return response.data;
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export async function getUserEvents(userId, date){
    try {
        const jwt = localStorage.getItem('token');
        const response = await axios.get(apiEndpoint + `events/?user=${userId}&date=${date}`, {headers: {Authorization: 'Bearer ' + jwt}});

        if (response.status === 200){
            return response.data;
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export async function getAllUserEvents(){
    try {
        const jwt = localStorage.getItem('token');
        let userInfo = jwtDecode(jwt);
        let userId = userInfo.user_id;
        const response = await axios.get(apiEndpoint + `events/?user=${userId}`, {headers: {Authorization: 'Bearer ' + jwt}});

        if (response.status === 200){
            return  response;
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export async function getUserSummarys(userId, date){
    try {
        const jwt = localStorage.getItem('token');
        const response = await axios.get(apiEndpoint + `summarys/?user=${userId}&date=${date}` , {headers: {Authorization: 'Bearer ' + jwt}});

        if (response.status === 200){
            return response;
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export async function getAllUserSummarys(){
    try {
        const jwt = localStorage.getItem('token');
        let userInfo = jwtDecode(jwt);
        let userId = userInfo.user_id;
        const response = await axios.get(apiEndpoint + `summarys/?user=${userId}` , {headers: {Authorization: 'Bearer ' + jwt}});

        if (response.status === 200){
            return response;
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export async function postEvent(event){
    try{
        const jwt = localStorage.getItem('token');
        const response = await axios.post(apiEndpoint + "events/", event, {headers: {Authorization: 'Bearer ' + jwt}});
        console.log(response);

        if (response.status === 201){
            alert('The event was posted');
            window.location='/'
            return
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export async function postSummary(summary){
    try{
        const jwt = localStorage.getItem('token');
        const response = await axios.post(apiEndpoint + "summarys/", summary, {headers: {Authorization: 'Bearer ' + jwt}});
        console.log(response);

        if (response.status === 201){
            alert('The summary was posted');
            window.location='/'
            return
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export async function deleteEvent(eventId){
    try{
        const jwt = localStorage.getItem('token');
        const response = await axios.delete(apiEndpoint + `events/${eventId}/`, {headers: {Authorization: 'Bearer ' + jwt}});
        console.log(response);

        if (response.status === 204){
            alert('Event has been deleted');
            window.location='/'
            return
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export async function deleteSummary(summaryId){
    try{
        const jwt = localStorage.getItem('token');
        const response = await axios.delete(apiEndpoint + `summarys/${summaryId}/`, {headers: {Authorization: 'Bearer ' + jwt}})
        console.log(response);

        if (response.status === 204){
            alert('Summary has been deleted');
            window.location='/'
            return
        }
        return null;
    }
    catch(ex){
        console.log("Error", ex);
    }
}

export function logoutUser(){
    localStorage.removeItem('token');
    window.location = '/';
}

export async function decodeJWT(){
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt);
}

export async function getWeather(zipcode){
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${zipcode}&aqi=no`);
        if (response.status ===200){
            return response.data;
        }
        return null;
    }
    catch(ex){
        console.log('Error', ex);
    }
}

export function toRegisterPage(){
    return window.location = '/signup';
}

export function toLoginPage(){
    return window.location = '/login'
}

export async function getCat(){
    try{    
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?api_key=9de00689-97e8-48bd-84ea-4ec3affcd7a7`)
        if (response.status === 200){
            return response.data[0].url
        }
        return null;
    }
    catch(ex){
        console.log('Error', ex);
    }
}

export async function getDog(){
    try{
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        if (response.status === 200){
                return response.data.message
            }
            return null;
    }
    catch(ex){
        console.log('Error', ex);
    }
}

export async function getIrohQuote(){
    try{
        const response = await axios.get("http://api.thedragonofthe.rest/quote");
        if (response.status === 200){
            return response.data.quote
        }
        return null;
}
catch(ex){
    console.log('Error', ex);
}
}