import React from 'react';
import {useQuery} from "@apollo/client";
import {QUERY_SAVED_HOSPITALS} from "../../utils/queries";
import Auth from "../../utils/auth";
import loadingIcon from "../../Assets/icons/loading.svg";

const SavedHospitals = () => {
    const {data, error, loading} = useQuery(QUERY_SAVED_HOSPITALS)
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
            {Auth.loggedIn() ? (
                <section className="saved-hospitals">
                    <div className="container">
                        {data.savedHospitals.length ? (
                            <ul className={'cart-wrapper large'}>
                                {data.savedHospitals.map(hospital => (
                                    <li key={hospital._id}>
                                        <div className="inner-column">
                                            <p className="name">
                                                <span className="name">name:</span>
                                                <span className="value"> {hospital.Name}</span>
                                            </p>
                                            <p className="address">
                                                <span className="name">address:</span>
                                                <span className="value"> {hospital.Address}</span>
                                            </p>
                                            <p className="city">
                                                <span className="name">city:</span>
                                                <span className="Value"> {hospital.City}</span>
                                            </p>
                                            <p className="state">
                                                <span className="name">state:</span>
                                                <span className="value"> {hospital.State}</span>
                                            </p>
                                            <p className="telephone">
                                                <span className="name">telephone:</span>
                                                <span className="value"> {hospital.telephone}</span>
                                            </p>
                                            <p className="website">
                                                <span className="name">website:</span>
                                                <span className="value"> {hospital.website}</span>
                                            </p>
                                            <p className="beds">
                                                <span className="name">beds:</span>
                                                <span className="value"> {hospital.beds}</span>
                                            </p>
                                            <p className="naics_desc justify">
                                                <span className="name">description:</span>
                                                <span className="value"> {hospital.naics_desc}</span>
                                            </p>
                                            <p className="helipad">
                                                <span className="name">helipad:</span>
                                                <span className="value"> {hospital.helipad}</span>
                                            </p>
                                            <p className="population">
                                                <span className="name">population:</span>
                                                <span className="value"> {hospital.population}</span>
                                            </p>
                                            <p className="county">
                                                <span className="name">county:</span>
                                                <span className="value"> {hospital.county}</span>
                                            </p>
                                            <p className="distance">
                                                <span className="name">distance:</span>
                                                <span className="value"> {Number(hospital.distance).toFixed(2)}</span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ): (
                            <div className="no-item">
                                <p>There is No Saved statistic</p>
                            </div>
                        )}
                    </div>
                </section>
            ) : ("")}
        </>
    );
};

export default SavedHospitals;