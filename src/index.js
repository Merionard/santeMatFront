import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import ListIngredients from "./ListIngredients";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch} from "react-router";
import FormIngredient from "./FormIngredient";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path='/listIngredients' component={ListIngredients}/>

                <Route path='/ingredient/:pathParam?' component={FormIngredient}/>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
