import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { CSSProperties } from "react";

type ListItemWrapperProps = {
	label: string;
	onClick: () => void;
	isActive: boolean;
};

export type ListWrapperProps = {
	items: ListItemWrapperProps[];
	containerStyle?: CSSProperties;
};

export function ListWrapper({ items, containerStyle }: ListWrapperProps) {
	return (
		<List
			className="list-wrapper"
			sx={containerStyle}
		>
			{items.map(({ label, isActive, onClick }) => (
				<ListItem
					className={"list-wrapper__list-item"}
					key={label}
					disablePadding
					onClick={onClick}
					sx={{
						background: isActive ? "rgba(25, 118, 210, 0.2)" : "",
					}}
				>
					<ListItemButton>
						<ListItemText primary={label} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
