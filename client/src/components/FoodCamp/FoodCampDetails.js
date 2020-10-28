import React from 'react';
import Auth from "../../utils/auth";

import {useDispatch} from "react-redux";
import {SAVE_FOOD_CAMP} from "../../utils/actions";

import {MUTATION_SAVE_FOOD_CAMP} from "../../utils/mutations";

import {useMutation} from "@apollo/client";
import {indexDBPromise} from "../../utils/helpers";

const FoodCampDetails = ({foodCamp}) => {
    const dispatch = useDispatch();
    const [save, {error}] = useMutation(MUTATION_SAVE_FOOD_CAMP);
    
    const saveFoodCamp = async (data, elem) => {
        try {
            // delete data.website
            const res = await save({
                variables: {
                    foodCamp: data
                }
            });
            dispatch({
                type: SAVE_FOOD_CAMP,
                foodCamp: {...data}
            });
            await indexDBPromise('food-camps', 'put', {...data});
            elem.textContent = "Saved"
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <>
            <li>
                <div className="inner-column">
                    <p className="agency">
                        <span className="name">Agency:</span>
                        <span className="value"> {foodCamp.agency}</span>
                    </p>
                    <p className="operational_status">
                        <span className="name">Status:</span>
                        <span className="value"> {foodCamp.operational_status}</span>
                    </p>
                    <p className="operational_notes justify">
                        <span className="name">Note:</span>
                        <span className="Value"> {foodCamp.operational_notes}</span>
                    </p>
                    <p className="who_they_serve">
                        <span className="name">They Serve:</span>
                        <span className="value"> {foodCamp.who_they_serve}</span>
                    </p>
                    <p className="address">
                        <span className="name">Address:</span>
                        <span className="value"> {foodCamp.address}</span>
                    </p>
                    <p className="phone_number">
                        <span className="name">Phone:</span>
                        <span className="value"> {foodCamp.phone_number}</span>
                    </p>
                    <p className="website">
                        <span className="name">Website:</span>
                        <span className="value"> <a href={foodCamp?.website?.url}>Click here</a></span>
                    </p>
                    <div className="btn-sec">
                        <button
                            onClick={(e) => saveFoodCamp(foodCamp, e.target)}
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

export default FoodCampDetails;