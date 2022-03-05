import React, { useState } from "react";
import Router from "components/Router";
import { authService } from "myBase";
import { useEffect } from "react";

const App = () => {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }

            setInit(true);
        });
    }, []);

    return { init } ? <Router isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing";
};

export default App;
