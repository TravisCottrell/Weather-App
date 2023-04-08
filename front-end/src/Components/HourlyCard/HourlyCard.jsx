import React from "react";
import "./HourlyCard.css";

const HourlyCard = ({ data, images }) => {
    const getHour = (dt) => {
        const date = new Date(dt * 1000);
        const hour = date.getHours() + 1;
        if (hour <= 12) {
            return `${hour} am`;
        } else {
            if (hour === 24) return "12 am";
            return `${hour - 12} pm`;
        }
    };

    return (
        <div className="hourly-wrapper">
            {data.hourly
                .slice(0, 20)
                .map(({ dt, temp, weather, pop }, index) => (
                    <div className="hour" key={index}>
                        <p>{getHour(dt)}</p>
                        <img src={images[`_${data.current.weather[0].icon}`]} />
                        <p>{Math.round(temp)}°</p>
                        <p>{Math.round(pop * 100)}%</p>
                    </div>
                ))}

            {/* <div className="hour">
                <p>8 pm</p>
                <p>31°</p>
                <p>50%</p>
            </div> */}
        </div>
    );
};

export default HourlyCard;
