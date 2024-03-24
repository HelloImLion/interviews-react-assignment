import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import { TypographyWrapper } from "../../../components/TypographyWrapper/TypographyWrapper";

type CheckoutItemProps = {
	name: string;
	description: string;
};

export function CheckoutItem({ name, description }: CheckoutItemProps) {
	return (
		<BoxWrapper>
			<TypographyWrapper style={{ display: "inline" }}>{name}:</TypographyWrapper>
			<TypographyWrapper style={{ float: "right", display: "inline" }}>{description}</TypographyWrapper>
			<div
				style={{ width: "100%", height: 1, background: "rgba(0.5,0.5,0.5,0.5)", marginBottom: "0.5rem" }}
			></div>
		</BoxWrapper>
	);
}
