import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Country, City } from 'country-state-city';


export default function HomeScreen() {
    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [country, setCountry] = useState('');
    const [countryID, setCountryID] = useState('');
    const [city, setCity] = useState('');
    const [check, setCheck] = useState(true);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const history = useHistory();
    const countryList = Country.getAllCountries();
    
    const defaultCityList = City.getCitiesOfCountry('GB')

    const geoInfo = (lon, lat) => {
        setLongitude(lon);
        setLatitude(lat);
    };

    const countryFilter = (e) => {
        e.preventDefault();
        setCheck(true);
        const input = e.target.value;
        setCountry(input);
        const response = inputFilter(input, countryList);
        const box = document.querySelector('#country-list');
        box.style.display = response.style;
        setCountryData(response.data);
    };
    const cityFilter = (e) => {
        e.preventDefault();
        const input = e.target.value;
        setCity(input);
        const cityList = City.getCitiesOfCountry(countryID);
        const response = inputFilter(input, cityList);
        setCityData(response.data);
        const box = document.querySelector('#city-list');
        box.style.display = response.style;
    };
    const inputFilter = (entry, data) => {
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(entry.toLowerCase());
        });

        if (entry === "") {
            return { data: [], style: 'none' };
        } else {
            return { data: newFilter, style: 'block' };
        }

    };
    const hideStyle = (id) => {
        document.querySelector(id).style.display = 'none';
    };
    const checkCity = (id) => {
        const cityList = City.getCitiesOfCountry(id);
        if (cityList.length === 0) {
            setCheck(false);
            history.push('/info', { state: { longitude, latitude, country } });
        } else { setCheck(true); }
    };

    return (
        <div>
            <form className="form">
                <div>
                    <label htmlFor="country">Cities in The Uk:</label>
                    <div className="default-list">
                    {defaultCityList.map((value, key) => {
                                return <div className="data-list" key={key} onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/info', { state: { country: 'United Kingdom', city: value.name, longitude: value.longitude, latitude: value.latitude } });
                                }}>
                                    {value.name}
                                </div>;
                            })}
                    </div>
                </div>
                <div>
                    <label htmlFor="country">Select Country:</label>
                    <div className="search">
                        <div className="search-input">
                            <input type="text" placeholder="Enter Country Name..." value={country} onChange={countryFilter} />
                            <div className="search-icon">
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                        <div className="data-result" id="country-list">
                            {countryData.map((value, key) => {
                                return <div className="data" key={key} onClick={(e) => {
                                    e.preventDefault();
                                    setCountry(value.name);
                                    setCountryID(value.isoCode);
                                    setCity('');
                                    hideStyle('#country-list');
                                    checkCity(value.isoCode);
                                    geoInfo(value.longitude, value.latitude);
                                }}>
                                    {value.name}
                                </div>;
                            })}
                        </div>
                    </div>
                </div>
                {check && (
                    <div>
                        <label htmlFor="country">Select City:</label>
                        <div className="search-input">
                            <input type="text" placeholder="Enter State Name..." value={city} onChange={cityFilter} />
                            <div className="search-icon">
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                        <div className="data-result" id="city-list">
                            {cityData.map((value, key) => {
                                return <div className="data" key={key} onClick={(e) => {
                                    e.preventDefault();
                                    setCity(value.name);
                                    hideStyle('#city-list');
                                    history.push('/info', { state: { country, city: value.name, longitude: value.longitude, latitude: value.latitude } });
                                }}>
                                    {value.name}
                                </div>;
                            })}
                        </div>
                    </div>
                )}

            </form>
        </div>
    );
}
