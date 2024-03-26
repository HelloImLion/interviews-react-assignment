import { Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

type SnackBarVariant = "success" | "error";

type SendSnackbarMessageParams = {
	message: string;
	variant: SnackBarVariant;
};

type SnackbarContextState = {
	sendMessage: ({ message, variant }: SendSnackbarMessageParams) => void;
};

const SnackbarContext = createContext<SnackbarContextState | undefined>(undefined);

export function SnackbarProvider({ children }: React.PropsWithChildren) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [snackbarVariant, setSnackbarVariant] = useState<SnackBarVariant>("success");

	function onSnackbarClose() {
		setIsOpen(false);
		setMessage("");
	}

	function sendMessage({ message, variant }: SendSnackbarMessageParams) {
		setMessage(message);
		setSnackbarVariant(variant);
		setIsOpen(true);
	}

	return (
		<SnackbarContext.Provider
			value={{
				sendMessage,
			}}
		>
			<Snackbar
				open={isOpen}
				autoHideDuration={5000}
				onClose={onSnackbarClose}
				message={message}
				sx={{
					".MuiPaper-root": {
						backgroundColor:
							snackbarVariant === "error" ? "red" : snackbarVariant === "success" ? "green" : "",
						color: "white",
					},
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
			/>
			{children}
		</SnackbarContext.Provider>
	);
}

export function useSnackbar() {
	const context = useContext(SnackbarContext);
	if (!context) {
		throw new Error("useSnackbar must be used within a CartProvider");
	}
	return context;
}
