import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DeleteModal from '../components/modals/DeleteModal';

describe('DeleteModal', () => {
	it('renders and shows title and buttons', () => {
		render(<DeleteModal onCancel={() => {}} onDelete={() => {}} />);
		expect(screen.getByText('Remove log?')).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
		expect(screen.getByText('Delete')).toBeInTheDocument();
	});

	it('calls onCancel when Cancel button is clicked', () => {
		const onCancel = vi.fn();
		render(<DeleteModal onCancel={onCancel} onDelete={() => {}} />);
		fireEvent.click(screen.getByText('Cancel'));
		expect(onCancel).toHaveBeenCalled();
	});

	it('calls onDelete when Delete button is clicked', () => {
		const onDelete = vi.fn();
		render(<DeleteModal onCancel={() => {}} onDelete={onDelete} />);
		fireEvent.click(screen.getByText('Delete'));
		expect(onDelete).toHaveBeenCalled();
	});
});
