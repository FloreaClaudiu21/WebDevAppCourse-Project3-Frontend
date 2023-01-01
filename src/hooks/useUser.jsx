import {
	createUserWithEmailAndPassword,
	GithubAuthProvider,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from "firebase/auth";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {
	useAuth,
	useFirestore,
	useSigninCheck,
} from "reactfire";
import {
	HOST_URL,
	prettier_error,
	validate_email,
	validate_password,
	validate_text,
	validate_username,
} from "../script";
import useIsAdmin from "./useIsAdmin";

const useUser = ({
	setForgot,
	setAuthPanel,
	loginPanel,
	setLoginPanel,
	emailRef,
	usernameRef,
	passRef,
	repassRef,
	errMsgRef,
}) => {
	const auth = useAuth();
	const firestore = useFirestore();
	const [error, setError] = useState("");
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const { status, data: UserData } = useSigninCheck();
	const { isAdmin, retrieve_admin } = useIsAdmin(
		UserData,
		setError,
		setLoading
	);
	const isLogged = UserData && UserData.signedIn;
	///////////////////////////////////////////////
	const success_variant = {
		variant: "success",
		autoHideDuration: 3000,
	};
	const error_variant = {
		variant: "error",
		autoHideDuration: 3000,
	};
	const checkMail = () => {
		let text = emailRef.current.value;
		if (!validate_text(text)) {
			setForgot(true);
			errMsgRef.current.innerHTML = "";
			return false;
		}
		if (!validate_email(text)) {
			setForgot(true);
			errMsgRef.current.innerHTML = "❌ Error: Invalid email address.";
			return true;
		}
		setForgot(false);
		errMsgRef.current.innerHTML = "";
		return false;
	};
	const checkUsername = () => {
		let text = usernameRef.current.value;
		if (!validate_text(text)) {
			errMsgRef.current.innerHTML = "";
			return false;
		}
		if (!validate_username(text)) {
			errMsgRef.current.innerHTML = "❌ Error: Invalid username.";
			return true;
		}
		errMsgRef.current.innerHTML = "";
		return false;
	};
	const checkPassword = () => {
		let text = passRef.current.value;
		if (!validate_text(text)) {
			errMsgRef.current.innerHTML = "";
			return false;
		}
		if (!validate_password(text)) {
			errMsgRef.current.innerHTML =
				"❌ Error: Password must contain 1 special character and 1 number.";
			return true;
		}
		errMsgRef.current.innerHTML = "";
		return false;
	};
	const checkRePassword = () => {
		let text1 = passRef.current.value;
		let text = repassRef.current.value;
		if (!validate_text(text)) {
			errMsgRef.current.innerHTML = "";
			return false;
		}
		if (text.match(text1)) {
			errMsgRef.current.innerHTML = "❌ Error: Passwords must match";
			return true;
		}
		errMsgRef.current.innerHTML = "";
		return false;
	};
	const checkInputs = () => {
		const pass = passRef.current.value;
		const email = emailRef.current.value;
		/////////////////////////////////////
		if (loginPanel) {
			if (!validate_text(email)) {
				errMsgRef.current.innerHTML = "❌ Error: Empty email address.";
				return false;
			}
			if (!validate_email(email)) {
				errMsgRef.current.innerHTML = "❌ Error: Invalid email address.";
				return false;
			}
			if (!validate_text(pass)) {
				errMsgRef.current.innerHTML = "❌ Error: Empty password field.";
				return false;
			}
			if (!validate_password(pass)) {
				errMsgRef.current.innerHTML =
					"❌ Error: Password must contain 1 special character and 1 number.";
				return false;
			}
			errMsgRef.current.innerHTML = "";
			return true;
		} else {
			const user = usernameRef.current.value;
			///////////////////////////////////////
			if (!validate_text(user)) {
				errMsgRef.current.innerHTML = "❌ Error: Empty username field.";
				return false;
			}
			if (!validate_username(user)) {
				errMsgRef.current.innerHTML = "❌ Error: Invalid username.";
				return false;
			}
			if (!validate_text(email)) {
				errMsgRef.current.innerHTML = "❌ Error: Empty email address.";
				return false;
			}
			if (!validate_email(email)) {
				errMsgRef.current.innerHTML = "❌ Error: Invalid email address.";
				return false;
			}
			if (!validate_text(pass)) {
				errMsgRef.current.innerHTML = "❌ Error: Empty password field.";
				return false;
			}
			if (!validate_password(pass)) {
				errMsgRef.current.innerHTML =
					"❌ Error: Password must contain 1 special character and 1 number.";
				return false;
			}
			if (!checkRePassword()) {
				errMsgRef.current.innerHTML = "❌ Error: Passwords must match";
				return false;
			}
			errMsgRef.current.innerHTML = "";
			return true;
		}
	};
	const loginUserWithGoogle = () => {
		setLoading(true);
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((UserData) => {
				setLoginPanel(true);
				setAuthPanel(false);
				let user = UserData.user;
				setDoc(doc(firestore, "users", user.uid), {
					uid: user.uid,
					username: user.displayName,
					email: user.email,
					photo: user.photoURL,
				});
				enqueueSnackbar(
					"Logged in successfully as user: " + UserData.user.email,
					{
						variant: "success",
					}
				);
			})
			.catch((reason) => {
				errMsgRef.current.innerHTML = "❌ Error: " + prettier_error(reason);
				return;
			})
			.finally(() => setLoading(false));
		return;
	};
	const loginUserWithGitHub = () => {
		setLoading(true);
		signInWithPopup(auth, new GithubAuthProvider())
			.then((UserData) => {
				setLoginPanel(true);
				setAuthPanel(false);
				let user = UserData.user;
				setDoc(doc(firestore, "users", user.uid), {
					uid: user.uid,
					username: user.displayName,
					email: user.email,
					photo: user.photoURL,
				});
				enqueueSnackbar(
					"Logged in successfully as user: " + UserData.user.email,
					{
						variant: "success",
					}
				);
			})
			.catch((reason) => {
				errMsgRef.current.innerHTML = "❌ Error: " + prettier_error(reason);
				return;
			})
			.finally(() => setLoading(false));
		return;
	};
	const loginUser = () => {
		const email = emailRef.current.value;
		const password = passRef.current.value;
		///////////////////////////////////////
		if (!checkInputs()) {
			return;
		}
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((UserData) => {
				setAuthPanel(false);
				let user = UserData.user;
				setDoc(doc(firestore, "users", user.uid), {
					uid: user.uid,
					username: user.displayName,
					email: user.email,
					photo: user.photoURL,
				});
				enqueueSnackbar(
					"Logged in successfully as user: " + UserData.user.email,
					success_variant
				);
			})
			.catch((reason) => {
				errMsgRef.current.innerHTML = "❌ Error: " + prettier_error(reason);
				return;
			})
			.finally(() => setLoading(false));
		return;
	};
	const saveUser = async () => {
		let text = usernameRef.current.value;
		if (!validate_text(text)) {
			errMsgRef.current.innerHTML = "❌ Error: Empty username field.";
			return false;
		}
		if (!validate_username(text)) {
			errMsgRef.current.innerHTML = "❌ Error: Invalid username.";
			return false;
		}
		try {
			await updateProfile(UserData.user, { displayName: text });
			await updateDoc(doc(firestore, "users", UserData.user.uid), {
				username: text,
			});
			enqueueSnackbar(
				"Successfully updated the user information",
				success_variant
			);
			return true;
		} catch (reason) {
			errMsgRef.current.innerHTML = "❌ Error: " + prettier_error(reason);
			return false;
		}
	};
	const registerUser = () => {
		const email = emailRef.current.value;
		const password = passRef.current.value;
		const username = usernameRef.current.value;
		///////////////////////////////////////////
		if (!checkInputs()) {
			return;
		}
		setLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((UserData) => {
				updateProfile(UserData.user, {
					displayName: username,
				}).then(() => {
					setAuthPanel(false);
					enqueueSnackbar(
						"User have been created successfully, logged in as user: " +
							UserData.user.email,
						{
							variant: "success",
						}
					);
				});
				let user = UserData.user;
				setDoc(doc(firestore, "users", user.uid), {
					data: {
						uid: user.uid,
						username: username,
						email: email,
						photo: user.photoURL,
					},
				});
			})
			.catch((reason) => {
				errMsgRef.current.innerHTML = "❌ Error: " + prettier_error(reason);
				return;
			})
			.finally(() => setLoading(false));
	};
	const forgotPass = async () => {
		const email = emailRef.current.value;
		const actionCodeSettings = {
			url: "webdevapp-project3-rockbands.netlify.app",
			handleCodeInApp: false,
		};
		try {
			await sendPasswordResetEmail(auth, email, actionCodeSettings);
			enqueueSnackbar(
				"Reset link have been send to the email: " + email,
				success_variant
			);
		} catch (err) {
			enqueueSnackbar(
				"Reset link couldn't be send! Error: " + prettier_error(err),
				error_variant
			);
		}
		return;
	};
	const addAdmin = async () => {
		let added = false;
		try {
			let response = await fetch(HOST_URL + "/api/v1/admins", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mode: "create",
					uid: UserData.user.uid,
				}),
			});
			response = await response.json();
			if (response.error) {
				enqueueSnackbar(
					"Couldn't add the admin permissions! Error: " + response.response,
					error_variant
				);
			}
			if (!response.error) {
				enqueueSnackbar(
					"Your admin permissions have been added successfully!",
					success_variant
				);
				added = true;
			}
		} catch ({ message }) {
			enqueueSnackbar(
				"Couldn't add the admin permissions! Error: " + message,
				error_variant
			);
		}
		return added;
	};
	const removeAdmin = async () => {
		let removed = false;
		try {
			let response = await fetch(HOST_URL + "/api/v1/admins", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mode: "delete",
					uid: UserData.user.uid,
				}),
			});
			response = await response.json();
			if (response.error) {
				enqueueSnackbar(
					"Couldn't remove the admin permissions! Error: " + response.response,
					error_variant
				);
			}
			if (!response.error) {
				enqueueSnackbar(
					"Your admin permissions have been removed successfully!",
					success_variant
				);
				removed = true;
			}
		} catch ({ message }) {
			enqueueSnackbar(
				"Couldn't remove the admin permissions! Error: " + message,
				error_variant
			);
		}
		return removed;
	};
	const deleteUser = async () => {
		try {
			const uid = UserData.user.uid;
			await UserData.user.delete();
			await deleteDoc(doc(firestore, "users", uid));
			enqueueSnackbar("Your account have been deleted!", success_variant);
			return true;
		} catch (reason) {
			enqueueSnackbar(
				"Couldn't delete account! Error: " + prettier_error(reason),
				error_variant
			);
			return false;
		}
	};
	const signOut = async () => {
		try {
			await auth.signOut();
			enqueueSnackbar("Successfully logged out!", success_variant);
		} catch (err) {
			enqueueSnackbar("Couldn't log out! Error: " + err.message, error_variant);
		}
		return;
	};
	return {
		error,
		setError,
		status,
		UserData,
		isAdmin,
		isLogged,
		loginUserWithGitHub,
		loginUserWithGoogle,
		registerUser,
		loginUser,
		signOut,
		forgotPass,
		loading,
		checkMail,
		checkPassword,
		checkUsername,
		checkInputs,
		checkRePassword,
		retrieve_admin,
		saveUser,
		addAdmin,
		removeAdmin,
		deleteUser,
	};
};

export default useUser;
