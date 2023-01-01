import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	Pagination,
	PaginationItem,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { memo, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import uuid from "react-uuid";
import FeedBackListItem from "./FeedBackListItem";
import useFeedbacks from "../../../hooks/useFeedbacks";

const FeedBackListDialog = ({ isLogged, listDialog, setListDialog }) => {
	const [curPage, setCurPage] = useState(1);
	const [isFetching, setFetching] = useState(false);
	const { pages, showFeedbacks, retrieve, delete_feedback, deleting } =
		useFeedbacks({
			curPage: curPage,
			isLogged: isLogged,
			isFetching: isFetching,
			setFetching: setFetching,
		});
	const handleChange = (event, value) => {
		setCurPage(value);
	};
	// FETCH FEEDBACK LIST
	useEffect(() => {
		retrieve();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listDialog]);
	return (
		<Dialog
			open={listDialog}
			onClose={() => setListDialog(false)}
		>
			<DialogTitle className="text-bold text-center text-black">
				List of feedbacks
			</DialogTitle>
			<hr />
			<DialogContent>
				<DialogContentText className="text-center text-xs sm:text-base">
					Here you can view the available feedbacks that have been send by the
					users, also you have the ability to delete them.
				</DialogContentText>
				<List
					className="flex flex-col my-4 mb-0 gap-2"
					subheader={<Typography className="underline">Feedbacks:</Typography>}
				>
					{!isFetching ? (
						showFeedbacks.length > 0 ? (
							<>
								{showFeedbacks.map((el) => {
									return (
										<FeedBackListItem
											key={uuid()}
											item={el}
											delete_feedback={delete_feedback}
										/>
									);
								})}
								<Stack spacing={1}>
									<Pagination
										count={pages}
										page={curPage}
										onChange={handleChange}
										renderItem={(item) => (
											<PaginationItem
												components={{
													previous: ArrowBackIcon,
													next: ArrowForwardIcon,
												}}
												{...item}
											/>
										)}
									/>
								</Stack>
							</>
						) : (
							<Typography className="text-sm text-center text-black my-4">
								No feedbacks available yet
							</Typography>
						)
					) : (
						<Stack className="my-4 justify-center place-items-center gap-4">
							<CircularProgress />
							<span className="text-xs font-bold">Fetching list...</span>
						</Stack>
					)}
				</List>
			</DialogContent>
			<hr />
			<DialogActions>
				<Button
					className="text-black"
					onClick={() => setListDialog(false)}
				>
					Close
				</Button>
			</DialogActions>
			{deleting && (
				<Stack className=" bg-black7 justify-center place-items-center absolute top-0 w-full h-full">
					<Stack className="p-2 bg-black5 justify-center place-items-center rounded-md gap-4">
						<CircularProgress />
						<span className="text-xs font-bold text-red-400">
							Deleting feedback...
						</span>
					</Stack>
				</Stack>
			)}
		</Dialog>
	);
};

export default memo(FeedBackListDialog);
