import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { BoxWrapper } from "../../../../components/BoxWrapper/BoxWrapper";
import { useCart } from "../../../../context/useCart";
import { config } from "../../../../config/config";
import { TypographyWrapper } from "../../../../components/TypographyWrapper/TypographyWrapper";

export function CheckoutBillingLoading() {
	const { cart } = useCart();
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const currentButton = buttonRef?.current ?? null;
		if (currentButton !== null) {
			currentButton.click();
		}
	}, [buttonRef]);

	return (
		<div>
			<TypographyWrapper>Redirecting to Payment Processing Page</TypographyWrapper>
			<BoxWrapper
				style={{
					maxWidth: 0,
					maxHeight: 0,
					overflow: "hidden",
				}}
			>
				<form
					action={config.PAYMENT_API.BASE_URL + config.PAYMENT_API.CHECKOUT_ENDPOINT}
					method="POST"
				>
					<input
						name="products"
						type="text"
						value={JSON.stringify(cart.items)}
					/>
					<button
						type="submit"
						id="checkout-submit"
						ref={buttonRef}
					>
						Checkout
					</button>
				</form>
			</BoxWrapper>
		</div>
	);
}
