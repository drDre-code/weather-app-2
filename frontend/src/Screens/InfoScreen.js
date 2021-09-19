import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function InfoScreen(props) {
    const history = useHistory();
    const [info, setInfo] = useState({});
    const [error, setError] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const geolocation = props.location.state.state;
    const fetchHandler = () => {

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const { longitude, latitude, country, city } = geolocation;
            setCity(city);
            setCountry(country);
            axios.get(`${backendUrl}/?longitude=${longitude}&latitude=${latitude}`)
                .then(response => {
                    const { data } = response;
                    setInfo(data);
                    setLoading(true);
                })
                .catch(err => {
                    setLoading(true);
                    setError(err.response);
                });
        } catch (err) {
            history.push('/');
        }
    };

    return (
        <div>
            {loading && (
                <div className="weather">
                    <Link to='/' >
                        <div className="cancel-icon">
                            <i className="fa fa-times"></i>
                        </div>
                    </Link>
                    <div>
                        {error && (
                            <div className="danger">
                                {error.errorMessage}
                            </div>
                        )}
                        <div><h1>{info.description}</h1></div>
                        <div>
                            <img src={`https://openweathermap.org/img/wn/${info.icon}@4x.png`} className="weather-icon" alt="Weather icon" />
                        </div>
                        <div>{city && <span>{city},</span>} {country}</div>
                    </div>
                    <div className="weather-info">{info.info}</div>
                </div>
            )}
        </div>
    );
}
