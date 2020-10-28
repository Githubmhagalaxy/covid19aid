import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className="home">
                <div className="container">
                    <h1 className="title">Covid Helper</h1>
                    <p>This application is an assistant for tracking COVID19 and get Food Camps or near hospitals, Hope this would help you...</p>
                    <div className="btn-sec">
                        <Link to="/Statistics">Get Started</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;