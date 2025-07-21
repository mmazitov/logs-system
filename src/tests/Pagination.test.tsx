import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import Pagination from '../components/UI/Pagination';

describe('Pagination', () => {
	it('renders current and total pages', () => {
		const { getByText } = render(
			<Pagination
				currentPage={2}
				totalPages={5}
				prevPage={() => {}}
				nextPage={() => {}}
			/>,
		);
		expect(getByText('Page 2 of 5')).toBeInTheDocument();
	});

	it('calls prevPage and nextPage', () => {
		const prev = jest.fn();
		const next = jest.fn();
		const { getByTitle } = render(
			<Pagination
				currentPage={2}
				totalPages={5}
				prevPage={prev}
				nextPage={next}
			/>,
		);
		fireEvent.click(getByTitle('Previous page'));
		fireEvent.click(getByTitle('Next page'));
		expect(prev).toHaveBeenCalled();
		expect(next).toHaveBeenCalled();
	});

	it('disables prev button on first page', () => {
		const { getByTitle } = render(
			<Pagination
				currentPage={1}
				totalPages={5}
				prevPage={() => {}}
				nextPage={() => {}}
			/>,
		);
		expect(getByTitle('Previous page')).toBeDisabled();
	});
});
