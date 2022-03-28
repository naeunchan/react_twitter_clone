import { authService } from "myBase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const handleLogOutClick = () => {
        authService.signOut();
        history.push("/);");
    };

    const handleChange = (e) => {
        const { value } = e.target;

        setNewDisplayName(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });

            refreshUser();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your new name!" onChange={handleChange} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={handleLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;
