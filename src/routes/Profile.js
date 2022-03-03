import { authService } from "myBase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const handleLogOutClick = () => {
        authService.signOut();
        history.push("/);");
    };

    return (
        <>
            <button onClick={handleLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;
