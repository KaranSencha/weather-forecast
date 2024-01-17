
 import cloud_icon from "./cloud.svg"
 import moon_icon from "./moon.svg"
 import sun_icon from "./sun.svg"
 import rain_icon from "./rain.svg"

 
const allBoxes = [
  {
    title: "Air Quality",
    imgId: cloud_icon,
    values: [
      { property: "Humidity", value: "current.humidity" },
      { property: "Visibility", value: "current.vis_km" },
      { property: "UV Index", value: "current.uv" },
    ],
  },
  {
    title: "Wind",
    imgId: rain_icon,
    values: [
      { property: "Wind Speed", value: "current.wind_kph" },
      { property: "Wind Direction", value: "current.wind_dir" },
      { property: "Wind Degree", value: "current.wind_degree" },
    ],
  },
  {
    title: "Sun Timing",
    imgId: sun_icon,
    values: [
      { property: "Rise", value: "forecast.forecastday[0].astro.sunrise" },
      { property: "Set", value: "forecast.forecastday[0].astro.sunset" },
    ],
  },
  {
    title: "Moon Timing",
    imgId: moon_icon,
    values: [
      { property: "Rise", value: "forecast.forecastday[0].astro.moonrise" },
      { property: "Set", value: "forecast.forecastday[0].astro.moonset" },
    ],
  },
  {
    title: "Rain Chance",
    imgId: rain_icon,
    values: [
      { property: "Rain Chance", value: "current.wind_kph" },
      { property: "Cloud Cover", value: "current.cloud" },
      { property: "Wind Degree", value: "current.wind_degree" },
    ],
  },
  {
    title: "Wind",
    imgId: rain_icon,
    values: [
      { property: "Wind Speed", value: "current.wind_kph" },
      { property: "Wind Direction", value: "current.wind_dir" },
      { property: "Wind Degree", value: "current.wind_degree" },
    ],
  },
];

export default allBoxes;
