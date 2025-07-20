import React from 'react';

interface ButtonProps {
	onClick: () => void;
	className?: string;
	children: React.ReactNode;
	title: string;
	disabled?: boolean;
	hidden?: boolean;
}

const Button = React.memo(
	({
		onClick,
		className = '',
		children,
		title,
		disabled = false,
		hidden = false,
	}: ButtonProps) => {
		return (
			<button
				type="button"
				onClick={onClick}
				className={`
				hover:bg-gray-200
				focus:outline-none
				focus:ring-2
				focus:ring-gray-400
				disabled:opacity-50
				disabled:cursor-not-allowed
				transition-colors
				disabled:hover:bg-transparent
				duration-300
				p-2
				rounded
				text-gray-500
				cursor-pointer
				${className}
			`}
				title={title}
				disabled={disabled}
				aria-disabled={disabled}
				hidden={hidden}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = 'Button';

export default Button;
