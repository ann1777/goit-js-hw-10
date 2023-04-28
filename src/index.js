import './css/styles.css';
import { fetchCountryInfo } from './fetchCountryInfo';
import { renderCountryList, renderCountryInfo } from './markupCountries';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';

const DEBOUNCE_DELAY = 1300;

const searchInput = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const countryListItem = document.querySelector('.country-list_name');

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));
countryList.addEventListener('click', addCountriInfo);

function onSearchInput(event) {
    event.preventDefault();

    const countryName = searchInput.value.trim();
    if(!searchInput.value) {
        clearPageHtml();
        return;
    }

    fetchCountryInfo(countryName)
        .then(countries => {
            clearPageHtml();

            if (countries.length > 10) {
                alertTooManyMatchesFound();
            } else if(countries.length >= 2 && countries.length <= 10) {
                countryList.insertAdjacentHTML("beforeend", renderCountryList(countries));
            } else {
                countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
                countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
            }
            renderCountryList(countries);
        })
        .catch(() => {
            clearPageHtml();
            alertBadCountryName();
        });
}
        
        
function clearPageHtml() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function alertBadCountryName() {
    Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatchesFound() {
    Notify.info('Too many matches found. Please enter a more specific name.');
}

function addCountriInfo({target}) {
    const contryName = target.textContent;
    console.log(contryName);

    fetchCountryInfo(contryName)
        .then(countries => {
            console.log(countries);
            for (let i = 0; i < countries.length; i++){
                console.log(contryName);
                console.log(countries[i].name);
            if(contryName === countries[i].name.official) {
                clearPageHtml();

                console.log("I am here");
                countryList.insertAdjacentHTML('beforeend', renderCountryList([countries[i]]));
                countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo([countries[i]]));
            } 
        }
    });
}