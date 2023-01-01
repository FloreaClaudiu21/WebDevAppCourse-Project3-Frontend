import {
	EmailOutlined,
	GitHub,
	Google,
	Send,
	TextFormatOutlined,
	Visibility,
	VisibilityOff,
} from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FilledInput,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { memo, useRef, useState } from "react";
import useUser from "../../../hooks/useUser";

const AuthPanel = ({ authPanel, setAuthPanel }) => {
	const passRef = useRef();
	const emailRef = useRef();
	const repassRef = useRef();
	const errMsgRef = useRef();
	const usernameRef = useRef();
	const [forgot, setForgot] = useState(true);
	const [loginPanel, setLoginPanel] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showRePassword, setReShowPassword] = useState(false);
	const {
		loading,
		checkMail,
		checkPassword,
		checkUsername,
		loginUser,
		loginUserWithGitHub,
		loginUserWithGoogle,
		registerUser,
		forgotPass,
		checkRePassword,
	} = useUser({
		setForgot: setForgot,
		emailRef: emailRef,
		passRef: passRef,
		usernameRef: usernameRef,
		errMsgRef: errMsgRef,
		setAuthPanel: setAuthPanel,
		repassRef: repassRef,
		loginPanel: loginPanel,
		setLoginPanel: setLoginPanel,
	});
	const changePanel = () => {
		passRef.current.value = "";
		emailRef.current.value = "";
		errMsgRef.current.innerHTML = "";
		if (repassRef.current) repassRef.current.value = "";
		if (usernameRef.current) usernameRef.current.value = "";
		setShowPassword(false);
		setReShowPassword(false);
		setLoginPanel(!loginPanel);
		return;
	};
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowRePassword = () => setReShowPassword((show) => !show);
	return (
		<Dialog
			open={authPanel}
			onClose={() => setAuthPanel(false)}
		>
			{loading && (
				<Stack className="absolute justify-center place-items-center h-full w-full bg-black7 z-50">
					<CircularProgress size={60} />
				</Stack>
			)}
			<DialogTitle className="font-bold text-center text-black">
				{loginPanel ? "LOGIN" : "REGISTER"}
			</DialogTitle>
			<hr />
			<DialogContent className="flex flex-col gap-1">
				<Stack className="gap-1">
					{!loginPanel && (
						<FormControl
							fullWidth
							variant="filled"
						>
							<InputLabel htmlFor="filled-adornment-user">Username</InputLabel>
							<FilledInput
								fullWidth
								margin="dense"
								inputRef={usernameRef}
								id="filled-adornment-user"
								onChange={() => checkUsername()}
								type={"text"}
								endAdornment={
									<InputAdornment position="end">
										<TextFormatOutlined />
									</InputAdornment>
								}
							/>
						</FormControl>
					)}
					<FormControl
						fullWidth
						variant="filled"
					>
						<InputLabel htmlFor="filled-adornment-email">
							Email Address
						</InputLabel>
						<FilledInput
							fullWidth
							margin="dense"
							inputRef={emailRef}
							id="filled-adornment-email"
							onChange={() => checkMail()}
							type={"email"}
							endAdornment={
								<InputAdornment position="end">
									<EmailOutlined />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl
						fullWidth
						variant="filled"
					>
						<InputLabel htmlFor="filled-adornment-password">
							Password
						</InputLabel>
						<FilledInput
							fullWidth
							margin="dense"
							inputRef={passRef}
							id="filled-adornment-password"
							onChange={() => checkPassword()}
							type={showPassword ? "text" : "password"}
							endAdornment={
								<InputAdornment
									position="end"
									className="mr-1"
								>
									<IconButton
										onClick={handleClickShowPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					{!loginPanel && (
						<FormControl
							fullWidth
							variant="filled"
						>
							<InputLabel htmlFor="filled-adornment-repassword">
								Re-Password
							</InputLabel>
							<FilledInput
								fullWidth
								margin="dense"
								inputRef={repassRef}
								id="filled-adornment-repassword"
								onChange={() => checkRePassword()}
								type={showRePassword ? "text" : "password"}
								endAdornment={
									<InputAdornment
										position="end"
										className="mr-1"
									>
										<IconButton
											onClick={handleClickShowRePassword}
											edge="end"
										>
											{showRePassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					)}
					{loginPanel && (
						<button
							disabled={forgot}
							onClick={() => forgotPass()}
							className="text-blue-500 w-[200px] py-1 pr-0 rounded-sm place-self-end text-xs text-right hover:cursor-pointer disabled:text-gray-500 group"
						>
							<span className="text-xs group-disabled:hover:no-underline hover:underline">
								Forgot password?
							</span>
						</button>
					)}
					<Typography
						ref={errMsgRef}
						className="text-red-500 text-xs mt-2 mb-2 break-all"
					></Typography>
					<Button
						disabled={loading}
						startIcon={<Send />}
						onClick={() => (loginPanel ? loginUser() : registerUser())}
						className="bg-black hover:bg-black8 rounded-md text-white hover:text-gray-300 disabled:bg-gray-600 disabled:text-slate-400"
					>
						Submit
					</Button>
				</Stack>
				<Typography
					className="text-center font-bold"
					variant="caption"
				>
					OR
				</Typography>
				<Stack className="gap-2">
					<Button
						disabled={loading}
						startIcon={<Google />}
						onClick={loginUserWithGoogle}
						className=" bg-blue-500 hover:bg-blue-700 rounded-md text-white shadow-sm disabled:text-slate-400"
					>
						Sign up with Google
					</Button>
					<Button
						disabled={loading}
						startIcon={<GitHub />}
						onClick={loginUserWithGitHub}
						className="bg-gray-500 hover:bg-gray-700 rounded-md text-white shadow-sm disabled:text-slate-400"
					>
						Sign up with GitHub
					</Button>
				</Stack>
				<Typography
					variant="caption"
					onClick={changePanel}
					className="text-center mt-4 text-xs underline max-w-xs text-blue-400 hover:cursor-pointer"
				>
					{loginPanel
						? "You don't have an account? Then click here to create one!"
						: "You already have an account? Then click here to login!"}
				</Typography>
			</DialogContent>
		</Dialog>
	);
};

export default memo(AuthPanel);
