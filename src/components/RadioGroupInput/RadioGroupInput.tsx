import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { FormChangeEvent } from "../../types/FormChangeEvent";

type RadioOption = {
	label: string;
	value: string;
};

type RadioInputProps = RadioOption;

type RadioGroupInputProps = {
	radioOptions: RadioOption[];
	activeOption: string;
	onChange: (formChanges: FormChangeEvent) => void;
	fieldName: string;
	label: string;
};

function RadioInput({ label, value }: RadioInputProps) {
	return (
		<FormControlLabel
			value={value}
			control={<Radio />}
			label={label}
		/>
	);
}

export function RadioGroupInput({ radioOptions, activeOption, onChange, fieldName, label }: RadioGroupInputProps) {
	return (
		<FormControl sx={{ margin: "0.5rem" }}>
			<FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
			<RadioGroup
				aria-labelledby="demo-radio-buttons-group-label"
				name="radio-buttons-group"
				value={activeOption}
				onChange={(e) => onChange({ value: e.target.value, field: fieldName })}
			>
				{radioOptions.map((props) => (
					<RadioInput {...props} />
				))}
			</RadioGroup>
		</FormControl>
	);
}
