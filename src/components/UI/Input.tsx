import React from 'react';

interface InputProps {
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	required?: boolean;
	disabled?: boolean;
}

const Input = React.memo(
	({
		name,
		value,
		onChange,
		className = '',
		required = false,
		disabled = false,
	}: InputProps) => {
		return (
			<input
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				disabled={disabled}
				role="textbox"
				aria-required={required}
				aria-invalid={required && value.trim() === ''}
				className={`
				bg-gray-50
				px-2
				py-0.5
				border
				border-gray-300
				rounded
				focus:outline-none
				focus:ring-2
				focus:ring-gray-400
				disabled:opacity-50
				disabled:cursor-not-allowed
				w-full
				text-gray-700
				${className}
			`}
			/>
		);
	},
);

Input.displayName = 'Input';

export default Input;
