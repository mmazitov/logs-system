import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Spinner from '../components/Loader';

describe('Spinner', () => {
	it('renders loader', () => {
		const { getByTestId } = render(<Spinner />);
		expect(getByTestId('loader')).toBeInTheDocument();
	});
});
