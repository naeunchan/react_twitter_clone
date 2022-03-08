import React, { useEffect, useState } from "react";
import { dbService, storageService } from "myBase";
import Rweet from "components/Rweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    const [rweet, setRweet] = useState("");
    const [rweets, setRweets] = useState([]);
    const [attachment, setAttachment] = useState("");

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

        let attachmentUrl = "";

        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const rweetObj = {
            text: rweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        await dbService.collection("rweets").add(rweetObj);
        setRweet("");
        setAttachment("");
    };

    const handleChange = (event) => {
        const { value } = event.target;

        setRweet(value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            const { result } = finishedEvent.currentTarget;

            setAttachment(result);
        };

        reader.readAsDataURL(file);
    };

    const handleClick = () => setAttachment("");

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
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <input type="submit" value="Rweet" />
                {attachment && (
                    <div>
                        <img src={attachment} alt="uploaded file" width="50px" height="50px" />
                        <button onClick={handleClick}>Clear</button>
                    </div>
                )}
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
