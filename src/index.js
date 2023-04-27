import './css/styles.css';
import { fetchCountryInfo } from './fetchCountryInfo';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#input#search-box')
const countryList = document.querySelector('country-list')
const countryInfo = document.querySelector('country-info')

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(event) {
    event.preventDefault();

    const countryName = searchInput.value.trim();
    if(countryName === "") {
        clearPageHtml();
        return;
    }

    fetchCountryInfo(countryName)
        .then(countries => {
            clearPage();
            if (countries.length > 10) {
                alertTooManyMatchesFound();
            } else if(countries.length >= 2 && countries.length <= 10) {
                countryList.insertAdjacentHTML("beforeend", renderCountryList(countries));
            } else {
                countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
                countryInfo.insertAdjacentHTML('beforeend', renderCountryList(countries));
            }
        })
        .catch(() => alertBadCountryName())
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
