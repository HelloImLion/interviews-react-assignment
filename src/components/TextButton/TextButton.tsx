import { Button } from "@mui/material";

type TextButtonProps = {
	onClick: () => void;
} & React.PropsWithChildren;

export function TextButton({ children, onClick }: TextButtonProps) {
	return (
		<Button
			variant="text"
			onClick={onClick}
		>
			{children}
		</Button>
	);
}
