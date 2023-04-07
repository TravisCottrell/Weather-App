import React from "react";
import "./TodayCard.css";

const TodayCard = ({ data, images }) => {
    return (
        <div>
            <h2>Today</h2>
            <div className="current-temp">
                <img src={images[`_${data.current.weather[0].icon}`]} />

                <p>{Math.round(data.current.temp)}°</p>
                <p className="feels-like">
                    Feels like {Math.round(data.current.feels_like)}°
                </p>
            </div>
            <div className="other-info">
                <div>
                    <p>rain</p>
                    <p>{Math.round(data.daily[0].pop)}%</p>
                </div>
                <div>
                    <p>humidity</p>
                    <p>{Math.round(data.current.humidity)}%</p>
                </div>
                <div>
                    <p>wind</p>
                    <p>{Math.round(data.current.wind_speed)} mph</p>
                </div>
            </div>
        </div>
    );
};

export default TodayCard;
