import { Card, CardMedia, CardContent, Typography, CardActions, Box } from "@mui/material";
import { ReactNode } from "react";

export type CardWrapperProps = {
	key: string;
	imageUrl: string;
	title: string;
	description: string;
	actionDescription: string;
	renderAction: () => ReactNode;
};

export function CardWrapper(props: CardWrapperProps) {
	const { imageUrl, title, description } = props;
	const { actionDescription, renderAction } = props;

	return (
		<Card
			key={props.key}
			style={{
				width: "100%",
			}}
		>
			<CardMedia
				component="img"
				height="150"
				image={imageUrl}
			/>
			<CardContent>
				<Typography
					gutterBottom
					variant="h6"
					component="div"
				>
					{title}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
				>
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Typography
					variant="h6"
					component="div"
				>
					{actionDescription}
				</Typography>
				<Box flexGrow={1} />
				{renderAction()}
			</CardActions>
		</Card>
	);
}
