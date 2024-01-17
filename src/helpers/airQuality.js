function airQuality(index) {
  let description;

  switch (index) {
    case 1:
      description = "Good";
      break;
    case 2:
      description = "Moderate";
      break;
    case 3:
      description = "Unhealthy";
      break;
    case 4:
      description = "Unhealthy";
      break;
    case 5:
      description = "Very Unhealthy";
      break;
    case 6:
      description = "Hazardous";
      break;
    default:
      description = "Midium";
  }

  return description;
}

export default airQuality;
