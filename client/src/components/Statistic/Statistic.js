import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useQuery} from "react-query"
import Auth from "../../utils/auth";

import {useDispatch, useSelector} from "react-redux";
import {SAVE_STATISTIC} from "../../utils/actions";

import {MUTATION_SAVE_STATISTIC} from "../../utils/mutations";
import {useMutation} from "@apollo/client";
import {indexDBPromise} from "../../utils/helpers";

import loadingIcon from "../../Assets/icons/loading.svg"

const getStatistics = async () => {
    return axios.get('https://api.covid19api.com/summary');
}

const Statistic = () => {
    const dispatch = useDispatch();
    
    const [countryStats, setCountryStats] = useState({});
    const [selectValue, setSelectValue] = useState('');
    const {isLoading, isError, data, error} = useQuery('stats', getStatistics);
    const [save] = useMutation(MUTATION_SAVE_STATISTIC);
    const handleChange = e => {
        setSelectValue(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const country = data.data.Countries.find(country => country.Slug === selectValue);
        setCountryStats({ ...country });
        setSelectValue('');
    }
    const saveStatistic = async (data, elem) => {
        const statistic = {...data};
        delete statistic.Premium;
        try {
            const res = await save({
                variables: { statistic }
            });
            dispatch({
                type: SAVE_STATISTIC,
                statistic: statistic
            });
            await indexDBPromise('statistics', 'put', {...statistic});
            elem.textContent = "Saved";
        } catch (e) {
            console.log(e);
        }
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
            <section className="statistics">
                <article className="global-statistics">
                    <div className="container">
                        <h2 className="title-2">Global Statistics</h2>
                        <div className='statistics-area'>
                            <ul className={'cart-wrapper'}>
                                <li className="total-confirmed">
                                    <h5>Total Confirmed</h5>
                                    <p>{data.data.Global.TotalConfirmed.toLocaleString()}</p>
                                </li>
                                <li className="total-deaths">
                                    <h5>Total Deaths</h5>
                                    <p>{data.data.Global.TotalDeaths.toLocaleString()}</p>
                                </li>
                                <li className="total-recovered">
                                    <h5>Total Recovered</h5>
                                    <p>{data.data.Global.TotalRecovered.toLocaleString()}</p>
                                </li>
                                <li className="new-confirmed">
                                    <h5>New Confirmed</h5>
                                    <p>{data.data.Global.NewConfirmed.toLocaleString()}</p>
                                </li>
                                <li className="new-deaths">
                                    <h5>New Deaths</h5>
                                    <p>{data.data.Global.NewDeaths.toLocaleString()}</p>
                                </li>
                                <li className="new-recovered">
                                    <h5>New Recovered:</h5>
                                    <p>{data.data.Global.NewRecovered.toLocaleString()}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article className="country-statistics">
                    <div className="container">
                        <h3 className='title-2'>Your Country</h3>
                        <div className="form-container">
                            <form method='post' onSubmit={handleSubmit}>
                                <select name="country" id="country" onChange={handleChange} value={selectValue}>
                                    <option value="">Choose Your Country</option>
                                    {data.data.Countries.map(country => (<option key={country.CountryCode} value={country.Slug}>{country.Country}</option>))}
                                </select>
                                <div className="submit-sec">
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                        {countryStats?.Country && (
                            <div id="results">
                                <div className="statistics-area">
                                    <ul className={'cart-wrapper'}>
                                        <li className="total-confirmed">
                                            <h5>Total Confirmed</h5>
                                            <p>{countryStats.TotalConfirmed.toLocaleString()}</p>
                                        </li>
                                        <li className="total-deaths">
                                            <h5>Total Deaths</h5>
                                            <p>{countryStats.TotalDeaths.toLocaleString()}</p>
                                        </li>
                                        <li className="total-recovered">
                                            <h5>Total Recovered</h5>
                                            <p>{countryStats.TotalRecovered.toLocaleString()}</p>
                                        </li>
                                        <li className="new-confirmed">
                                            <h5>New Confirmed</h5>
                                            <p>{countryStats.NewConfirmed.toLocaleString()}</p>
                                        </li>
                                        <li className="new-deaths">
                                            <h5>New Deaths</h5>
                                            <p>{countryStats.NewDeaths.toLocaleString()}</p>
                                        </li>
                                        <li className="new-recovered">
                                            <h5>New Recovered:</h5>
                                            <p>{countryStats.NewRecovered.toLocaleString()}</p>
                                        </li>
                                        <div className="btn-sec">
                                            <button
                                                onClick={(e) => saveStatistic(countryStats, e.target)}
                                                className={Auth.loggedIn() ? "" : "disabled"}
                                                disabled={!Auth.loggedIn()}
                                                title={Auth.loggedIn() ? "" : "Login to Save"}>
                                                Save
                                            </button>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </section>
        </>
    );
};

export default Statistic;