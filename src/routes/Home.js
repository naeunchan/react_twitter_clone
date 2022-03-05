import React, { useEffect, useState } from "react";
import { dbService } from "myBase";
import Rweet from "components/Rweet";

const Home = ({ userObj }) => {
    const [rweet, setRweet] = useState("");
    const [rweets, setRweets] = useState([]);

    useEffect(() => {
        dbService.collection("rweets").onSnapshot((snapshot) => {
            const rweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setRweets(rweetArray);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await dbService.collection("rweets").add({
            text: rweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });

        setRweet("");
    };

    const handleChange = (event) => {
        const { value } = event.target;

        setRweet(value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    onChange={handleChange}
                    value={rweet}
                />
                <input type="submit" value="Rweet" />
            </form>
            <div>
                {rweets.map((rweet) => (
                    <Rweet
                        key={rweet.id}
                        rweetObj={rweet}
                        isOwner={rweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
