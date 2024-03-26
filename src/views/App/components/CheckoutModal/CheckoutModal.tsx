import { ModalWrapper } from "../../../../components/ModalWrapper/ModalWrapper";
import { Fragment } from "react";
import { DeliveryForm } from "./DeliveryForm";
import { OrderDetailsList } from "./OrderDetailsList";
import { CheckoutSummaryDetails } from "./CheckoutSummaryDetails";
import { TextButton } from "../../../../components/TextButton/TextButton";
import { CheckoutBillingLoading } from "./CheckoutBillingLoading";
import { CheckoutModalPages } from "../../../../enum/CheckoutModalPages";
import { useCheckout } from "./hooks/useCheckout";
import useValidation from "../../../../hooks/useValidation";
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

function getNextButtonTitle(currentPage: CheckoutModalPages) {
	switch (currentPage) {
		case CheckoutModalPages.Billing:
			return "";
		case CheckoutModalPages.Summary:
			return "Buy";
	}
	return "Next";
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
	const { validate, errors, resetErrors } = useValidation({ validationSchema: deliveryFormSchema });

	const { setCurrentPage, currentPage, deliveryForm, setDeliveryForm } = useCheckout({ isOpen, resetErrors });

	function handleNextPage() {
		let canGoToNextPage = true;
		if (currentPage === CheckoutModalPages.DeliveryForm) {
			canGoToNextPage = validate(deliveryForm);
		}
		if (canGoToNextPage) {
			setCurrentPage(getNextCheckoutPage(currentPage));
		}
	}

	return (
		<ModalWrapper
			isOpen={isOpen}
			onClose={onClose}
			title="Checkout"
		>
			<Fragment>
				{currentPage === CheckoutModalPages.OrderDetails ? (
					<OrderDetailsList />
				) : currentPage === CheckoutModalPages.DeliveryForm ? (
					<DeliveryForm
						deliveryForm={deliveryForm}
						setDeliveryForm={setDeliveryForm}
						errors={errors}
					/>
				) : currentPage === CheckoutModalPages.Summary ? (
					<CheckoutSummaryDetails deliveryForm={deliveryForm} />
				) : currentPage === CheckoutModalPages.Billing ? (
					<CheckoutBillingLoading />
				) : (
					<div />
				)}
				<div style={{ float: "right" }}>
					<TextButton onClick={handleNextPage}>{getNextButtonTitle(currentPage)}</TextButton>
				</div>
			</Fragment>
		</ModalWrapper>
	);
}
