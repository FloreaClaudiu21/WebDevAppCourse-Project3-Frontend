import {
	Box,
	Button,
	CircularProgress,
	Container,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { memo, useRef, useState } from "react";
import {
	ClearAll,
	Info,
	ListOutlined,
	SendOutlined,
} from "@mui/icons-material";
import ClearTextAreaDialog from "./ClearTextAreaDialog";
import FeedbackListDialog from "./FeedbackListDialog";
import {
	useIntersectionMethod,
	useIntersectionObserver,
} from "../../../hooks/useIntersectionObserver";
import useFeedbacks from "../../../hooks/useFeedbacks";

const Feedback = ({ user, isLogged, isAdmin }) => {
	const textareaRef = useRef();
	const [listDialog, setListDialog] = useState(false);
	const [clearDialog, setClearDialog] = useState(false);
	const { check_textArea, sending, canSend, add_feedback } = useFeedbacks({
		user: user,
		isLogged: isLogged,
		textareaRef: textareaRef,
	});
	const cbRef = useIntersectionObserver(
		{ threshold: 0, root: null, rootMargin: "-300px" },
		useIntersectionMethod
	);
	return (
		<Box
			id="fb"
			ref={cbRef}
			className="bg-[#222]"
		>
			<Container
				maxWidth="xl"
				className="flex flex-col p-3 gap-4 md:p-4 md:pl-7 md:pr-5"
			>
				<Typography className="text-[#00b285] text-center text-base">
					Feedback Section
				</Typography>
				<hr />
				<Typography className="text-gray-300 text-sm text-center tracking-wide max-w-5xl m-auto">
					Do you enjoy what you see or you have a suggestion and you wanna tell
					us? Please put your ideas below and send us your message, we can't
					wait to hear your ideas! :)
				</Typography>
				<Stack className="gap-3">
					<div className="flex flex-row gap-1 p-1 place-items-center bg-black2 rounded-sm">
						<Info className="text-red-300" />
						<span className="text-xs text-red-300">
							You must be logged in order to send feedback and also the text
							must be atleast 10 characters long!
						</span>
					</div>
					{isAdmin && (
						<Tooltip
							arrow
							placement="top"
							title="Show the list of feedbacks that have been send"
						>
							<IconButton
								onClick={() => setListDialog(true)}
								className="w-6 h-6 p-4 bg-slate-200 hover:bg-slate-400 shadow-md group place-self-end"
							>
								<ListOutlined className="text-gray-700 group-hover:text-gray-200" />
							</IconButton>
						</Tooltip>
					)}
					<textarea
						ref={textareaRef}
						disabled={!isLogged}
						onChange={check_textArea}
						title={!isLogged ? "You must be logged in" : ""}
						className="border-none w-full h-[600px] p-1 resize-y rounded-lg bg-slate-100 disabled:bg-gray-300"
					></textarea>
				</Stack>
				<Typography className="empty:hidden text-sm bg-pink-400 text-red-800 rounded-lg p-2"></Typography>
				<Stack
					gap="1rem"
					flexDirection={"row"}
					alignItems={"center"}
					justifyContent={"flex-end"}
				>
					<Tooltip
						placement="top"
						title="Clear the text area"
					>
						<Button
							startIcon={<ClearAll />}
							onClick={() => setClearDialog(true)}
							className="text-[#eee] hover:text-gray-200 w-32 text-xs border-none p-2 rounded-2xl bg-[#b83a3d] hover:bg-red-700"
						>
							Clear
						</Button>
					</Tooltip>
					<Tooltip
						placement="top"
						title="Send the feedback to the admins"
					>
						<>
							{!sending ? (
								<Button
									disabled={!canSend}
									onClick={add_feedback}
									startIcon={<SendOutlined />}
									className="text-[#eee] hover:text-gray-200 w-28 text-xs border-none p-2 rounded-2xl bg-[rgba(1,191,1)] hover:bg-green-700 disabled:bg-green-900 disabled:text-gray-500"
								>
									Send
								</Button>
							) : (
								<Button
									disabled
									className="w-32 text-xs border-none p-2 rounded-2xl disabled:bg-green-900 disabled:text-gray-500"
								>
									<CircularProgress
										size={20}
										className="mx-2"
									/>{" "}
									Sending...
								</Button>
							)}
						</>
					</Tooltip>
				</Stack>
			</Container>
			<ClearTextAreaDialog
				clearDialog={clearDialog}
				setClearDialog={setClearDialog}
				textareaRef={textareaRef}
			/>
			<FeedbackListDialog
				isLogged = {isLogged}
				listDialog={listDialog}
				setListDialog={setListDialog}
			/>
		</Box>
	);
};

export default memo(Feedback);
