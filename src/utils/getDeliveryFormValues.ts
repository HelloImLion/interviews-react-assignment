import { DeliveryFormValues } from "../types/DeliveryFormValues";

export function getDeliveryFormValues(): DeliveryFormValues {
	return {
		customerName: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		deliverySlot: "9-13",
	};
}
