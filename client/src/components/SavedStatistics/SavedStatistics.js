import React from 'react';
import {useQuery} from "@apollo/client";
import {QUERY_SAVED_STATISTICS} from "../../utils/queries";
import Auth from "../../utils/auth";
import moment from "moment";
import loadingIcon from "../../Assets/icons/loading.svg";

const SavedStatistics = () => {
    const {data, error, loading} = useQuery(QUERY_SAVED_STATISTICS)
    if(loading) {
        return (
            <div className="loading">
                <img src={loadingIcon} alt="loading icon"/>
            </div>
        )
    }
    if (error) {
        return (
            <div className="container">
                <div className="error">Error: {error.message}</div>
            </div>
        )
    }
    return (
        <>
            {Auth.loggedIn() && (
                <section className="saved-statistics">
                    <div className="container">
                        {data.savedStatistics.length ? (
                            <ul>
                                {data.savedStatistics.map(countryStats => (
                                <li key={countryStats._id}>
                                    <div className="inner-column">
                                        <h5 className="data">{moment(Date(countryStats.Date)).format('LL')}</h5>
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
                                            {/*<div className="btn-sec">*/}
                                            {/*    <button*/}
                                            {/*        onClick={(e) => saveStatistic(countryStats, e.target)}*/}
                                            {/*        className={Auth.loggedIn() ? "" : "disabled"}*/}
                                            {/*        disabled={!Auth.loggedIn()}*/}
                                            {/*        title={Auth.loggedIn() ? "" : "Login to Save"}>*/}
                                            {/*        Save*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}
                                        </ul>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="no-item">
                                <p>There is No Saved statistic</p>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default SavedStatistics;