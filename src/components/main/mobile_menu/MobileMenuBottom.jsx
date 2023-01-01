import { LoginOutlined, LogoutOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import useUser from "../../../hooks/useUser";

const MobileMenuBottom = ({
	isLogged,
	setAuthPanel,
	setMobileMenu,
	mobileMenu,
}) => {
	const { signOut } = useUser({});
	return isLogged ? (
		<Stack className="flex-col place-items-center justify-center gap-4 p-1 pt-2 pb-0 pl-0">
			<Link
				to="myaccount"
				className="bg-black rounded-md text-white hover:text-gray-200 hover:bg-[rgb(139,139,139)] p-1 w-full text-center"
			>
				My Account
			</Link>
			<Button
				onClick={signOut}
				startIcon={<LogoutOutlined className="w-4 h-4" />}
				className="bg-[rgb(252,71,71)] hover:bg-red-800 hover:scale-105 transition-all rounded-md text-white hover:text-gray-200 w-full"
			>
				Sign Out
			</Button>
		</Stack>
	) : (
		<Stack className="flex-col place-items-center justify-center gap-4 p-1 pt-2 pb-0 pl-0">
			<Button
				onClick={() => {
					setAuthPanel(true);
					setMobileMenu(!mobileMenu);
					return;
				}}
				className="bg-black rounded-md text-white hover:text-gray-200 hover:bg-[rgb(139,139,139)] w-full hover:scale-105 transition-all"
				startIcon={<LoginOutlined className="w-4 h-4" />}
			>
				Login
			</Button>
		</Stack>
	);
};

export default MobileMenuBottom;
