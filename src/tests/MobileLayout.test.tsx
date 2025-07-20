import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import MobileLayout from '../components/logsLayout/MobileLayout';

const log = {
	id: '1',
	owner: 'Jane',
	text: 'Mobile log',
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

describe('MobileLayout', () => {
	it('renders without crashing', () => {
		render(
			<MobileLayout
				paginatedData={[]}
				editField={{ id: null, field: null }}
				editValues={{ owner: '', text: '' }}
				handleEditStart={() => {}}
				handleEditChange={() => {}}
				handleSave={() => {}}
				setDeleteId={() => {}}
				setDeleteModalOpen={() => {}}
			/>,
		);
	});

	it('renders log data', () => {
		const { getByText } = render(
			<MobileLayout
				paginatedData={[log]}
				editField={{ id: null, field: null }}
				editValues={{ owner: '', text: '' }}
				handleEditStart={() => {}}
				handleEditChange={() => {}}
				handleSave={() => {}}
				setDeleteId={() => {}}
				setDeleteModalOpen={() => {}}
			/>,
		);
		expect(getByText('Jane')).toBeInTheDocument();
		expect(getByText('Mobile log')).toBeInTheDocument();
	});

	it('calls handleEditStart when edit button is clicked', () => {
		const handleEditStart = vi.fn();
		const { getAllByTitle } = render(
			<MobileLayout
				paginatedData={[log]}
				editField={{ id: null, field: null }}
				editValues={{ owner: '', text: '' }}
				handleEditStart={handleEditStart}
				handleEditChange={() => {}}
				handleSave={() => {}}
				setDeleteId={() => {}}
				setDeleteModalOpen={() => {}}
			/>,
		);
		fireEvent.click(getAllByTitle('Edit')[0]);
		expect(handleEditStart).toHaveBeenCalled();
	});

	it('calls setDeleteId and setDeleteModalOpen when delete button is clicked', () => {
		const setDeleteId = vi.fn();
		const setDeleteModalOpen = vi.fn();
		const { getByTitle } = render(
			<MobileLayout
				paginatedData={[log]}
				editField={{ id: null, field: null }}
				editValues={{ owner: '', text: '' }}
				handleEditStart={() => {}}
				handleEditChange={() => {}}
				handleSave={() => {}}
				setDeleteId={setDeleteId}
				setDeleteModalOpen={setDeleteModalOpen}
			/>,
		);
		fireEvent.click(getByTitle('Delete'));
		expect(setDeleteId).toHaveBeenCalledWith('1');
		expect(setDeleteModalOpen).toHaveBeenCalledWith(true);
	});
});
