import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Spinner from '../components/Loader';

describe('Spinner', () => {
	it('renders loader', () => {
		const { getByTestId } = render(<Spinner />);
		expect(getByTestId('loader')).toBeInTheDocument();
	});
});
