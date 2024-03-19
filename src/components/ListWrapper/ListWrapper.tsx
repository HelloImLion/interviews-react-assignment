import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

type ListItemWrapperProps = {
	label: string;
	onClick: () => void;
};

export type ListWrapperProps = {
	items: ListItemWrapperProps[];
};

export function ListWrapper({ items }: ListWrapperProps) {
	return (
		<List className="list-wrapper">
			{items.map(({ label }) => (
				<ListItem
					className="list-wrapper__list-item"
					key={label}
					disablePadding
				>
					<ListItemButton>
						<ListItemText primary={label} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
