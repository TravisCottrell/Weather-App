import React from "react";
import "./WeekCard.css";

export const WeekCard = ({ data, images }) => {
    const getWeekDay = (dt) => {
        const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const date = new Date(dt * 1000);
        return weekdays[date.getDay()];
    };
    return (
        <div>
            {data.daily
                .slice(1, 5)
                .map(({ dt, temp, pop, humidity, weather }, index) => (
                    <div className="day" key={index}>
                        <div>
                            <h4>{getWeekDay(dt)}</h4>
                        </div>
                        <div className="info">
                            <p>{Math.round(pop * 100)}%</p>
                            <img src={images[`_${weather[0].icon}`]} />
                            <p>{Math.round(temp.max)}°</p>
                            <p>{Math.round(temp.min)}°</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};
