import React, { useState, useEffect } from "react";
import apiKey from "../../helpers/apiKey";
import airQuality from "../../helpers/airQuality";
import dateBuilder from "../../helpers/dateBuilder";
import ForHero from "../ForHero/ForHero";
import BoxItem from "../BoxItem/BoxItem";
import sun_gif from "../../assets/gif/sun.gif";
import moon_gif from "../../assets/gif/moon.gif";
import rain_gif from "../../assets/gif/rain.gif";
import wind_gif from "../../assets/gif/wind.gif";

function Forecast({ city }) {
  const [weather, setWeather] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [forecastDay, setForecastDay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [firstButton, setFirstButton] = useState("visible");
  const [lastButton, setLastButton] = useState("visible");
  const [dateValue, setDateValue] = useState("");

  // Input Cities Api Call
  useEffect(() => {
    if (city !== "") {
      setLoading(true);
      const currentHour = new Date().getHours();

      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14&hour=${currentHour}&aqi=yes`
      )
        .then((response) => response.json())
        .then((response) => {
          setWeather(response);
          setLoading(false);
          console.log(response);
        });
    }
  }, [city]);

  // Forecast data update
  useEffect(() => {
    if (weather.forecast) {
      // Update forecast day

      weather.forecast.forecastday.map((item, index) => {
        if (index === forecastDay) {
          setForecastData(item);
          console.log(item);
          const currentDate = new Date(item.date);
          setDateValue(dateBuilder(currentDate));
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
    <div className="mainPage">
      <div className="headingBox">
        <button onClick={previousForecast} style={{ visibility: firstButton }}>
          ❮ Previous
        </button>
        <h4>{dateValue}</h4>
        <button onClick={nextForecast} style={{ visibility: lastButton }}>
          Next ❯
        </button>
      </div>
      <ForHero
        temp={forecastData?.day?.avgtemp_c}
        code={forecastData?.day?.condition?.code}
        values={[
          { property: "Max. Temp", value: `${forecastData?.day?.maxtemp_c}°` },
          { property: "Avg. Temp", value: `${forecastData?.day?.avgtemp_c}°` },
          { property: "Min. Temp", value: `${forecastData?.day?.mintemp_c}°` },
          { property: "Humidity", value: `${forecastData?.day?.avghumidity}%` },
          { property: "Visibility", value: `${forecastData?.day?.avgvis_km}km` },

          { property: "Max. Wind", value: `${forecastData?.day?.maxwind_kph} km/h` },
          { property: "Rain Chance", value: `${forecastData?.day?.daily_chance_of_rain}%` },
          {
            property: "CO",
            value: `${parseInt(forecastData?.day?.air_quality.co)} μg`,
          },
        ]}
      />

      <div className="boxItemContainer">
        <BoxItem
          heading="Air Quality"
          imgId={wind_gif}
          values={[
            { property: "CO", value: `${parseInt(forecastData?.day?.air_quality.co)} μg/m3` },
            { property: "O₃", value: `${parseInt(forecastData?.day?.air_quality.o3)} μg/m3` },
            { property: "SO₂", value: `${parseInt(forecastData?.day?.air_quality.so2)} μg/m3` },
          ]}
        />

        <BoxItem
          heading="Rain Chance"
          imgId={rain_gif}
          values={[
            {
              property: "Rain Chance",
              value: `${forecastData?.day?.daily_chance_of_rain}%`,
            },
            {
              property: "Snow Chance",
              value: `${forecastData?.day?.daily_chance_of_snow}%`,
            },
            { property: "Total Precipitation", value: `${forecastData?.day?.totalprecip_mm}%` },
          ]}
        />

        <BoxItem
          heading="Sun Timing"
          imgId={sun_gif}
          values={[
            { property: "Rise", value: forecastData?.astro?.sunrise },
            { property: "Set", value: forecastData?.astro?.sunset },
          ]}
        />
        <BoxItem
          heading="Moon Timing"
          imgId={moon_gif}
          values={[
            { property: "Rise", value: forecastData?.astro?.moonrise },
            { property: "Set", value: forecastData?.astro?.moonset },
          ]}
        />
      </div>
    </div>
  );
}

export default Forecast;
