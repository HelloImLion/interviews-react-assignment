import { Typography } from "@mui/material";
import { CSSProperties, PropsWithChildren } from "react";

type TypographyWrapperProps = {
	style?: CSSProperties;
} & PropsWithChildren;

export function TypographyWrapper({ style, children }: TypographyWrapperProps) {
	return <Typography sx={style}>{children}</Typography>;
}
