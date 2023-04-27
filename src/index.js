import './css/styles.css';
import { fetchCountryInfo } from './fetchCountryInfo';
import { renderCountryList, renderCountryInfo } from './markupCountries';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';

const DEBOUNCE_DELAY = 1300;

const searchInput = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

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
