import { useState } from "react";
import { ObjectSchema, ValidationError } from "joi";

type UseValidationProps = {
	validationSchema: ObjectSchema;
};
type UseValidationState = {
	errors: ValidationError | null;
	validate: (object: Object) => boolean;
	resetErrors: () => void;
};

const useValidation = ({ validationSchema }: UseValidationProps): UseValidationState => {
	const [errors, setErrors] = useState<ValidationError | null>(null);

	function validate(object: Object) {
		const errors = validationSchema.validate(object, { abortEarly: false }).error ?? null;
		setErrors(errors);
		return errors === null;
	}

	function resetErrors() {
		setErrors(null);
	}

	return {
		errors,
		validate,
		resetErrors,
	};
};

export default useValidation;
