import { useState, useEffect } from "react";
import "./App.css";
import Clock from "./Components/Clock/Clock";
import HourlyCard from "./Components/HourlyCard/HourlyCard";
import TodayCard from "./Components/TodayCard/TodayCard.jsx";
import { WeekCard } from "./Components/WeekCard/WeekCard.jsx";

import { images } from "./images";
function App() {
    const [data, setData] = useState(null);
    const [indoorData, setIndoorData] = useState(null);

    //fetch data from weather api
    const fetchData = async () => {
        const url = "/api/outdoor";
        const response = await fetch(url);
        const result = await response.json();
        setData(result.data);
    };

    const fetchIndoorData = async () => {
        const url = "/api/indoor";
        const response = await fetch(url);
        const result = await response.json();

        setIndoorData(result.data);
    };

    //fetch data on initial page load
    useEffect(() => {
        fetchIndoorData();
        fetchData();
    }, []);

    //fetch outdoor api data once every 5 minutes
    useEffect(() => {
        //call api every 5 minutes
        const intervalId = setInterval(fetchData, 5 * 60 * 1000);
        //clean up timer
        return () => {
            clearInterval(intervalId);
        };
    }, [data]);

    //fetch indoor api data once every 1 minute
    useEffect(() => {
        //call api every 1 minute
        const intervalId = setInterval(fetchIndoorData, 60 * 1000);
        //clean up timer
        return () => {
            clearInterval(intervalId);
        };
    }, [indoorData]);

    return (
        <div className="App">
            {data ? (
                <div className="test2">
                    <div className="clock-container">
                        <Clock />

                        <div className="room">
                            <p>{Math.round(indoorData.temperature)}°</p>
                            <p>{Math.round(indoorData.humidity)}%</p>
                        </div>
                    </div>

                    <div className="today-week-container">
                        <div className="card today-card">
                            <TodayCard data={data} images={images} />
                        </div>

                        <div className="card week-card">
                            <WeekCard data={data} images={images} />
                        </div>
                    </div>

                    <div className="card hourly-container">
                        <HourlyCard data={data} images={images} />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
