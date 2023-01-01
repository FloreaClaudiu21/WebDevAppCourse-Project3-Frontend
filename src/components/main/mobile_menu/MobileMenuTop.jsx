import { ArrowBack } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

const MobileMenuTop = ({ setMobileMenu }) => {
	return (
		<Stack className="gap-3 pb-3 flex-row place-items-center">
			<IconButton
				className="text-black bg-slate-100"
				onClick={() => setMobileMenu(false)}
			>
				<ArrowBack />
			</IconButton>
			<span className="font-bold text-base">Navigation Menu:</span>
		</Stack>
	);
};

export default MobileMenuTop;
