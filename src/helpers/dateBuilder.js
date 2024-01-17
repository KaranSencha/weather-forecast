function dateBuilder(inputDate) {
  let date = new Date(inputDate);
	 let months = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December",
   ];
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   let day = days[date.getDay()];
   let dateDay = date.getDate();
   let month = months[date.getMonth()];

   return `${day}, ${dateDay} ${month}`;
}

export default dateBuilder