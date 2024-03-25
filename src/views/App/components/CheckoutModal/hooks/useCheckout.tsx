import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { DeliveryFormValues } from "../../../../../types/DeliveryFormValues";
import { CheckoutModalPages } from "../../../../../enum/CheckoutModalPages";
import { getDeliveryFormValues } from "../../../../../utils/getDeliveryFormValues";

type UseCheckoutProps = {
	isOpen: boolean;
	resetErrors: () => void;
};

export type UseCheckoutState = {
	deliveryForm: DeliveryFormValues;
	currentPage: CheckoutModalPages;
	setDeliveryForm: Dispatch<SetStateAction<DeliveryFormValues>>;
	setCurrentPage: Dispatch<SetStateAction<CheckoutModalPages>>;
};

export function useCheckout({ isOpen, resetErrors }: UseCheckoutProps): UseCheckoutState {
	const [deliveryForm, setDeliveryForm] = useState<DeliveryFormValues>(getDeliveryFormValues());
	const [currentPage, setCurrentPage] = useState<CheckoutModalPages>(CheckoutModalPages.OrderDetails);

	useEffect(() => {
		if (isOpen === false) {
			setDeliveryForm(getDeliveryFormValues());
			setCurrentPage(CheckoutModalPages.OrderDetails);
			resetErrors();
		}
	}, [isOpen]);

	return {
		deliveryForm,
		setDeliveryForm,
		currentPage,
		setCurrentPage,
	};
}
