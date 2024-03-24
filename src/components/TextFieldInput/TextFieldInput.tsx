import { TextField } from "@mui/material";
import { FormChangeEvent } from "../../types/FormChangeEvent";

type TextFieldInputProps = {
	label: string;
	textValue: string;
	onChange: (formChanges: FormChangeEvent) => void;
	fieldName: string;
	errorMessage?: string;
};

export function TextFieldInput({ label, textValue, fieldName, onChange, errorMessage }: TextFieldInputProps) {
	return (
		<TextField
			value={textValue}
			onChange={(e) => onChange({ value: e.target.value, field: fieldName })}
			sx={{ margin: "0.5rem" }}
			label={label}
			fullWidth
			error={errorMessage !== undefined}
			helperText={errorMessage}
		/>
	);
}
