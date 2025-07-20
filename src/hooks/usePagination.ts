import { useMemo, useState } from 'react';

// Custom hook for paginating an array of data
const usePagination = <T>(data: T[], pageSize: number = 10) => {
	// State to keep track of the current page
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate the total number of pages
	const totalPages = Math.ceil(data.length / pageSize);

	// Memoized calculation of the current page's data slice
	const paginatedData = useMemo(() => {
		const start = (currentPage - 1) * pageSize;
		return data.slice(start, start + pageSize);
	}, [data, currentPage, pageSize]);

	// Function to go to a specific page, with bounds checking
	const goToPage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	// Go to the next page
	const nextPage = () => goToPage(currentPage + 1);
	// Go to the previous page
	const prevPage = () => goToPage(currentPage - 1);

	// Return pagination state and controls, memoized for performance
	return useMemo(
		() => ({
			currentPage,
			totalPages,
			pageSize,
			setCurrentPage: goToPage,
			nextPage,
			prevPage,
			paginatedData,
		}),
		[currentPage, totalPages, pageSize, paginatedData],
	);
};

export default usePagination;
