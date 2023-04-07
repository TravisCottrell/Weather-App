import React, { useState } from "react";
import "./Clock.css";
const Clock = () => {
    let time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    const [currentTime, setCurrentTime] = useState(time);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        setCurrentTime(time);
    };

    setInterval(updateTime, 5000);

    return (
        <div className="clock">
            <h1>{currentTime}</h1>
        </div>
    );
};

export default Clock;
