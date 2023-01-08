import {
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { memo } from "react";
import Iframe from "react-iframe";
import {
	useIntersectionObserver,
	useIntersectionMethod,
} from "../../../hooks/useIntersectionObserver";

const Band = ({ user, band, likes, setLikes, isLogged }) => {
	const cbRef = useIntersectionObserver(
		{ threshold: 0, root: null, rootMargin: "-300px" },
		useIntersectionMethod
	);
	const bandID = band.linkref;
	return (
		<Stack
			ref={cbRef}
			id={bandID}
			className="bg-white shadow-lg p-3 rounded-md"
		>
			<Stack className="gap-4 py-1 flex-row place-items-center">
				<a
					href={band.link}
					target="_blank"
					rel="noreferrer"
					title="Click to watch video"
					className="text-base font-bold hover:underline flex-1"
				>
					{band.title}
				</a>
			</Stack>
			<hr />
			<Box className="mt-3 mb-3">
				<Box className="float-left mb-4 md:mb-0 md:m-4 md:ml-0 md:mt-0 w-full md:w-[450px] md:h-[400px] h-[350px] rounded-md overflow-hidden">
					<img
						className="w-full h-full object-fill"
						src={band.photo}
						alt=""
					/>
				</Box>
				<Box>
					<Typography
						component={"span"}
						className="text-sm break-all indent-8 text-[rgb(74,74,74)]"
					>
						{band.text}
					</Typography>
				</Box>
			</Box>
			<Stack className="w-full h-[350px] md:h-[500px] min-w-[250px]">
				<Iframe
					url={band.embed}
					className="w-full h-full border-none"
				/>
			</Stack>
		</Stack>
	);
};

export default memo(Band);
