import { memo } from "react";
import MenuItem from "./MenuItem";
import uuid from "react-uuid";
import { Box, List, Stack } from "@mui/material";

const HorizontalMenu = ({ bands }) => {
	return (
		<Stack
			id="horizontal"
			className="horizontal_menu hidden w-5 md:flex md:visible fixed top-1/2 opacity-100 -translate-y-1/2 left-1 h-[60%] z-50 rounded-2xl bg-black7 transition-all"
		>
			<List className="h-full flex flex-col justify-evenly">
				<MenuItem
					key={uuid()}
					band={{
						title: "Intro",
						linkref: "whats",
					}}
				/>
				{bands.map((band) => {
					return (
						<MenuItem
							key={uuid()}
							band={band}
						/>
					);
				})}
				<MenuItem
					key={uuid()}
					band={{
						title: "Feedback",
						linkref: "fb",
					}}
				/>
			</List>

			<Box className="top-[1%] w-1 left-1/2 h-[97%] absolute margin-auto -translate-x-1/2 bg-slate-200 shadow-sm"></Box>
		</Stack>
	);
};

export default memo(HorizontalMenu);
