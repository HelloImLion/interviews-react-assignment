import { Box } from "@mui/material";
import { CSSProperties } from "react";

type BoxWrapperProps = {
	style?: CSSProperties;
} & React.PropsWithChildren;

export function BoxWrapper({ children, style }: BoxWrapperProps) {
	return <Box sx={style}>{children}</Box>;
}
