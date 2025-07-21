import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Modal from '../components/Modal';

describe('Modal', () => {
	it('renders children', () => {
		const { getByText } = render(
			<Modal>
				<span>Test Content</span>
			</Modal>,
		);
		expect(getByText('Test Content')).toBeInTheDocument();
	});

	it('has correct role and aria-modal', () => {
		const { getByRole } = render(
			<Modal>
				<div>Content</div>
			</Modal>,
		);
		const dialog = getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-modal', 'true');
	});
});
