import { CheckoutItem } from "./CheckoutItem";
import { OrderDetailsList } from "./OrderDetailsList";
import { DeliveryFormValues } from "../../../types/DeliveryFormValues";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import { TypographyWrapper } from "../../../components/TypographyWrapper/TypographyWrapper";

type CheckoutSummaryDetailsProps = {
	deliveryForm: DeliveryFormValues;
};

const formValuesDictionary: { [key: string]: string } = {
	address: "Address",
	city: "City",
	state: "Country / State",
	customerName: "Customer Name",
	zipCode: "Postal / Zip Code",
	deliverySlot: "Delivery Slot",
};

export function CheckoutSummaryDetails({ deliveryForm }: CheckoutSummaryDetailsProps) {
	return (
		<BoxWrapper>
			<TypographyWrapper style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Products</TypographyWrapper>
			<OrderDetailsList />
			<TypographyWrapper style={{ fontWeight: 600, marginBottom: "0.5rem", marginTop: "1rem" }}>
				Address Info
			</TypographyWrapper>
			{Object.entries(deliveryForm).map(([name, value]) => (
				<CheckoutItem
					name={formValuesDictionary[name]}
					description={value}
				/>
			))}
		</BoxWrapper>
	);
}
