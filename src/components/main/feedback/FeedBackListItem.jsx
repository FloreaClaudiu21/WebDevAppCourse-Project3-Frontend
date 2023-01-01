import { DeleteForeverOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";

const FeedBackListItem = ({
	item: { uuid, user, message, date },
	delete_feedback,
}) => {
	return (
		<Stack className="py-2 gap-1 px-1 bg-gray-100 rounded-sm shadow-md">
			<Stack className="flex-row gap-3">
				<Avatar
					src={user.photo}
					className="h-8 w-8"
				/>
				<Stack className="break-words">
					<p className="text-sm text-blue-600 break-all">
						{user.username}
					</p>
					<p className="text-xs text-gray-500 break-all">{user.email}</p>
				</Stack>
			</Stack>
			<hr />
			<Stack className="py-2">
				<Typography className="text-sm break-all">{message}</Typography>
			</Stack>
			<hr />
			<Stack>
				<Typography className="text-[14px] text-gray-500 text-right">
					{date}
				</Typography>
			</Stack>
			<IconButton
				onClick={() => delete_feedback(uuid)}
				className="absolute right-2 shadow-sm text-red-600 hover:text-red-800"
			>
				<Tooltip
					arrow
					title="Delete feedback"
					placement="top"
				>
					<DeleteForeverOutlined />
				</Tooltip>
			</IconButton>
		</Stack>
	);
};

export default FeedBackListItem;
