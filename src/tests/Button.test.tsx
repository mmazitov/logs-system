import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Button from '../components/UI/Button';

describe('Button', () => {
	it('renders children', () => {
		const { getByText } = render(
			<Button onClick={() => {}} title="btn">
				Click me
			</Button>,
		);
		expect(getByText('Click me')).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		const handleClick = vi.fn();
		const { getByRole } = render(
			<Button onClick={handleClick} title="btn">
				Click
			</Button>,
		);
		fireEvent.click(getByRole('button'));
		expect(handleClick).toHaveBeenCalled();
	});

	it('is disabled when disabled prop is true', () => {
		const { getByRole } = render(
			<Button onClick={() => {}} title="btn" disabled>
				Disabled
			</Button>,
		);
		expect(getByRole('button')).toBeDisabled();
	});
});
