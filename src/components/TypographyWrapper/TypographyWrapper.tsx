import { Typography } from "@mui/material";
import { DefaultComponentProps, OverridableTypeMap } from "@mui/material/OverridableComponent";
import { CSSProperties, PropsWithChildren } from "react";

type TypographyWrapperProps<T extends OverridableTypeMap> = {
	style?: CSSProperties;
} & PropsWithChildren &
	DefaultComponentProps<T>;

export function TypographyWrapper<T extends OverridableTypeMap>({
	style,
	children,
	...props
}: TypographyWrapperProps<T>) {
	return (
		<Typography
			sx={style}
			{...props}
		>
			{children}
		</Typography>
	);
}
