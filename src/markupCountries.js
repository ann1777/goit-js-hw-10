"use strict"

export function renderCountryList(countries) {
    const countryList = countries
        .map(({ name: { official, common }, flags: { svg } }) => {
            return `
        <li class="country-list__item">
            <img class="country-list__flag" src="${svg}" alt="Flag of ${common}" width = 25px height = 25px>
            <h2 class="country-list__name">${official}</h2>
        </li>
        `
        })
        .join('');
    return countryList;
}

export function renderCountryInfo(countries) {
    const countryInfo = countries
        .map(({ flags: { svg }, name, capital, population, languages }) => {
            // languages = Object.values(languages).join(', ');
            return `
        <img src="${svg}" alt="${name}" width="320" height="auto">
        <ul class="country-info__list">
            <li class="country-info__item"><span class="country-info__item--weight">Capital:</span> ${capital}</li>
            <li class="country-info__item"><span class="country-info__item--weight">Population:</span> ${population}</li>
            <li class="country-info__item"><span class="country-info__item--weight">Languages:</span> ${Object.values(languages)}</li>
        </ul>
        `
        })
        .join('');
    return countryInfo;
}
        