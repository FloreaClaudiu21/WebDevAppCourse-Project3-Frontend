import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Img404 from "../../assets/404.png";

const Page404 = () => {
	return (
		<Stack className="w-full h-auto min-h-screen bg-center bg-cover bg-404BG">
			<Stack
				padding={"1rem"}
				justifySelf="flex-end"
				justifyContent={"flex-start"}
			>
				<Stack
					gap={"1rem"}
					flexWrap="wrap"
					flexDirection="row"
					alignItems={"center"}
					justifyContent={"center"}
				>
					<img
						src={Logo}
						alt=""
						className="w-32 h-24"
					/>
					<Typography
						component={"span"}
						className="text-base text-white max-w-md p-1 text-center pl-4 pr-4 rounded-lg bg-black7"
					>
						Brief history of famous rock bands | Project 3 | Web Application
						Development
					</Typography>
				</Stack>
			</Stack>
			<Stack
				flex={"1"}
				margin={"1rem auto"}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<img
					alt=""
					src={Img404}
					className="w-full h-auto max-w-3xl min-h-[400px] max-h-[460px]"
				/>
				<Link
					to="/"
					className="text-white hover:text-gray-200 bg-black hover:bg-black7 text-sm p-3 rounded-[20px] hover:rounded-[15px] transition-all duration-300 shadow-md"
				>
					Back to the main page
				</Link>
			</Stack>
		</Stack>
	);
};

export default Page404;
