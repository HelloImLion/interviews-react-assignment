import { ModalWrapper } from "../../../../components/ModalWrapper/ModalWrapper";
import { Fragment } from "react";
import { DeliveryForm } from "./DeliveryForm";
import { OrderDetailsList } from "./OrderDetailsList";
import { CheckoutSummaryDetails } from "./CheckoutSummaryDetails";
import { TextButton } from "../../../../components/TextButton/TextButton";
import { CheckoutBillingLoading } from "./CheckoutBillingLoading";
import { CheckoutModalPages } from "../../../../enum/CheckoutModalPages";
import { UseCheckoutState, useCheckout } from "./hooks/useCheckout";
import useValidation from "../../../../hooks/useValidation";
import { ValidationError } from "joi";
import { deliveryFormSchema } from "../../../../validation/deliveryFormSchema";

type CheckoutModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

function getNextCheckoutPage(currentPage: CheckoutModalPages) {
	switch (currentPage) {
		case CheckoutModalPages.OrderDetails:
			return CheckoutModalPages.DeliveryForm;
		case CheckoutModalPages.DeliveryForm:
			return CheckoutModalPages.Summary;
		case CheckoutModalPages.Summary:
			return CheckoutModalPages.Billing;
	}
	return CheckoutModalPages.OrderDetails;
}

function getNextPageComponent({
	currentPage,
	setDeliveryForm,
	deliveryForm,
	errors,
}: UseCheckoutState & { errors: ValidationError | null }) {
	switch (currentPage) {
		case CheckoutModalPages.OrderDetails:
			return <OrderDetailsList />;
		case CheckoutModalPages.DeliveryForm:
			return (
				<DeliveryForm
					setDeliveryForm={setDeliveryForm}
					deliveryForm={deliveryForm}
					errors={errors}
				/>
			);
		case CheckoutModalPages.Summary:
			return <CheckoutSummaryDetails deliveryForm={deliveryForm} />;
		case CheckoutModalPages.Billing:
			return <CheckoutBillingLoading />;
	}
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
	const { validate, errors, resetErrors } = useValidation({ validationSchema: deliveryFormSchema });

	const checkoutState = useCheckout({ isOpen, resetErrors });
	const { setCurrentPage, currentPage } = checkoutState;

	function handleNextPage() {
		let canGoToNextPage = true;
		if (currentPage === CheckoutModalPages.DeliveryForm) {
			canGoToNextPage = validate(checkoutState.deliveryForm);
		}
		if (canGoToNextPage) {
			setCurrentPage(getNextCheckoutPage(currentPage));
		}
	}

	return (
		<ModalWrapper
			isOpen={isOpen}
			onClose={onClose}
			title="Order Details"
		>
			<Fragment>
				{getNextPageComponent({ ...checkoutState, errors })}
				<div style={{ float: "right" }}>
					<TextButton onClick={handleNextPage}>Next</TextButton>
				</div>
			</Fragment>
		</ModalWrapper>
	);
}
