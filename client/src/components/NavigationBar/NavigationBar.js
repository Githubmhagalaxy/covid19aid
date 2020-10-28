import React from 'react';
import {Link, NavLink} from "react-router-dom";

import Auth from "../../utils/auth";

const NavigationBar = () => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <Link to={'/'} className={'navbar-brand'}>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/*<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>*/}
                                <NavLink to={'/Statistics'} className={'nav-link'}>Statistics</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/FoodCamps'} className={'nav-link'}>Food Camps</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/Hospitals'} className={'nav-link'}>Hospitals</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/About'} className={'nav-link'}>About</NavLink>
                            </li>
                            {Auth.loggedIn() ? (
                                <>
                                    <li className="nav-item">
                                        <a href={'/'} onClick={() => Auth.logout()} className={'nav-link'}>Logout</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" to="./#" id="navbarDropdownMenuLink"
                                                 role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Saves
                                        </NavLink>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <NavLink className="dropdown-item" to="/saved-statistics">Statistics</NavLink>
                                            <NavLink className="dropdown-item" to="/saved-food-camps">FoodCamps</NavLink>
                                            <NavLink className="dropdown-item" to="/saved-hospitals">Hospitals</NavLink>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" to="./#" id="navbarDropdownMenuLink"
                                             role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className={'icon'}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user"
                                             className="svg-inline--fa fa-user fa-w-14" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path
                                            fill="currentColor"
                                            d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg>
                                    </span>
                                    </NavLink>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <NavLink className="dropdown-item" to="/signup">Sign Up</NavLink>
                                        <NavLink className="dropdown-item" to="/login">Log In</NavLink>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default NavigationBar;