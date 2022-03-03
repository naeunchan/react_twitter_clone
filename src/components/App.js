import React, { useState } from "react";
import Router from "components/Router";
import { authService } from "myBase";
import { useEffect } from "react";

const App = () => {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            setInit(true);
        });
    }, []);

    return { init } ? <Router isLoggedIn={isLoggedIn} /> : "Initializing";
};

export default App;
