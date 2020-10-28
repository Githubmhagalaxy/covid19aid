import React from 'react';
import Auth from "../../utils/auth";

import {useDispatch} from "react-redux";
import {SAVE_HOSPITAL} from "../../utils/actions";

import {MUTATION_SAVE_HOSPITAL} from "../../utils/mutations";
import {useMutation} from "@apollo/client";
import {indexDBPromise} from "../../utils/helpers";

const HospitalDetails = ({hospital}) => {
    const dispatch = useDispatch();
    const [save] = useMutation(MUTATION_SAVE_HOSPITAL);
    const saveHospital = async (data, elem) => {
        console.log(data);
        try {
            const res = await save({
                variables: { hospital: data }
            });
            dispatch({
                type: SAVE_HOSPITAL,
                hospital: data
            });
            await indexDBPromise('hospitals', 'put', {...data});
            elem.textContent = "Saved"
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <li>
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
                    <div className="btn-sec">
                        <button
                            onClick={(e) => saveHospital(hospital, e.target)}
                            className={Auth.loggedIn() ? "" : "disabled"}
                            disabled={!Auth.loggedIn()}
                            title={Auth.loggedIn() ? "" : "Login to Save"}>
                            Save
                        </button>
                    </div>
    
                </div>
            </li>
        </>
    );
};

export default HospitalDetails;