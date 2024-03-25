import { useEffect, useRef, useState } from "react";
import { BoxWrapper } from "../../../../components/BoxWrapper/BoxWrapper";
import { useCart } from "../../../../context/useCart";
import { config } from "../../../../config/config";
import { TypographyWrapper } from "../../../../components/TypographyWrapper/TypographyWrapper";

/*
	!---IMPORTANT---!
	Products are passed as is to the checkout gateway because there is no backend.
	The price of each product is passed to the gateway just to replicate the prices shown in the Application.
	In a real application only ids should have been sent.
	!---IMPORTANT---!
*/

export function CheckoutBillingLoading() {
	const [isError, setIsError] = useState<boolean>(false);

	const { cart, finishOrder } = useCart();
	const buttonRef = useRef<HTMLButtonElement>(null);

	async function finalizeOrder() {
		const currentButton = buttonRef?.current ?? null;
		if (currentButton === null) return;
		try {
			await finishOrder();
			currentButton.click();
		} catch (err) {
			setIsError(true);
		}
	}

	useEffect(() => {
		finalizeOrder();
	}, [buttonRef?.current]);

	return (
		<div>
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
			{isError ? (
				<TypographyWrapper>
					Could not process the order. Please try again after a few minutes.
				</TypographyWrapper>
			) : (
				<>
					<TypographyWrapper>Redirecting to Payment Processing Page</TypographyWrapper>
				</>
			)}
		</div>
	);
}
