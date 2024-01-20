import React, { useEffect, useState } from "react";
import apiKey from "../../helpers/apiKey";
import ForHero from "../ForHero/ForHero";
import dateFormater from "../../helpers/dateFormater";
import dateBuilder from "../../helpers/dateBuilder";
dateFormater;
import timeBuilder from "../../helpers/timeBuilder";
function Hourly({ city }) {
  const [weather, setWeather] = useState({});
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forecastDay, setForecastDay] = useState(0);
  const [firstButton, setFirstButton] = useState("visible");
  const [lastButton, setLastButton] = useState("visible");

  const [formatedDate, setFormatedDate] = useState(dateBuilder(new Date()));


  // Input Cities Api Call
  useEffect(() => {
    if (city !== "" || city === "") {
      setLoading(true);

      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=delhi&days=14&aqi=yes`
      )
        .then((response) => response.json())
        .then((response) => {
          setWeather(response);
          setLoading(false);
        });
    }


  }, [city]);

  // Hourly data update
  useEffect(() => {
    if (weather.forecast) {
      // Update forecast day

      weather.forecast.forecastday.map((item, index) => {
        if (index === forecastDay) {
          setHourlyData(item.hour);
          // Update Display Date Value
          setFormatedDate(dateBuilder(item.date));
        }
      });
    }

    // Button Visibility Set
    if (forecastDay === 0) {
      setFirstButton("hidden");
    } else if (forecastDay === 1) {
      setFirstButton("visible");
    } else if (forecastDay === 13) {
      setLastButton("hidden");
    } else if (forecastDay === 12) {
      setLastButton("visible");
    }
  }, [weather, forecastDay]);

  // Increase Forecast Day
  const nextForecast = () => {
    setForecastDay(forecastDay + 1);
  };

  // Decrease Forecast Day
  const previousForecast = () => {
    setForecastDay(forecastDay - 1);
  };

  // Cities data not yet fetched
  if (loading === true) {
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


  return (
    <>
      <div className="mainPage">
        <div className="headingBox">
          <button onClick={previousForecast} style={{ visibility: firstButton }}>
            ❮ Previous
          </button>
          <h4>{formatedDate}</h4>
          <button onClick={nextForecast} style={{ visibility: lastButton }}>
            Next ❯
          </button>
        </div>

        {hourlyData.map((hour, index) => {
          return (
            <ForHero
              key={index}
              day={hour?.is_day}
              isHour={timeBuilder(hour?.time)}
              temp={hour?.temp_c}
              code={hour?.condition?.code}
              values={[
                { property: "Heat", value: `${hour?.heatindex_c}°` },
                { property: "Visibility", value: `${hour?.vis_km}` },
                { property: "UV", value: `${hour?.uv}` },
                { property: "Humidity", value: `${hour?.humidity}%` },
                { property: "Wind Speed", value: `${hour?.wind_kph} km/h` },
                { property: "Wind Dir.", value: `${hour?.wind_dir}` },
                { property: "Rain Chance", value: `${hour?.chance_of_rain}%` },
                { property: "Cloud Cover", value: `${hour?.cloud}%` },
              ]}
           
            />
          );
        })}
      </div>
    </>
  );
}

export default Hourly;
