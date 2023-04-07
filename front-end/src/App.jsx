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
        const url =
            "https://api.openweathermap.org/data/3.0/onecall?lat=41.161&lon=-81.071&exclude=minutely&units=imperial&appid=e4614d6b421411940839e935869622b8";
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
    };

    const fetchIndoorData = async () => {
        const url = "http://192.168.50.82:3000/temperature";
        const response = await fetch(url);

        const result = await response.json();
        console.log("this is s atre", result);
        setIndoorData(result);
    };

    //fetch data on initial page load
    useEffect(() => {
        fetchIndoorData();
        fetchData();
    }, []);

    //fetch api data once every 5 minutes
    useEffect(() => {
        //call api every 5 minutes
        fetchIndoorData();
        const intervalId = setInterval(fetchData, 5 * 60 * 1000);

        //clean up timer
        return () => {
            clearInterval(intervalId);
        };
    }, [data]);

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
