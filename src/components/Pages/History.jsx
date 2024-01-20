import React, { useState, useEffect } from "react";
import apiKey from "../../helpers/apiKey";
import dateBuilder from "../../helpers/dateBuilder";
import dateFormater from "../../helpers/dateFormater";
import ForHero from "../ForHero/ForHero";
import BoxItem from "../BoxItem/BoxItem";
import sun_gif from "../../assets/gif/sun.gif";
import moon_gif from "../../assets/gif/moon.gif";

function History({ city }) {
  const [historyData, setHistoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const yesterday = new Date(new Date());
  yesterday.setDate(new Date().getDate() - 1);
  const [selectedDate, setSelectedDate] = useState(dateFormater(yesterday));
  const [searchData, setSearchData] = useState(true);

  const minDate = dateFormater(new Date(new Date()).setDate(new Date().getDate() - 300));
  const maxDate = dateFormater(yesterday); 

  // Input Cities Api Call
useEffect(() => {
  if (city !== "") {
    setLoading(true);

    try {
      fetch(
        `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${selectedDate}&hour=0`
      )
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setHistoryData(response.forecast.forecastday[0]);
          console.log(response);
        });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }
}, [city, searchData]);


  // Extract Selected Date
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  function updateSearchData() {
    setSearchData(Math.random());
  }

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
        <h4>{dateBuilder(selectedDate)}</h4>
        <div>

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
          />
          <span onClick={updateSearchData}>Enter</span>
        </div>
      </div>
      <ForHero
        temp={historyData?.day?.maxtemp_c}
        code={historyData?.day?.condition?.code}
        values={[
          { property: "Max.", value: `${historyData?.day?.maxtemp_c}°` },
          { property: "Avg.", value: `${historyData?.day?.avgtemp_c}°` },
          { property: "Min.", value: `${historyData?.day?.mintemp_c}°` },
          { property: "Humidity", value: `${historyData?.day?.avghumidity}%` },
          { property: "Visibility", value: `${historyData?.day?.avgvis_km}km` },

          { property: "Max. Wind", value: `${historyData?.day?.maxwind_kph} km/h` },
          { property: "Rain Chance", value: `${historyData?.day?.daily_chance_of_rain} %` },
          {
            property: "Snow Chance",
            value: `${historyData?.day?.daily_chance_of_snow} %`,
          },
        ]}
      />

      <div className="boxItemContainer">
        <BoxItem
          heading="Sun Timing"
          imgId={sun_gif}
          values={[
            { property: "Rise", value: historyData?.astro?.sunrise },
            { property: "Set", value: historyData?.astro?.sunset },
          ]}
        />
        <BoxItem
          heading="Moon Timing"
          imgId={moon_gif}
          values={[
            { property: "Rise", value: historyData?.astro?.moonrise },
            { property: "Set", value: historyData?.astro?.moonset },
          ]}
        />
      </div>
    </div>
  );
}

export default History;
