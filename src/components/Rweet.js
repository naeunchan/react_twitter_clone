import { dbService } from "myBase";
import React, { useState } from "react";

const Rweet = ({ rweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newRweet, setNewRweet] = useState(rweetObj.text);

    const handleClickedDeleteButton = async () => {
        const ok = window.confirm("Are you sure you wanna delete this rweet?");

        if (ok) {
            await dbService.doc(`rweets/${rweetObj.id}`).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const handleChange = (event) => {
        const { value } = event.target;

        setNewRweet(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`rweets/${rweetObj.id}`).update({
            text: newRweet,
        });
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your reweet"
                            value={newRweet}
                            onChange={handleChange}
                            required
                        />
                        <input type="submit" value="Update Rweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{rweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={handleClickedDeleteButton}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Rweet;