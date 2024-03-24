import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import { useCart } from "../../../context/useCart";

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
			<Typography>Redirecting to Payment Processing Page</Typography>
			<BoxWrapper
				style={{
					maxWidth: 0,
					maxHeight: 0,
					overflow: "hidden",
				}}
			>
				<form
					action="http://localhost:3001/checkout"
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
