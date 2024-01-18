import React, {useState, useEffect} from 'react'
import apiKey from '../../helpers/apiKey';
import airQuality from '../../helpers/airQuality';
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

function Current({onCitySubmit, city}) {
  const [citiesData, setCitiesData] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleCityClick = (clickedCity) => {
    onCitySubmit(clickedCity);
  };

  // Input Cities Api Call
  useEffect(() => {
    if (city !== "") {
      setLoading(true);
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&hour=0&aqi=yes`
      )
        .then((response) => response.json())
        .then((response) => {
          setWeather(response);
          setLoading(false);
          console.log(response);
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
          body: JSON.stringify({ locations: defaultCities }),
        });

        if (response.ok) {
          const objectData = await response.json();
          setCitiesData(objectData.bulk);
          setLoading(false);
          console.log(objectData.bulk);
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
  }, [defaultCities]);

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
        </div>
      </>
    );
  }
}

export default Current