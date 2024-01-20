function timeBuilder(inputDate) {
	let date = new Date(inputDate);
	
	let hour = String(date.getHours()).padStart(2, "0");
	let hourType = "AM";
	if (hour >= 12) {
		hourType = "PM";
	}

	return `${hour}:00 ${hourType}`;
}

export default timeBuilder;