/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';

// eslint-disable-next-line import/prefer-default-export
export function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Route exact path="/signup">
                <p>THIS IS THE SIGNUP PAGE</p>
            </Route>
            <Route exact path="/login">
                <p>THIS IS THE LOGIN PAGE</p>
            </Route>
            <Route exact path="/history">
                <p>THIS IS THE HISTORY PAGE</p>
            </Route>
            <Route>
                <p>404 - Page not found :(</p>
            </Route>
        </Switch>
    );
}
