import { ListItem, Tooltip } from "@mui/material";
import { memo } from "react";

const MenuItem = ({ band }) => {
	return (
		<ListItem
			disablePadding
			className="z-10 relative left-0"
		>
			<span className="relative left-0 w-5 h-5 rounded-full border-solid border-4 bg-[rgb(229,230,230)] border-gray-500 shadow-xl group">
				<Tooltip
					arrow
					placement="top"
					title={`Jump to the '${band.title}' section`}
				>
					<a
						href={"#" + band.linkref}
						className="h_linkmenu text-[#523eeb] opacity-0 transition-all duration-300 invisible group-hover:visible group-hover:opacity-100 hover:underline min-w-[200px] p-1 left-[30px] absolute text-sm text-center pl-4 pr-4 rounded-sm bg-[rgb(229,230,230)] shadow-md border-black3 border-2 hover:cursor-pointer"
					>
						{band.title}
					</a>
				</Tooltip>
			</span>
		</ListItem>
	);
};

export default memo(MenuItem);
