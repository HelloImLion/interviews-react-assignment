import { ValidationError } from "joi";

type GetMessageFromErrorParams = {
	errors: ValidationError | null;
	fieldName: string;
};

export function getMessageFromError({ errors, fieldName }: GetMessageFromErrorParams) {
	return errors?.details.find((d) => d.path[0] === fieldName)?.message;
}
