import { useState } from "react";
import { HOST_URL } from "../script";

const useBands = (setError) => {
	const [bands, setBands] = useState([]);
	///////////////////////////////////////
	const retrieve_bands = async () => {
		const list = [];
		try {
			let response = await fetch(HOST_URL + "/api/v1/bands");
			response = await response.json();
			if (!response.error && response.response.length > 0) {
				const responselist = response.response;
				responselist.forEach((element) => list.push(element));
				setBands(list);
			}
			return;
		} catch (error) {
			setError(error.message);
			return;
		}
	};
	return { bands, setBands, retrieve_bands };
};

export default useBands;
