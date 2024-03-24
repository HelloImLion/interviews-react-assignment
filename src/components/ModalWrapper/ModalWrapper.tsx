import { Box, Modal, Typography } from "@mui/material";
import { ReactElement } from "react";

type ModalWrapperProps = {
	isOpen: boolean;
	title: string;
	children: ReactElement;
	onClose: () => void;
};

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "white !important",
	borderRadius: "0.5rem",
	boxShadow: "black  2px",
	pt: 2,
	px: 4,
	pb: 3,
};

type ModalTitleProps = {
	title: string;
};

function ModalTitle({ title }: ModalTitleProps) {
	return (
		<Typography
			marginBottom={"1rem"}
			fontWeight={600}
			fontSize={"1.5rem"}
		>
			{title}
		</Typography>
	);
}

export function ModalWrapper({ isOpen, onClose, children: modalBody, title }: ModalWrapperProps) {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}
		>
			<Box sx={style}>
				<ModalTitle title={title} />
				{modalBody}
			</Box>
		</Modal>
	);
}
