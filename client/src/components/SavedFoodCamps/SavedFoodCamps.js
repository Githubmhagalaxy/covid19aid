import React from 'react';
import {useQuery} from "@apollo/client";
import {QUERY_SAVED_FOOD_CAMPS} from "../../utils/queries";
import Auth from "../../utils/auth";
import loadingIcon from "../../Assets/icons/loading.svg";
const SavedFoodCamps = () => {
    const {data, error, loading} = useQuery(QUERY_SAVED_FOOD_CAMPS)
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
                <section className="saved-food-camps">
                    <div className="container">
                        {data.savedFoodCamps.length ? (
                            <ul className={'cart-wrapper large'}>
                                {data.savedFoodCamps.map(foodCamp => (
                                    <li key={foodCamp._id}>
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
                                                <span className="value"> <a href={foodCamp.website.url}>Click here</a></span>
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
            )}
        </>
    );
};

export default SavedFoodCamps;