import React from 'react';
import axios from 'axios';

// 2/5

let apiEndpoint = 'http://127.0.0.1:8000/';

export async function registerUser(user){
    try {
        const response = await axios.post(apiEndpoint + 'signup', user);
        if (response.status ===201){
            console.log('User has been registered');
            return response.data;
        }
    }
    catch(ex){
        console.log('Error', ex);
        throw ex;
    }
}

export async function loginUser(user){
    try {
        const response = await axios.post(apiEndpoint + 'signin', user);
        console.log('User has been logged in');
        localStorage.setItem('token', response.token);
        return response.data
    }
    catch(ex){
        console.log("Error", ex);
        throw ex;
    }
}

export async function getCurrentUser(){
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

export async function getUserEvents(){
    try {
        const jwt = localStorage.getItem('token');
        const response = await axios.get(apiEndpoint + 'events', {headers: {Authorization: 'Bearer ' + jwt}});
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

export async function getUserSummarys(){
    try {
        const jwt = localStorage.getItem('token');
        const response = await axios.get(apiEndpoint + 'summarys', {headers: {Authorization: 'Bearer ' + jwt}});
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
