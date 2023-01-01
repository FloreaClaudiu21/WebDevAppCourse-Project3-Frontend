import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { memo } from "react";

const ClearTextAreaDialog = ({ textareaRef, clearDialog, setClearDialog }) => {
	const { enqueueSnackbar } = useSnackbar();
	return (
		<Dialog
			open={clearDialog}
			onClose={() => setClearDialog(false)}
		>
			<DialogTitle className="text-bold text-center text-black">
				Are you sure you want to clear the text area?
			</DialogTitle>
			<hr />
			<DialogContent>
				<DialogContentText>
					By clicking on the "AGREE" button you confirm that you are ok with
					losing all the text you entered in the text area.
				</DialogContentText>
			</DialogContent>
			<hr />
			<DialogActions>
				<Button
					className="text-red-700"
					onClick={() => setClearDialog(false)}
				>
					Disagree
				</Button>
				<Button
					onClick={() => {
						textareaRef.current.value = "";
						setClearDialog(false);
						enqueueSnackbar("Text area have been cleared successfully!", {
							variant: "success",
							autoHideDuration: 2500,
						});
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

export default memo(ClearTextAreaDialog);
