import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { memo } from "react";

const DeleteAccountDialog = ({
	setLoad,
	deleteDialog,
	setDeleteDialog,
	deleteUser,
	navigate,
}) => {
	return (
		<Dialog
			open={deleteDialog}
			onClose={() => setDeleteDialog(false)}
		>
			<DialogTitle className="text-bold text-center text-red-500">
				Are you sure you want to delete your account?
			</DialogTitle>
			<hr />
			<DialogContent>
				<DialogContentText>
					By clicking on the "AGREE" button you confirm that you are ok with
					losing all your data and losing the account.
				</DialogContentText>
			</DialogContent>
			<hr />
			<DialogActions>
				<Button
					className="text-red-700"
					onClick={() => setDeleteDialog(false)}
				>
					Disagree
				</Button>
				<Button
					onClick={async () => {
						setLoad(true);
						setDeleteDialog(false);
						await deleteUser();
						setLoad(false);
						return;
					}}
					className="text-green-700"
					autoFocus
				>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default memo(DeleteAccountDialog);
