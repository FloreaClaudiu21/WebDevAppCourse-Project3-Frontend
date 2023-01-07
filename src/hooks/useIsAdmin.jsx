import { useState } from "react";
import { HOST_URL } from "../script";

const useIsAdmin = (UserData, setError) => {
	const [isAdmin, setAdmin] = useState(false);
	const retrieve_admin = async () => {
		if (!UserData || !UserData.user) return;
		try {
			let response = await fetch(HOST_URL + "/api/v1/admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid: UserData.user.uid,
				}),
			});
			response = await response.json();
			if (!response.error && response.response.length > 0) {
				setAdmin(true);
			}
			return;
		} catch (error) {
			setError(error.message);
			return;
		}
	};
	return { isAdmin, setAdmin, retrieve_admin };
};

export default useIsAdmin;
