/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { React, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TitleBar } from './TitleBar';
import App from './App';
import History from './History';

// eslint-disable-next-line import/prefer-default-export
export function Router() {
    // FOR TESTING, SIGN IN AS username='admin' with userAuthentication='abcdefg'
    const [userAuthentication, setUserAuth] = useState(null);
    const [isLoggedIn, setUserLoginStatus] = useState(false);
    const [username, setUsername] = useState(null);

    return (
        <BrowserRouter>
            <div className="App">
                <TitleBar isLoggedIn={isLoggedIn} username={username} />
                <Switch>
                    <Route exact path="/">
                        <App
                            userAuthentication={userAuthentication}
                            isLoggedIn={isLoggedIn}
                            username={username}
                        />
                    </Route>
                    <Route exact path="/signup">
                        <p>THIS IS THE SIGNUP PAGE</p>
                    </Route>
                    <Route exact path="/login">
                        <p>THIS IS THE LOGIN PAGE</p>
                    </Route>
                    <Route exact path="/history">
                        <History/>
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
