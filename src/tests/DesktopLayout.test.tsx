import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DesktopLayout from '../components/logsLayout/DesktopLayout';

const log = {
	id: '1',
	owner: 'John',
	text: 'Test log',
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

describe('DesktopLayout', () => {
	it('renders without crashing', () => {
		render(
			<DesktopLayout
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
			<DesktopLayout
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
		expect(getByText('John')).toBeInTheDocument();
		expect(getByText('Test log')).toBeInTheDocument();
	});

	it('calls handleEditStart when edit button is clicked', () => {
		const handleEditStart = vi.fn();
		const { getAllByTitle } = render(
			<DesktopLayout
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
			<DesktopLayout
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
