import { Stack } from "@mui/material";
import { memo } from "react";

const Footer = () => {
	return (
		<Stack className="text-gray-300 bg-black p-2 text-center text-sm">
			&copy; Romanian-American University - Project 3 - Web Application
			Development
		</Stack>
	);
};

export default memo(Footer);
