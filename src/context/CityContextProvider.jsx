import React, { useState } from "react";
import CityContext from "./CityContext";
function CityContextProvider({ children }) {
	const [city, setCity] = useState("");
	const [menu, setMenu] = useState(false);
	
	return (
		<CityContext.Provider value={{city, setCity, menu, setMenu}}>
			{children}
		</CityContext.Provider>
	)
	
}

export default CityContextProvider;