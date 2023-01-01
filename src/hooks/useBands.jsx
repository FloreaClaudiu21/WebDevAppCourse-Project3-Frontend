import { useEffect, useState } from "react";

const useBands = (setError) => {
	const [bands, setBands] = useState([]);
	///////////////////////////////////////
	useEffect(() => {
		fetch("http://localhost:5100/api/v1/bands")
			.then((res) => res.json())
			.then((res) => {
				const list = [];
				if (!res.error && res.response.length > 0) {
					const responselist = res.response;
					responselist.forEach((element) => list.push(element));
					setBands(list);
				}
				return;
			})
			.catch((error) => setError(error.message));
	}, [setError]);
	return { bands, setBands };
};

export default useBands;
