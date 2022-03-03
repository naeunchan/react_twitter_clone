import React, { useState } from "react";
import { authService, firebaseInstance } from "myBase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccout] = useState(true);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let data;

            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => {
        setNewAccout((prev) => !prev);
    };

    const handleSocialClick = async (event) => {
        const { name } = event.target;
        let provider;

        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={handleChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button name="google" onClick={handleSocialClick}>
                    Continue with Google
                </button>
                <button name="github" onClick={handleSocialClick}>
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
