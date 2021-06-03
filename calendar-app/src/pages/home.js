import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getUserProfile } from '../components/Services/services';

export const Home = () => {
    var response = getUserProfile();
    response = Promise.resolve(response);
    console.log(response);
    if (response.status !== 200){
        <Redirect to='/login' />
    }
    return (
        <div>
            Hello
        </div>
    )
}