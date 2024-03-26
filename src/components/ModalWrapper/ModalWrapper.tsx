import { Modal } from "@mui/material";
import { CSSProperties, ReactElement } from "react";
import { BoxWrapper } from "../BoxWrapper/BoxWrapper";
import { TypographyWrapper } from "../TypographyWrapper/TypographyWrapper";

type ModalWrapperProps = {
	isOpen: boolean;
	title: string;
	children: ReactElement;
	onClose: () => void;
};

const style: CSSProperties = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	backgroundColor: "white !important",
	borderRadius: "0.5rem",
	boxShadow: "black  2px",
	padding: "1.5rem",
	paddingBottom: "0.5rem",
};

type ModalTitleProps = {
	title: string;
};

function ModalTitle({ title }: ModalTitleProps) {
	return (
		<TypographyWrapper
			style={{
				marginBottom: "1rem",
				fontWeight: 600,
				fontSize: "1.5rem",
			}}
		>
			{title}
		</TypographyWrapper>
	);
}

export function ModalWrapper({ isOpen, onClose, children: modalBody, title }: ModalWrapperProps) {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}
		>
			<BoxWrapper style={style}>
				<ModalTitle title={title} />
				{modalBody}
			</BoxWrapper>
		</Modal>
	);
}
