import { type CSSProperties, useState } from 'react';
import { BounceLoader } from 'react-spinners';

// Custom CSS override for the spinner
const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
};

// Spinner component displays a loading spinner using BounceLoader
const Spinner = () => {
	const [loading] = useState(true);
	const [color] = useState('#43b0a3');
	return (
		<>
			<BounceLoader
				color={color}
				loading={loading}
				cssOverride={override}
				size={150}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</>
	);
};

export default Spinner;
