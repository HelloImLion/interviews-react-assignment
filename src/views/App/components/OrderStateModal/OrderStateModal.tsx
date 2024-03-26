import { useMemo, useState } from "react";
import { ModalWrapper } from "../../../../components/ModalWrapper/ModalWrapper";
import { TypographyWrapper } from "../../../../components/TypographyWrapper/TypographyWrapper";

function getParamsFromUrl(paramName: string) {
	const search = window.location.search;
	const params = new URLSearchParams(search);
	return params.get(paramName);
}

export function OrderStateModal() {
	const [modalState, setModalState] = useState<boolean>(true);
	const orderState = useMemo(() => getParamsFromUrl("state"), []);
	const orderId = useMemo(() => getParamsFromUrl("order_id"), []);

	const modalTitle = orderState === "success" ? "Operation Successfull" : "Error";

	return (
		<ModalWrapper
			title={modalTitle}
			isOpen={modalState && orderState !== null}
			onClose={() => setModalState(false)}
		>
			<div>
				<TypographyWrapper>
					{orderState === "success"
						? "Your payment was processed and the order completed."
						: "Error while trying to process payment"}
				</TypographyWrapper>
				<TypographyWrapper>Your order id is: {orderId}</TypographyWrapper>
			</div>
		</ModalWrapper>
	);
}
