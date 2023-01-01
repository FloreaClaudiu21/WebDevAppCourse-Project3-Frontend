import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Tooltip,
	Typography,
} from "@mui/material";
import { LoginOutlined, LogoutOutlined } from "@mui/icons-material";
import ProgressBar from "react-progressbar-on-scroll";
import useUser from "../../../hooks/useUser";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";

const HeaderTopLogged = ({ user, isAdmin, signOut }) => {
	const firestore = useFirestore();
	const { status, data: UserDoc } = useFirestoreDocData(
		doc(firestore, "users", user.uid)
	);
	console.log(UserDoc);
	if (status === "loading") <></>;
	return (
		<>
			<Stack
				title={user.email}
				className="flex-1 flex-row mt-1 place-items-center gap-2 min-w-[200px] overflow-hidden"
			>
				<Box className="relative">
					<Avatar
						src={UserDoc?.photo}
						className="h-8 w-8 sm:h-10 sm:w-10"
					/>
					{isAdmin && (
						<span className="absolute bg-red-700 text-white top-0 -right-1/2 -translate-x-1/4 text-[12px] px-1 rounded-md">
							ADMIN
						</span>
					)}
				</Box>
				<Typography className="text-black text-sm break-words">
					{UserDoc?.username}
				</Typography>
			</Stack>
			<Stack className="hidden flex-wrap flex-row place-items-center justify-center gap-5 md:flex">
				<Link
					to="myaccount"
					className="bg-black rounded-md text-white hover:text-gray-200 hover:bg-[rgb(139,139,139)] p-1"
				>
					My Account
				</Link>
				<Button
					onClick={signOut}
					startIcon={<LogoutOutlined className="w-4 h-4" />}
					className="bg-[rgb(252,71,71)] hover:bg-red-800 hover:scale-105 transition-all rounded-md text-white hover:text-gray-200"
				>
					Sign Out
				</Button>
			</Stack>
		</>
	);
};

const HeaderTop = ({
	user,
	setMobileMenu,
	mobileMenu,
	isLogged,
	isAdmin,
	setAuthPanel,
}) => {
	const { signOut } = useUser({});
	return (
		<AppBar className="flex flex-row h-auto p-1 shadow-md bg-slate-100">
			{isLogged ? (
				<HeaderTopLogged
					user={user}
					isAdmin={isAdmin}
					signOut={signOut}
				/>
			) : (
				<>
					<Stack className="flex-1 mt-1 flex-row place-items-center gap-2 min-w-[200px] overflow-hidden">
						<img
							src={Logo}
							alt=""
							className="h-8 w-12 sm:h-10 sm:w-16 object-cover"
						/>
					</Stack>
					<Stack className="hidden flex-wrap flex-row place-items-center justify-center gap-5 md:flex">
						<Tooltip
							arrow
							title="Login on the webpage"
						>
							<Button
								onClick={() => setAuthPanel(true)}
								className="bg-black rounded-md text-white hover:text-gray-200 hover:bg-[rgb(139,139,139)] hover:scale-105 transition-all"
								startIcon={<LoginOutlined className="w-4 h-4" />}
							>
								Login In
							</Button>
						</Tooltip>
					</Stack>
				</>
			)}
			<Stack
				onClick={() => setMobileMenu(!mobileMenu)}
				className="flex-wrap flex-row place-items-center justify-center gap-5 md:hidden"
			>
				<Button
					id="menu_btn"
					disableRipple
					title="Toggle side menu"
					className={`w-12 h-12 border-none rounded-lg hover:bg-[#eee] ${
						mobileMenu && "burger-opened"
					}`}
				>
					<svg viewBox="0 0 100 100">
						<path
							className="line line1"
							d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
						/>
						<path
							className="line line2"
							d="M 20,50 H 80"
						/>
						<path
							className="line line3"
							d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
						/>
					</svg>
				</Button>
			</Stack>
			<ProgressBar
				height={5}
				position="top"
				direction="right"
			/>
		</AppBar>
	);
};

export default HeaderTop;
