/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-cycle */
import { React, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { TitleBar } from './TitleBar';
import App from './App';
import History from './History';
import { TutorialPage } from './TutorialPage';
import SignUp from './SignupPage';
import { Home } from './Home';

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
                        <Home />
                    </Route>
                    <Route exact path="/canvas">
                        <App
                            userAuthentication={userAuthentication}
                            isLoggedIn={isLoggedIn}
                            username={username}
                        />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <Route exact path="/login">
                        <Login
                            setUserAuth={setUserAuth}
                            setUserLoginStatus={setUserLoginStatus}
                            setUsername={setUsername}
                        />
                    </Route>
                    <Route exact path="/history">
                        <History />
                    </Route>
                    <Route exact path="/tutorial">
                        <TutorialPage />
                    </Route>
                    <Route>
                        <p>404 - Page not found :(</p>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
