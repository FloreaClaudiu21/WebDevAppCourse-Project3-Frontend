import { Backdrop, List, ListItem, Slide, Stack } from "@mui/material";
import { memo } from "react";
import uuid from "react-uuid";
import MobileMenuBottom from "./MobileMenuBottom";
import MobileMenuTop from "./MobileMenuTop";

const MobileMenuItem = ({ band, setMobileMenu }) => {
	return (
		<ListItem
			disablePadding
			className="z-10 relative left-0 list-item"
		>
			<span className="">
				<a
					href={"#" + band.linkref}
					onClick={() => setMobileMenu(false)}
					className="text-[#3927c2] text-lg font-semibold leading-relaxed hover:underline hover:cursor-pointer"
				>
					{band.title}
				</a>
			</span>
		</ListItem>
	);
};

const MobileMenu = ({
	bands,
	setMobileMenu,
	mobileMenu,
	isLogged,
	isAdmin,
	setAuthPanel,
}) => {
	return (
		<Backdrop
			open={mobileMenu}
			className="md:hidden fixed w-full h-screen top-0 left-0 z-[10000] bg-black7"
		>
			<Slide
				in={mobileMenu}
				direction="right"
			>
				<Stack className="flex w-[90%] top-0 left-0 p-4 h-full bg-white fixed overflow-y-auto transition-all duration-[0.4s]">
					<MobileMenuTop setMobileMenu={setMobileMenu} />
					<hr />
					<Stack className="h-full">
						<List className="h-full flex flex-col justify-evenly list-disc list-inside">
							{bands.map((band) => {
								return (
									<MobileMenuItem
										key={uuid()}
										band={band}
										setMobileMenu={setMobileMenu}
									/>
								);
							})}
						</List>
					</Stack>
					<hr />
					<MobileMenuBottom
						isAdmin={isAdmin}
						isLogged={isLogged}
						setAuthPanel={setAuthPanel}
						mobileMenu={mobileMenu}
						setMobileMenu={setMobileMenu}
					/>
				</Stack>
			</Slide>
		</Backdrop>
	);
};

export default memo(MobileMenu);
