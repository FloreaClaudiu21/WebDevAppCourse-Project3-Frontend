import Main from "./main/Main";
import { getAuth } from "firebase/auth";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { StyledEngineProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { getFirestore } from "firebase/firestore";

const App = () => {
	const authInstance = getAuth(useFirebaseApp());
	const fireInstance = getFirestore(useFirebaseApp());
	return (
		<StyledEngineProvider injectFirst>
			<AuthProvider sdk={authInstance}>
				<FirestoreProvider sdk={fireInstance}>
					<SnackbarProvider maxSnack={3}>
						<Main />
					</SnackbarProvider>
				</FirestoreProvider>
			</AuthProvider>
		</StyledEngineProvider>
	);
};

export default App;
