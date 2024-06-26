import { Card, CardMedia, CardContent, CardActions, Box } from "@mui/material";
import { ReactNode } from "react";
import { TypographyWrapper } from "../TypographyWrapper/TypographyWrapper";

export type CardWrapperProps = {
	keyValue: string;
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
			key={props.keyValue}
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
				<TypographyWrapper
					gutterBottom
					variant="h6"
					component="div"
				>
					{title}
				</TypographyWrapper>
				<TypographyWrapper
					variant="body2"
					color="text.secondary"
				>
					{description}
				</TypographyWrapper>
			</CardContent>
			<CardActions>
				<TypographyWrapper
					variant="h6"
					component="div"
				>
					{actionDescription}
				</TypographyWrapper>
				<Box flexGrow={1} />
				{renderAction()}
			</CardActions>
		</Card>
	);
}
