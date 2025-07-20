import { useEffect, useState } from 'react';

// Custom hook to get the current window width and update on resize
const useWindowWidth = () => {
	// Store the current window width in state
	const [width, setWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		// Handler to update the width state when the window is resized
		const handleResize = () => setWidth(window.innerWidth);
		// Add event listener for window resize
		window.addEventListener('resize', handleResize);
		// Cleanup: remove event listener on unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Return the current window width
	return width;
};

export default useWindowWidth;
