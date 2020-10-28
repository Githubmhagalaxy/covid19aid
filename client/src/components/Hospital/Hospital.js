import React, {useState} from 'react';
import axios from "axios";

import {KEYS} from "../../utils/config";
import HospitalDetails from "./HospitalDetails";
import FoodCampDetails from "../FoodCamp/FoodCampDetails";
import {v4 as uuidv4} from "uuid";


const Hospital = () => {
    const [formState, setFormState] = useState({
        state: "",
        city: ""
    });
    const [hospitals, setHospitals] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const handleChange = e => {
        const {value, name} = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const zipCodes = await axios.get(`https://service.zipapi.us/zipcode/zips?X-API-KEY=${KEYS.zipApiKey}&city=${formState.city}&state=${formState.state}`);
            if(zipCodes.data.data.length) {
                const zipCode = zipCodes.data.data[0];
                const {data} = await axios.get(`https://service.zipapi.us/hospital/radius/${zipCode}?X-API-KEY=${KEYS.zipApiKey}&radius=${KEYS.hospitalsRadius}`);
                setHospitals(data.data);
                setShowResult(true);
            } else {
                throw new Error('Could not find Any zip codes');
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <>
            <section className="hospitals">
                <article className="hospital-form">
                    <div className="container">
                        <h2 className="title-2">Hospitals</h2>
                        <form method={'post'} className="zip-form" onSubmit={handleSubmit}>
                            <input type="text" name="city" id="city" required={true} value={formState.city} onChange={handleChange} placeholder={'city'}/>
                            <select className="state" name="state" required={true} id="state" value={formState.state} onChange={handleChange}>
                                <option value="">Choose State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                            <div className="submit-sec">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </article>
                <article className="form-results">
                    <div className="container">
                        <div id="results">
                            {showResult ? (
                                hospitals.length ? (
                                    <ul className={'cart-wrapper large'}>
                                        {hospitals.map(hospital => (<HospitalDetails hospital={hospital} />))}
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

export default Hospital;