import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import ListIngredients from "./ListIngredients";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import FormIngredient from "./FormIngredient";
import Plat from "./Plat";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>

                <Route path='/listIngredients'><ListIngredients/></Route>
                <Route path='/ingredient/:pathParam?'><FormIngredient/></Route>
                <Route path='/plat'><Plat/></Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
