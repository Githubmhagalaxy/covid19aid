import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useQuery} from "react-query";
import {latLng} from "leaflet/dist/leaflet-src.esm";
import FoodCampDetails from "./FoodCampDetails";
import { v4 as uuidv4 } from 'uuid';

import {KEYS} from "../../utils/config";
import loadingIcon from "../../Assets/icons/loading.svg";

const getFoodCamps = async () => {
    return axios.get('https://data.seattle.gov/resource/kkzf-ntnu.json');
}

const countDistance = (x, y) => {
    if ((x.lat == y.lat) && (x.long == y.long)) {
        return 0;
    }
    else {
        var radLatX = Math.PI * x.lat/180;
        var radLatY = Math.PI * y.lat/180;
        var theta = x.long - y.long;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radLatX) * Math.sin(radLatY) + Math.cos(radLatX) * Math.cos(radLatY) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        return dist * 1.609344;
    }
}

const FoodCamp = () => {
    const [location, setLocation] = useState({});
    const [foodCamps, setFoodCamps] = useState([]);
    const [formState, setFormState] = useState({
        location: "",
        latitude: "",
        longitude: ""
    });
    const [showResult, setShowResult] = useState(false);
    const {isLoading, isError, data, error} = useQuery('foodCamps', getFoodCamps);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(position => {
                const {coords} = position;
                const {latitude, longitude} = coords;
                setLocation({
                    lat: latitude,
                    long: longitude
                })
            });
        }
    }, [])
    
    const handleChange = e => {
        const {name, value} = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = e => {
        e.preventDefault();
        let finalLocation = {...location};
        if(formState.location === 'custom') {
            finalLocation = {
                lat: formState.latitude,
                long: formState.longitude
            }
        }
        const tmpFoodCamps = data.data.filter(foodCamp => {
            const lat = foodCamp.latitude,
                  long = foodCamp.longitude;
            return (countDistance(finalLocation, {lat, long}) > KEYS.foodCampRadius)
        });
        setFoodCamps(tmpFoodCamps);
        setFormState({
            location: "",
            latitude: "",
            longitude: ""
        })
        setShowResult(true);
    }
    
    if (isLoading) {
        return (
            <div className="loading">
                <img src={loadingIcon} alt="loading icon"/>
            </div>
        )
    }
    if (isError) {
        return <span>Error: {error.message}</span>
    }
    return (
        <>
            <section className="food-camp-sec">
                <article className="location-form">
                    <div className="container">
                        <h2 className="title-2">Food Camps</h2>
                        <form className={'get-location-form'} method='post' onSubmit={handleSubmit}>
                            <div className="location-type">
                                <div className="default-location">
                                    <input type="radio" name="location" id="default" value="default" onChange={handleChange}/>
                                    <label htmlFor="default">use my location</label>
                                </div>
                                <div className="custom-location">
                                    <input type="radio" name="location" id="custom" value="custom" onChange={handleChange}/>
                                    <label htmlFor="custom">use custom location</label>
                                </div>
                            </div>
                            <input type="text" name="latitude" id="latitude" value={formState.latitude} onChange={handleChange} placeholder={'Latitude:'}/>
                            <input type="text" name="longitude" id="longitude" value={formState.longitude} onChange={handleChange} placeholder={'Longitude:'}/>
                            <div className="submit-sec">
                                <button type="submit">Show FoodCamps</button>
                            </div>
                        </form>
                    </div>
                </article>
                <article className="form-results">
                    <div className="container">
                        <div id="results">
                            {showResult ? (
                                foodCamps.length ? (
                                    <ul className={'cart-wrapper large'}>
                                        {foodCamps.map(foodCamp => (<FoodCampDetails key={uuidv4()} foodCamp={foodCamp} />))}
                                    </ul>
                                ) : (
                                    <p className="no-result">No Results</p>
                                )
                            ) : null}
                        </div>
                    </div>
                </article>
            </section>
        </>
    );
};

export default FoodCamp;