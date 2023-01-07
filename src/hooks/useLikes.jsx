import { useSnackbar } from "notistack";
import { HOST_URL } from "../script";

const useLikes = ({ user, isLogged, setLikes }) => {
	const { enqueueSnackbar } = useSnackbar();
	///////////////////////////////////////
	const success_variant = {
		variant: "success",
		autoHideDuration: 3000,
	};
	const error_variant = {
		variant: "error",
		autoHideDuration: 3000,
	};
	const retrieve_likes = async () => {
		if (!user) return;
		try {
			const list = [];
			let response = await fetch(HOST_URL + "/api/v1/like", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mode: "get",
					uid: user.uid,
				}),
			});
			response = await response.json();
			if (!response.error && response.response.length > 0) {
				response.response.forEach((element) => list.push(element.bandid));
				setLikes(list);
			}
			return;
		} catch (error) {
			return;
		}
	};
	const retrieve_likes_band = async (bandid) => {
		try {
			let response = await fetch(HOST_URL + "/api/v1/likes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					bandid: bandid,
				}),
			});
			response = await response.json();
			if (!response.error && response.response.length > 0) {
				return response.response.length;
			}
			return 0;
		} catch (error) {
			return 0;
		}
	};
	const add_like = async (bandid) => {
		if (!isLogged) return;
		try {
			let response = await fetch(HOST_URL + "/api/v1/like", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mode: "create",
					uid: user.uid,
					bandid: bandid,
				}),
			});
			response = await response.json();
			if (response.error) {
				enqueueSnackbar(
					"Like couldn't be send! Error: " + response.response,
					error_variant
				);
			}
			if (!response.error) {
				enqueueSnackbar(
					"Band have been added to favorite list successfully!",
					success_variant
				);
			}
		} catch ({ message }) {
			enqueueSnackbar(
				"Like couldn't be send! Error: " + message,
				error_variant
			);
		}
		return;
	};
	const delete_like = async (bandid) => {
		if (!isLogged) return;
		try {
			let response = await fetch(HOST_URL + "/api/v1/like", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mode: "delete",
					uid: user.uid,
					bandid: bandid,
				}),
			});
			response = await response.json();
			if (response.error) {
				enqueueSnackbar(
					"Like couldn't be deleted! Error: " + response.response,
					error_variant
				);
			}
			if (!response.error) {
				enqueueSnackbar(
					"Band have been removed from favorite list successfully!",
					success_variant
				);
			}
		} catch ({ message }) {
			enqueueSnackbar(
				"Like couldn't be deleted! Error: " + message,
				error_variant
			);
		}
		return;
	};
	return {
		retrieve_likes,
		retrieve_likes_band,
		delete_like,
		add_like,
	};
};

export default useLikes;
