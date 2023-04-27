"use strict"
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = 'name,capital,population,flags,languages';

export function fetchCountryInfo (name) {
    return fetch(`${BASE_URL}${name}?fields=${searchParams}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status)
        }
        return response.json();
    })
    .catch(error => {
        console.log(error)
    })
}    