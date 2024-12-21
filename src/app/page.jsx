'use client'
import { useState } from "react";
import { FaCloudMoon } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoMdClock } from "react-icons/io";
import { FaCloud } from "react-icons/fa";



const Weatherapp =()=>{
    const [city, setCity]=useState("");
    const [weatherData, setWeatherData]=useState('');
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(false);
    const [dateTime, setDateTime]=useState('');
    const [hovered, setHovered]=useState(false);



    const handleWeather = async () => {
        setError(null);
        // starts loading
        setLoading(true);  
        

        // set city error
        if (!city){

            // loading stops 
            setLoading(false);
            setError('City is required');
            return;
        }


        try {
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

            if (!response.ok) {
                throw new Error ('City not found');
            }

            // receiving weather data from api
            const data = await response.json();

            // set weather data
            setWeatherData(data);

            // set date & time
            setDateTime(new Date().toLocaleString())

        }
        
        
        
        catch (error) {
            setError(error.message)  
        }

        finally {
            setLoading(false);
        }

        
    };
    // <FaCloudSun />
    // <FaCloudMoon />

    return(
        <section className="flex flex-col items-center  p-[1rem]">
            <h1 className="flex items-center gap-3 text-3xl font-extrabold">Real-time Weather App <span 
             onMouseEnter={()=>setHovered(true)}
             onMouseLeave={()=>setHovered(false)}
            className="heartbeat text-6xl icon cursor-pointer">
            {hovered? <FaCloudSun /> :  <FaCloudMoon /> }
            </span></h1>

            {/* displayed error message */}

            {error && 

                <div className="text-red-800 text-2xl">{error}</div>
            }


            <div className="mt-8 flex gap-6">
                <input 
                type='text'
                placeholder="Enter city name"
                className=" border w-full outline-none text-black px-3 py-1 rounded-b-lg ring-cyan-500 ring"
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                />
                <button onClick={handleWeather} disabled={loading}>{loading ? 'Loading...': 'search'}</button>
            </div>

            {
                weatherData && !loading &&
                <div className="flex flex-col items-center gap-8">
                    <div className="">
                        <h2 className="text-4xl mt-10 font-bold flex items-center gap-2"><span className="text-xl text-red-500"><ImLocation />
                        </span>{weatherData.name}</h2>
                        <p className="text-sm flex items-center gap-2"><span><IoMdClock /></span> {dateTime}</p>
                    </div>

                    <div className="">
                        <p className="md:text-[4rem] text-[3rem] font-extrabold text-shadow-pop-br">{weatherData.main.temp} <sup>o</sup>C</p>
                    </div>

                    <div className="">
                        <p className="flex items-center gap-2 text-2xl">{weatherData.weather[0].description}<FaCloud /></p>
                    </div>

                    <div>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    </div>

                  
                </div>
            }






            






        </section>
    )
};

export default Weatherapp;