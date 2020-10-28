import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './utils/store';

import Home from "./components/Home/Home";
import Statistic from "./components/Statistic/Statistic";
import FoodCamp from "./components/FoodCamp/FoodCamp";
import Hospital from "./components/Hospital/Hospital";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFound";

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SavedStatistics from "./components/SavedStatistics/SavedStatistics";
import SavedFoodCamps from "./components/SavedFoodCamps/SavedFoodCamps";
import SavedHospitals from "./components/SavedHospitals/SavedHospitals";

import './index.css';


const httpLink = createHttpLink({
    uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <Provider store={store}>
                        <NavigationBar />
                        <Switch>
                            <Route exact path={'/'} component={Home} />
                            <Route exact path={'/login'} component={Login} />
                            <Route exact path={'/signup'} component={Signup} />
                            <Route exact path={'/Statistics'} component={Statistic} />
                            <Route exact path={'/FoodCamps'} component={FoodCamp} />
                            <Route exact path={'/Hospitals'} component={Hospital} />
                            <Route exact path={'/saved-statistics'} component={SavedStatistics} />
                            <Route exact path={'/saved-food-camps'} component={SavedFoodCamps} />
                            <Route exact path={'/saved-hospitals'} component={SavedHospitals} />
                            <Route exact path={'/About'} component={About} />
                            <Route component={NotFound} />
                        </Switch>
                    </Provider>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
