import img_113 from "./day/113.png";
import img_116 from "./day/116.png";
import img_119 from "./day/119.png";
import img_122 from "./day/122.png";
import img_143 from "./day/143.png";
import img_176 from "./day/176.png";
import img_179 from "./day/179.png";
import img_182 from "./day/182.png";
import img_185 from "./day/185.png";
import img_200 from "./day/200.png";
import img_227 from "./day/227.png";
import img_230 from "./day/230.png";
import img_248 from "./day/248.png";
import img_260 from "./day/260.png";
import img_263 from "./day/263.png";
import img_266 from "./day/266.png";
import img_281 from "./day/281.png";
import img_284 from "./day/284.png";
import img_293 from "./day/293.png";
import img_296 from "./day/296.png";
import img_299 from "./day/299.png";
import img_302 from "./day/302.png";
import img_305 from "./day/305.png";
import img_308 from "./day/308.png";
import img_311 from "./day/311.png";
import img_314 from "./day/314.png";
import img_317 from "./day/317.png";
import img_320 from "./day/320.png";
import img_323 from "./day/323.png";
import img_326 from "./day/326.png";
import img_329 from "./day/329.png";
import img_332 from "./day/332.png";
import img_335 from "./day/335.png";
import img_338 from "./day/338.png";
import img_350 from "./day/350.png";
import img_353 from "./day/353.png";
import img_356 from "./day/356.png";
import img_359 from "./day/359.png";
import img_362 from "./day/362.png";
import img_365 from "./day/365.png";
import img_368 from "./day/368.png";
import img_371 from "./day/371.png";
import img_374 from "./day/374.png";
import img_377 from "./day/377.png";
import img_386 from "./day/386.png";
import img_389 from "./day/389.png";
import img_392 from "./day/392.png";
import img_395 from "./day/395.png";

const allCloudCondition = [
  {
    code: 1000,
    text: "Sunny",
    imgId: img_113,
  },
  {
    code: 1003,
    text: "Partly cloudy",
    imgId: img_116,
  },
  {
    code: 1006,
    text: "Cloudy",
    imgId: img_119,
  },
  {
    code: 1009,
    text: "Overcast",
    imgId: img_122,
  },
  {
    code: 1030,
    text: "Mist",
    imgId: img_143,
  },
  {
    code: 1063,
    text: "Patchy rain possible",
    imgId: img_176,
  },
  {
    code: 1066,
    text: "Patchy snow possible",
    imgId: img_179,
  },
  {
    code: 1069,
    text: "Patchy sleet possible",
    imgId: img_182,
  },
  {
    code: 1072,
    text: "Patchy freezing drizzle possible",
    imgId: img_185,
  },
  {
    code: 1087,
    text: "Thundery outbreaks possible",
    imgId: img_200,
  },
  {
    code: 1114,
    text: "Blowing snow",
    imgId: img_227,
  },
  {
    code: 1117,
    text: "Blizzard",
    imgId: img_230,
  },
  {
    code: 1135,
    text: "Fog",
    imgId: img_248,
  },
  {
    code: 1147,
    text: "Freezing fog",
    imgId: img_260,
  },
  {
    code: 1150,
    text: "Patchy light drizzle",
    imgId: img_263,
  },
  {
    code: 1153,
    text: "Light drizzle",
    imgId: img_266,
  },
  {
    code: 1168,
    text: "Freezing drizzle",
    imgId: img_281,
  },
  {
    code: 1171,
    text: "Heavy freezing drizzle",
    imgId: img_284,
  },
  {
    code: 1180,
    text: "Patchy light rain",
    imgId: img_293,
  },
  {
    code: 1183,
    text: "Light rain",
    imgId: img_296,
  },
  {
    code: 1186,
    text: "Moderate rain at times",
    imgId: img_299,
  },
  {
    code: 1189,
    text: "Moderate rain",
    imgId: img_302,
  },
  {
    code: 1192,
    text: "Heavy rain at times",
    imgId: img_305,
  },
  {
    code: 1195,
    text: "Heavy rain",
    imgId: img_308,
  },
  {
    code: 1198,
    text: "Light freezing rain",
    imgId: img_311,
  },
  {
    code: 1201,
    text: "Moderate or heavy freezing rain",
    imgId: img_314,
  },
  {
    code: 1204,
    text: "Light sleet",
    imgId: img_317,
  },
  {
    code: 1207,
    text: "Moderate or heavy sleet",
    imgId: img_320,
  },
  {
    code: 1210,
    text: "Patchy light snow",
    imgId: img_323,
  },
  {
    code: 1213,
    text: "Light snow",
    imgId: img_326,
  },
  {
    code: 1216,
    text: "Patchy moderate snow",
    imgId: img_329,
  },
  {
    code: 1219,
    text: "Moderate snow",
    imgId: img_332,
  },
  {
    code: 1222,
    text: "Patchy heavy snow",
    imgId: img_335,
  },
  {
    code: 1225,
    text: "Heavy snow",
    imgId: img_338,
  },
  {
    code: 1237,
    text: "Ice pellets",
    imgId: img_350,
  },
  {
    code: 1240,
    text: "Light rain shower",
    imgId: img_353,
  },
  {
    code: 1243,
    text: "Moderate or heavy rain shower",
    imgId: img_356,
  },
  {
    code: 1246,
    text: "Torrential rain shower",
    imgId: img_359,
  },
  {
    code: 1249,
    text: "Light sleet showers",
    imgId: img_362,
  },
  {
    code: 1252,
    text: "Moderate or heavy sleet showers",
    imgId: img_365,
  },
  {
    code: 1255,
    text: "Light snow showers",
    imgId: img_368,
  },
  {
    code: 1258,
    text: "Moderate or heavy snow showers",
    imgId: img_371,
  },
  {
    code: 1261,
    text: "Light showers of ice pellets",
    imgId: img_374,
  },
  {
    code: 1264,
    text: "Moderate or heavy showers of ice pellets",
    imgId: img_377,
  },
  {
    code: 1273,
    text: "Patchy light rain with thunder",
    imgId: img_386,
  },
  {
    code: 1276,
    text: "Moderate or heavy rain with thunder",
    imgId: img_389,
  },
  {
    code: 1279,
    text: "Patchy light snow with thunder",
    imgId: img_392,
  },
  {
    code: 1282,
    text: "Moderate or heavy snow with thunder",
    imgId: img_395,
  },
];

export default allCloudCondition;
