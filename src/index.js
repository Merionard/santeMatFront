import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';

import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Admin from "./layouts/Admin";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" component={Admin}/>
                {/*<Route path ="/releveInfos" component={ReleveInfos}/>
                <Route path ="/rapportJournalier" component={Rapport}/>*/}
                {/*               <Route path='/listIngredients'><ListIngredients/></Route>
                <Route path='/ingredient/:pathParam?'><FormIngredient/></Route>
                <Route path='/plat/:pathParam?'><Plat/></Route>
                <Route path='/listPlats'><ListPlats/></Route>
                <Route path='/dashboard'><Dashboard/></Route>*/}

            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
