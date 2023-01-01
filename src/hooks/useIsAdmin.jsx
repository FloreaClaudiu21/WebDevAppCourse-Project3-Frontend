import { useState } from "react";

const useIsAdmin = (UserData, setError, setLoading) => {
	const [isAdmin, setAdmin] = useState(false);
	const [alreadyFetched, setalreadyFetched] = useState(false);
	const retrieve_admin = () => {
		if (!UserData || !UserData.user || alreadyFetched) return;
		fetch("http://localhost:5100/api/v1/admin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uid: UserData.user.uid,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res.error && res.response.length > 0) {
					setAdmin(true);
				}
				return;
			})
			.catch((error) => setError(error.message))
			.finally(() => {
				setLoading(false);
				setalreadyFetched(true);
			});
		return;
	};
	return { isAdmin, setAdmin, retrieve_admin };
};

export default useIsAdmin;
