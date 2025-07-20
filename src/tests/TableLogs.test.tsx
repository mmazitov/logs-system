import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import TableLogs from '../components/TableLogs';

describe('TableLogs', () => {
	it('renders without crashing', () => {
		render(<TableLogs />);
	});

	it('renders TableLogs container', () => {
		const { container } = render(<TableLogs />);
		expect(container.querySelector('div')).toBeInTheDocument();
	});
});
