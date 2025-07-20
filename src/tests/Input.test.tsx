import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Input from '../components/UI/Input';

describe('Input', () => {
	it('renders with value', () => {
		const { getByRole } = render(
			<Input name="test" value="hello" onChange={() => {}} />,
		);
		expect(getByRole('textbox')).toHaveValue('hello');
	});

	it('calls onChange when changed', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(
			<Input name="test" value="" onChange={handleChange} />,
		);
		fireEvent.change(getByRole('textbox'), { target: { value: 'abc' } });
		expect(handleChange).toHaveBeenCalled();
	});

	it('is disabled when disabled prop is true', () => {
		const { getByRole } = render(
			<Input name="test" value="" onChange={() => {}} disabled />,
		);
		expect(getByRole('textbox')).toBeDisabled();
	});
});
