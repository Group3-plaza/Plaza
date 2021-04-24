/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { React, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { TitleBar } from './TitleBar';
import App from './App';

// eslint-disable-next-line import/prefer-default-export
export function Router(props) {
    const [userAuthentication, setUserAuth] = useState(null);
    const [isLoggedIn, setUserLoginStatus] = useState(false);
    const [username, setUsername] = useState('Default User');

    return (
        <BrowserRouter>
            <div className="App">
                <TitleBar isLoggedIn={isLoggedIn} username={username} />
                <Switch>
                    <Route exact path="/">
                        <App
                            userAuthentication={userAuthentication}
                            isLoggedIn={isLoggedIn}
                        />
                    </Route>
                    <Route exact path="/signup">
                        <p>THIS IS THE SIGNUP PAGE</p>
                    </Route>
                    <Route exact path="/login">
                        <Login />

                    </Route>
                    <Route exact path="/history">
                        <p>THIS IS THE HISTORY PAGE</p>
                    </Route>
                    <Route exact path="/tutorial">
                        <p>THIS IS THE TUTORIAL PAGE</p>
                    </Route>
                    <Route>
                        <p>404 - Page not found :(</p>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
