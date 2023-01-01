import { doc, getDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import { useCallback, useMemo, useState } from "react";
import uuid from "react-uuid";
import { useFirestore } from "reactfire";

const useFeedbacks = ({
	user,
	isLogged,
	curPage,
	textareaRef,
	isFetching,
	setFetching,
}) => {
	const firestore = useFirestore();
	const { enqueueSnackbar } = useSnackbar();
	const [canSend, setcanSend] = useState(false);
	const [sending, setSending] = useState(false);
	const [feedbacks, setFeedbacks] = useState([]);
	const [deleting, setDeleting] = useState(false);
	const success_variant = {
		variant: "success",
		autoHideDuration: 3000,
	};
	const error_variant = useMemo(() => {
		return { variant: "error", autoHideDuration: 3000 };
	}, []);
	const check_textArea = () => {
		const textArea = textareaRef.current;
		let text = textArea.value;
		text = text.trim();
		if (text.length <= 10) {
			setcanSend(false);
		}
		setcanSend(true);
		return;
	};
	const fetch_list = useCallback(
		async (res) => {
			let list = [];
			const responselist = res.response;
			await Promise.all(
				responselist.map(async (element) => {
					let data = await getDoc(doc(firestore, "users", element.uid));
					list.push({
						...element,
						user: data.data(),
						date: new Date(element.time).toUTCString().replace("GMT", ""),
					});
				})
			);
			return list;
		},
		[firestore]
	);
	const pages = useMemo(() => {
		let page = feedbacks.length / 5;
		page = Math.round(page);
		if (page <= 0) {
			return 1;
		}
		return page;
	}, [feedbacks]);
	const show_feedbacks = useCallback(() => {
		let showList = [];
		let ItemsPerPage = 5;
		if (feedbacks.length <= 0) return showList;
		let endPoint = curPage * ItemsPerPage;
		if (endPoint > feedbacks.length) {
			endPoint = feedbacks.length;
		}
		let startPoint = curPage * ItemsPerPage - ItemsPerPage;
		for (let i = startPoint; i < endPoint; i++) {
			showList.push(feedbacks[i]);
		}
		return showList;
	}, [curPage, feedbacks]);
	const showFeedbacks = show_feedbacks();
	const retrieve = useCallback(async () => {
		setFetching(true);
		try {
			let response = await fetch("http://localhost:5100/api/v1/feedbacks");
			response = await response.json();
			if (response.error) {
				setFeedbacks([]);
			}
			if (!response.error && response.response.length > 0) {
				const l = await fetch_list(response);
				setFeedbacks(l);
			}
		} catch ({ message }) {
			enqueueSnackbar(
				"Could't fetch the feedbacks! Error: " + message,
				error_variant
			);
		}
		setFetching(false);
		return;
	}, [fetch_list, error_variant, enqueueSnackbar, setFetching]);
	const add_feedback = async () => {
		if (sending || !isLogged || !canSend) return;
		setSending(true);
		try {
			let response = await fetch("http://localhost:5100/api/v1/feedbacks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mode: "create",
					uuid: uuid(),
					uid: user.uid,
					time: Date.now(),
					message: textareaRef.current.value,
				}),
			});
			response = await response.json();
			if (response.error) {
				enqueueSnackbar(
					"Feedback couldn't be send! Error: " + response.response,
					error_variant
				);
			}
			if (!response.error) {
				enqueueSnackbar(
					"Feedback message have been send successfully!",
					success_variant
				);
			}
		} catch ({ message }) {
			enqueueSnackbar(
				"Feedback couldn't be send! Error: " + message,
				error_variant
			);
		}
		textareaRef.current.value = "";
		setSending(false);
		return;
	};
	const delete_feedback = async (uuid) => {
		if (deleting || !isLogged) return;
		setDeleting(true);
		try {
			let response = await fetch("http://localhost:5100/api/v1/feedbacks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mode: "delete",
					uuid: uuid,
				}),
			});
			response = await response.json();
			if (response.error) {
				enqueueSnackbar(
					"Feedback couldn't be deleted! Error: " + response.response,
					error_variant
				);
			}
			if (!response.error) {
				enqueueSnackbar(
					"Feedback message have been deleted successfully!",
					success_variant
				);
				setDeleting(false);
				await retrieve();
			}
		} catch ({ message }) {
			enqueueSnackbar(
				"Feedback couldn't be deleted! Error: " + message,
				error_variant
			);
		}
		setDeleting(false);
		return;
	};
	return {
		canSend,
		sending,
		setSending,
		isFetching,
		setFetching,
		deleting,
		show_feedbacks,
		showFeedbacks,
		pages,
		retrieve,
		add_feedback,
		delete_feedback,
		check_textArea,
	};
};

export default useFeedbacks;
