import React, { useState, useEffect, useContext } from "react";
import apiKey from "../../helpers/apiKey";
import airQuality from "../../helpers/airQuality";
import City from "../City/City";
import defaultCities from "../../assets/data/defaultCities";
import Hero from "../Hero/Hero";
import BoxItem from "../BoxItem/BoxItem";
import sun_gif from "../../assets/gif/sun.gif";
import air_gif from "../../assets/gif/air-quality.gif";
import moon_gif from "../../assets/gif/moon.gif";
import rain_gif from "../../assets/gif/rain.gif";
import wind_gif from "../../assets/gif/wind.gif";
import speed_gif from "../../assets/gif/speed.gif";
import CityContext from "../../context/CityContext";

function Current() {
  const { city, setCity } = useContext(CityContext);
  const [citiesData, setCitiesData] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});
  const storedCities = JSON.parse(localStorage.getItem("storedCities")) || defaultCities;

  const handleCityClick = (clickedCity) => {
    setCity(clickedCity);
  };

  // Input Cities Api Call
  useEffect(() => {
    let error = false;
    if (city !== "") {
      setLoading(true);
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&hour=0&aqi=yes`
      )
        .then((response) => response.json())
        .then((response) => {
          setWeather(response);
          setLocation(response.location);
          setLoading(false);
          if (response?.error?.code) {
            error = true;
          }
          if (error) {
            return;
          } else {
            let flag = false;
            storedCities.forEach((item) => {
              if (item.q.toLowerCase() === city.toLowerCase()) {
                flag = true;
              }
            });

            if (!flag && city.trim() !== "") {
              storedCities.pop();
              storedCities.unshift({ q: city });
              localStorage.setItem("storedCities", JSON.stringify(storedCities));
            }
          }
        });
    }
  }, [city]);

  // Bulk Cities Call
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=bulk`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locations: storedCities }),
        });

        if (response.ok) {
          const objectData = await response.json();
          setCitiesData(objectData.bulk);
          setLoading(false);
          // console.log(objectData.bulk);
        } else {
          const errorText = await response.text();
          console.log("Failed to fetch data:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Run the effect only once when defaultCities changes
    fetchData();
  }, []);

  // Cities data not yet fetched
  if (citiesData.length === 0 || loading === true) {
    return (
      <>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    );
  }

  // Input City is invalid
  if (weather?.error?.code === 1006) {
    return (
      <>
        <div className="noPage">
          <h2>Input city is not valid</h2>
          <h1>City or Place is not found</h1>
          <p>Sorry, we couldn’t find the place or city you’re looking for.</p>
        </div>
      </>
    );
  }

  // Cities data
  if (Object.keys(weather).length === 0) {
    return (
      <>
        <div className="cityPage">
          {citiesData.map((item, index) => (
            <City
              key={index}
              region={item.query.location.name}
              country={item.query.location.country}
              temp={item.query.current.temp_c}
              imgUrl={item.query.current.condition.icon}
              onClick={handleCityClick}
            />
          ))}
        </div>
      </>
    );
  } else {
    // Current / Real Time data
    return (
      <>
        <div className="mainPage">
          <Hero
            day={weather?.current.is_day}
            cityTimezone={weather?.location.tz_id}
            temp={weather?.current.temp_c}
            code={weather?.current.condition.code}
            values={[
              { property: "Visibility", value: `${weather?.current.humidity}km` },
              { property: "Feels Like", value: `${weather?.current.feelslike_c}°` },
              {
                property: "Min. Temp",
                value: `${weather?.forecast.forecastday[0].day.mintemp_c}°`,
              },
              {
                property: "Max. Temp",
                value: `${weather?.forecast.forecastday[0].day.maxtemp_c}°`,
              },
            ]}
          />

          <div className="boxItemContainer">
            <BoxItem
              heading="Air Quality"
              imgId={air_gif}
              values={[
                {
                  property: "Air",
                  value: `${airQuality(
                    weather?.forecast.forecastday[0].day.air_quality?.["us-epa-index"]
                  )} `,
                },
                {
                  property: "CO",
                  value: `${parseInt(weather?.forecast.forecastday[0].day.air_quality?.co)} μg/m3`,
                },
                {
                  property: "SO₂",
                  value: `${parseInt(weather?.forecast.forecastday[0].day.air_quality?.so2)} μg/m3`,
                },
              ]}
            />

            <BoxItem
              heading="Rain Chance"
              imgId={rain_gif}
              values={[
                {
                  property: "Rain Chance",
                  value: `${weather?.forecast.forecastday[0].day.daily_chance_of_rain}%`,
                },
                {
                  property: "Snow Chance",
                  value: `${weather?.forecast.forecastday[0].day.daily_chance_of_snow}%`,
                },
                { property: "Cloud Cover", value: `${weather?.current.cloud}%` },
              ]}
            />
            <BoxItem
              heading="Sun Timing"
              imgId={sun_gif}
              values={[
                { property: "Rise", value: weather.forecast.forecastday[0].astro.sunrise },
                { property: "Set", value: weather.forecast.forecastday[0].astro.sunset },
              ]}
            />
            <BoxItem
              heading="Moon Timing"
              imgId={moon_gif}
              values={[
                { property: "Rise", value: weather.forecast.forecastday[0].astro.moonrise },
                { property: "Set", value: weather.forecast.forecastday[0].astro.moonset },
              ]}
            />
            <BoxItem
              heading="Wind"
              imgId={wind_gif}
              values={[
                { property: "Speed", value: `${weather.current.wind_kph} km/h` },
                { property: "Direction", value: weather.current.wind_dir },
                { property: "Degree", value: `${weather.current.wind_degree}` },
              ]}
            />
            <BoxItem
              heading="Other"
              imgId={speed_gif}
              values={[
                { property: "Pressure", value: `${weather.current.pressure_in} inch` },
                { property: "UV", value: weather.current.uv },
                { property: "Humidity", value: `${weather.current.humidity}%` },
              ]}
            />
          </div>

          {/* Location World Map  */}
          <div className="locationMap">
            {`World > ${location.tz_id.substring(0, location.tz_id.indexOf("/"))} > ${
              location.country
            } > ${location.region} > ${location.name}`}
          </div>
        </div>
      </>
    );
  }
}

export default Current;
