import { Dispatch, SetStateAction } from "react";
import { DeliveryFormValues } from "../../../../types/DeliveryFormValues";
import { FormChangeEvent } from "../../../../types/FormChangeEvent";
import { RadioGroupInput } from "../../../../components/RadioGroupInput/RadioGroupInput";
import { TextFieldInput } from "../../../../components/TextFieldInput/TextFieldInput";
import { ValidationError } from "joi";
import { getMessageFromError } from "../../../../utils/getMessageFromError";

type DeliveryFormProps = {
	deliveryForm: DeliveryFormValues;
	setDeliveryForm: Dispatch<SetStateAction<DeliveryFormValues>>;
	errors: ValidationError | null;
};

export function DeliveryForm({ deliveryForm, setDeliveryForm, errors }: DeliveryFormProps) {
	function handleFormChange({ field, value }: FormChangeEvent) {
		setDeliveryForm((df) => ({ ...df, [field]: value }));
	}

	return (
		<div>
			<TextFieldInput
				textValue={deliveryForm.customerName}
				onChange={handleFormChange}
				label="Customer Name"
				fieldName="customerName"
				errorMessage={getMessageFromError({ errors, fieldName: "customerName" })}
			/>
			<TextFieldInput
				textValue={deliveryForm.address}
				onChange={handleFormChange}
				label="Address"
				fieldName="address"
				errorMessage={getMessageFromError({ errors, fieldName: "address" })}
			/>
			<TextFieldInput
				textValue={deliveryForm.city}
				onChange={handleFormChange}
				label="City"
				fieldName="city"
				errorMessage={getMessageFromError({ errors, fieldName: "city" })}
			/>
			<TextFieldInput
				textValue={deliveryForm.state}
				onChange={handleFormChange}
				label="State / Country"
				fieldName="state"
				errorMessage={getMessageFromError({ errors, fieldName: "state" })}
			/>
			<TextFieldInput
				textValue={deliveryForm.zipCode}
				onChange={handleFormChange}
				label="Postal / Zip Code"
				fieldName="zipCode"
				errorMessage={getMessageFromError({ errors, fieldName: "zipCode" })}
			/>
			<RadioGroupInput
				activeOption={deliveryForm.deliverySlot}
				onChange={handleFormChange}
				label="Delivery Time Slot"
				fieldName="deliverySlot"
				radioOptions={[
					{ label: "9-13", value: "9-13" },
					{ label: "14-17", value: "14-17" },
					{ label: "17-20", value: "17-20" },
				]}
			/>
		</div>
	);
}
