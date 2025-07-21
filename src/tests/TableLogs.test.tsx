import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';

import TableLogs from '../components/TableLogs';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
	mockedAxios.get.mockResolvedValue({ data: [] });
});

describe('TableLogs', () => {
	it('renders without crashing', async () => {
		await waitFor(() => render(<TableLogs />));
	});

	it('renders TableLogs container', async () => {
		const { container } = render(<TableLogs />);
		await waitFor(() => {
			expect(container.querySelector('div')).toBeInTheDocument();
		});
	});
});
