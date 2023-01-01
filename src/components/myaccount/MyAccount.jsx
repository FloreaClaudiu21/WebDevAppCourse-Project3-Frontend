import {
	ArrowDropDown,
	DeleteForever,
	EmailOutlined,
	Save,
	TextFormatOutlined,
	Upgrade,
} from "@mui/icons-material";
import {
	Avatar,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FilledInput,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { memo, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import DeleteAccountDialog from "./DeleteAccountDialog";

const MyAccount = () => {
	const passRef = useRef();
	const emailRef = useRef();
	const repassRef = useRef();
	const errMsgRef = useRef();
	const usernameRef = useRef();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [load, setLoad] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const {
		UserData,
		status,
		loading,
		isAdmin,
		isLogged,
		checkUsername,
		retrieve_admin,
		forgotPass,
		saveUser,
		addAdmin,
		removeAdmin,
		deleteUser,
	} = useUser({
		passRef: passRef,
		emailRef: emailRef,
		usernameRef: usernameRef,
		errMsgRef: errMsgRef,
		repassRef: repassRef,
	});
	useEffect(() => {
		retrieve_admin();
	}, [retrieve_admin]);
	const isLoading = status === "loading" || loading;
	if (isLoading) return <></>;
	if (!isLogged) {
		enqueueSnackbar("You must be logged in to access the account page!", {
			variant: "warning",
		});
		navigate("/");
		return <></>;
	}
	return (
		<Dialog open={true}>
			<Helmet>
				<title>Brief history of famous rock bands | My Account</title>
			</Helmet>
			<DialogTitle className="font-bold text-center text-black">
				My Account Information
			</DialogTitle>
			<hr />
			<DialogContent className="flex flex-col gap-1">
				<Stack className="gap-1">
					<Stack className="my-4 justify-center place-items-center">
						<Avatar
							className="h-16 w-16 shadow-md"
							src={UserData.user.photoURL}
						/>
					</Stack>
					<FormControl
						fullWidth
						variant="filled"
					>
						<InputLabel htmlFor="filled-adornment-email">
							Email Address
						</InputLabel>
						<FilledInput
							disabled
							fullWidth
							type={"email"}
							margin="dense"
							inputRef={emailRef}
							id="filled-adornment-email"
							value={UserData?.user.email}
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
						<InputLabel htmlFor="filled-adornment-user">Username</InputLabel>
						<FilledInput
							fullWidth
							type={"text"}
							margin="dense"
							inputRef={usernameRef}
							id="filled-adornment-user"
							onChange={checkUsername}
							defaultValue={UserData?.user.displayName}
							endAdornment={
								<InputAdornment position="end">
									<TextFormatOutlined />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl
						fullWidth
						variant="filled"
					>
						<InputLabel htmlFor="filled-adornment-role">Role</InputLabel>
						<FilledInput
							disabled
							fullWidth
							type={"text"}
							margin="dense"
							id="filled-adornment-role"
							value={isAdmin ? "Admin" : "User"}
							endAdornment={
								<InputAdornment
									position="end"
									className="mr-1"
								>
									<Tooltip
										arrow
										placement="top"
										title={
											!isAdmin
												? "Upgrade to the admin role"
												: "Downgrade back to user role"
										}
									>
										<IconButton
											onClick={async () => {
												setLoad(true);
												let changed = false;
												if (isAdmin) {
													changed = await removeAdmin();
												} else {
													changed = await addAdmin();
												}
												setLoad(false);
												if (changed) navigate(0);
												return;
											}}
											edge="end"
										>
											{!isAdmin ? <Upgrade /> : <ArrowDropDown />}
										</IconButton>
									</Tooltip>
								</InputAdornment>
							}
						/>
					</FormControl>
					<button
						onClick={forgotPass}
						className="text-blue-500 w-[200px] py-1 pr-0 rounded-sm place-self-end text-xs text-right hover:cursor-pointer group"
					>
						<span className="text-xs group-disabled:hover:no-underline hover:underline">
							Want a new password?
						</span>
					</button>
					<Typography
						ref={errMsgRef}
						className="text-red-500 text-xs mt-2 mb-2 break-all"
					></Typography>
					<Button
						disabled={load}
						onClick={async () => {
							setLoad(true);
							const saved = await saveUser();
							setLoad(false);
							if (saved) navigate("/");
						}}
						startIcon={<Save />}
						className="bg-black hover:bg-black8 rounded-md text-white hover:text-gray-300 disabled:bg-gray-600 disabled:text-slate-400"
					>
						Save
					</Button>
					<Button
						disabled={load}
						onClick={() => setDeleteDialog(true)}
						startIcon={<DeleteForever />}
						className="bg-red-700 hover:bg-red-500 rounded-md text-white disabled:bg-gray-600 disabled:text-slate-400"
					>
						DELETE ACCOUNT
					</Button>
				</Stack>
			</DialogContent>
			<hr />
			<DialogActions>
				<Button
					onClick={() => {
						navigate("/");
					}}
				>
					Back to main page
				</Button>
			</DialogActions>
			{load && (
				<Stack className=" bg-black7 justify-center place-items-center absolute top-0 w-full h-full">
					<CircularProgress size={50} />
				</Stack>
			)}
			<DeleteAccountDialog
				setLoad={setLoad}
				deleteUser={deleteUser}
				navigate={navigate}
				deleteDialog={deleteDialog}
				setDeleteDialog={setDeleteDialog}
			/>
		</Dialog>
	);
};

export default memo(MyAccount);
