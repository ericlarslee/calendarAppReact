import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
        console.log(response.data);

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
        console.log(response.data);

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
        console.log(userInfo);
        let userId = userInfo.user_id;
        const response = await axios.get(apiEndpoint + `events/?user=${userId}`, {headers: {Authorization: 'Bearer ' + jwt}});
        console.log(response.data);

        if (response.status === 200){
            return response.data;
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
        console.log(response.data);

        if (response.status === 200){
            return response.data;
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
        console.log(userInfo);
        let userId = userInfo.user_id;
        const response = await axios.get(apiEndpoint + `summarys/?user=${userId}` , {headers: {Authorization: 'Bearer ' + jwt}});
        console.log(response.data);

        if (response.status === 200){
            return response.data;
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

export function getDate(){
    let today = new Date();
    return today.toISOString().substring(0,10);
}