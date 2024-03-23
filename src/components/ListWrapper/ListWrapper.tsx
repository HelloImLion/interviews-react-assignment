import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

type ListItemWrapperProps = {
	label: string;
	onClick: () => void;
	isActive: boolean;
};

export type ListWrapperProps = {
	items: ListItemWrapperProps[];
};

export function ListWrapper({ items }: ListWrapperProps) {
	return (
		<List className="list-wrapper">
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
