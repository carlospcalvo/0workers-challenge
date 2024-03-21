import { useState } from "react";
import "./App.css";

interface CheckboxProps {
	label: string;
	value: string;
	isChecked: boolean;
	onChange: (value: string, checked: boolean) => void;
}

interface Option {
	label: string;
	value: string;
}

const OPTIONS: Option[] = [
	{
		value: "india",
		label: "India",
	},
	{
		value: "usa",
		label: "USA",
	},
	{
		value: "france",
		label: "France",
	},
];

function App() {
	const [checkedOptions, setCheckedOptions] = useState<Set<string>>(
		new Set()
	);

	const handleCheckboxChange = (value: string, checked: boolean) => {
		if (value === "all") {
			handleSelectAllChange(checked);
			return;
		}

		const newCheckedOptions = new Set(checkedOptions);

		if (checked) {
			newCheckedOptions.add(value);
		} else {
			newCheckedOptions.delete(value);
		}

		setCheckedOptions(newCheckedOptions);
	};

	const handleSelectAllChange = (checked: boolean) => {
		setCheckedOptions(
			checked ? new Set(OPTIONS.map((option) => option.value)) : new Set()
		);
	};

	const isAllSelected = checkedOptions.size === OPTIONS.length;

	return (
		<>
			<h1>0workers React Challenge</h1>
			<form>
				<Checkbox
					label="Select All"
					value="all"
					isChecked={isAllSelected}
					onChange={handleCheckboxChange}
				/>
				{OPTIONS.map((option) => (
					<Checkbox
						key={option.value}
						label={option.label}
						value={option.value}
						isChecked={checkedOptions.has(option.value)}
						onChange={handleCheckboxChange}
					/>
				))}
			</form>
			<p>
				by{" "}
				<a href="https://www.linkedin.com/in/carloscalvonazabal/">
					Carlos Calvo Nazábal
				</a>
			</p>
		</>
	);
}

function Checkbox({ label, value, isChecked, onChange }: CheckboxProps) {
	return (
		<div className="checkbox-container">
			<input
				type="checkbox"
				id={value}
				checked={isChecked}
				onChange={(e) => onChange(value, e.target.checked)}
			/>
			<label htmlFor={value}>{label}</label>
		</div>
	);
}

export default App;
