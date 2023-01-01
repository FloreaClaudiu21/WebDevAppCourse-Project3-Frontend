import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Logo from "../../../assets/logo.png";
import Scroll from "../../../assets/scrolldown.gif";

const HeaderContainer = () => {
	return (
		<Container
			maxWidth="lg"
			className="flex flex-1 mt-16 relative justify-center place-items-center flex-col p-2 gap-4 z-10"
		>
			<Stack className="gap-4 flex-1 place-items-center justify-center">
				<img
					src={Logo}
					alt=""
					className="w-32 h-24 sm:w-64 sm:h-44 object-cover rounded-2xl bg-[rgba(255,255,255,0.9)]"
				/>
				<p className="text-base text-white max-w-md p-1 text-center pl-4 pr-4 rounded-lg bg-black7">Brief history of famous rock bands</p>
				<Typography className="text-xs sm:p-4 sm:text-base text-center text-[rgb(199,199,199)]">
					In this project we will present some important information about old
					famous rock bands, at the end of the documentation you can leave an
					opinion or idea related to your experience on the page!
				</Typography>
			</Stack>
			<img
				alt=""
				src={Scroll}
				className="w-16 h-16 mb-3"
			/>
		</Container>
	);
};

export default HeaderContainer;
