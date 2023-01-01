import Bands from "./bands/Bands";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Feedback from "./feedback/Feedback";
import { useEffect, useState } from "react";
import MobileMenu from "./mobile_menu/MobileMenu";
import HorizontalMenu from "./horizontal_menu/HorizontalMenu";
import Loading from "./loading/Loading";
import { Helmet } from "react-helmet";
import AuthPanel from "./authpanel/AuthPanel";
import { Outlet } from "react-router-dom";
import useBands from "../../hooks/useBands";
import useUser from "../../hooks/useUser";

const PageWrapper = ({ loading, children }) => {
	return (
		<div
			className={`bg-gray-200 w-full ${
				loading ? "h-screen overflow-hidden" : "min-h-screen"
			}`}
		>
			{children}
		</div>
	);
};

const Main = () => {
	const [authPanel, setAuthPanel] = useState(false);
	const [mobileMenu, setMobileMenu] = useState(false);
	const {
		error,
		setError,
		status,
		UserData,
		isAdmin,
		isLogged,
		loading,
		retrieve_admin,
	} = useUser({});
	const { bands } = useBands(setError);
	const isLoading = status === "loading" || loading || bands.length <= 0;
	useEffect(() => {
		retrieve_admin();
	}, [retrieve_admin]);
	return (
		<>
			<Helmet>
				<title>Brief history of famous rock bands | Main Page</title>
			</Helmet>
			<Loading
				error={error}
				loading={isLoading}
			/>
			<PageWrapper loading={isLoading}>
				<Header
					isAdmin={isAdmin}
					loading={isLoading}
					isLogged={isLogged}
					user={UserData?.user}
					mobileMenu={mobileMenu}
					setMobileMenu={setMobileMenu}
					authPanel={authPanel}
					setAuthPanel={setAuthPanel}
				/>
				<Bands bands={bands} />
				<Feedback
					isAdmin={isAdmin}
					isLogged={isLogged}
					user={UserData?.user}
				/>
				<Footer />
				<HorizontalMenu bands={bands} />
				<MobileMenu
					bands={bands}
					isAdmin={isAdmin}
					isLogged={isLogged}
					mobileMenu={mobileMenu}
					setMobileMenu={setMobileMenu}
					authPanel={authPanel}
					setAuthPanel={setAuthPanel}
				/>
				<AuthPanel
					authPanel={authPanel}
					setAuthPanel={setAuthPanel}
				/>
				<Outlet />
			</PageWrapper>
		</>
	);
};

export default Main;
