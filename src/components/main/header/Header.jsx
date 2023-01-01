import { memo } from "react";
import HeaderTop from "./HeaderTop";
import HeaderContainer from "./HeaderContainer";
import Video from "../../../assets/Guitarist.mp4";
import { Stack } from "@mui/system";
import {
	useIntersectionMethod,
	useIntersectionObserver,
} from "../../../hooks/useIntersectionObserver";

const Header = ({
	user,
	setMobileMenu,
	mobileMenu,
	isLogged,
	isAdmin,
	authPanel,
	setAuthPanel,
	loading,
}) => {
	const cbRef = useIntersectionObserver(
		{ threshold: 0, root: null, rootMargin: "-300px" },
		useIntersectionMethod
	);
	return (
		<Stack
			id="hero"
			ref={cbRef}
			className="min-h-screen h-auto relative"
		>
			<video
				loop
				muted
				autoPlay
				preload={"auto"}
				className="object-cover w-full h-full z-1 absolute"
			>
				<source src={Video} />
			</video>
			{!loading && (
				<HeaderTop
					user={user}
					isAdmin={isAdmin}
					isLogged={isLogged}
					mobileMenu={mobileMenu}
					setMobileMenu={setMobileMenu}
					authPanel={authPanel}
					setAuthPanel={setAuthPanel}
				/>
			)}
			<HeaderContainer />
			<div className="h-full w-full absolute bg-black8 z-2"></div>
		</Stack>
	);
};

export default memo(Header);
