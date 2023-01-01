import { Backdrop, Typography } from "@mui/material";
import LoadingImg from "../../../assets/loading.gif";
import ErrorImg from "../../../assets/error.gif";
import { Stack } from "@mui/system";

const Loading = ({ loading, error }) => {
	const isError = error !== undefined && error.length > 0;
	return (
		<Backdrop
			open={loading}
			className="flex-col bg-black8 z-[10000]"
		>
			{isError ? (
				<Stack className="bg-black3 rounded-md p-2 place-items-center shadow-sm">
					<img
						alt=""
						src={ErrorImg}
						className="w-48 h-48 object-cover"
					></img>
					<Typography
						variant="caption"
						className="text-red-400 text-sm text-center break-all p-1 max-w-md"
					>
						Error: {error}
					</Typography>
				</Stack>
			) : (
				<img
					alt=""
					src={LoadingImg}
					className="w-48 h-48 object-cover"
				></img>
			)}
		</Backdrop>
	);
};

export default Loading;
