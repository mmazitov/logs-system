import { useMemo, useState } from 'react';

const usePagination = <T>(data: T[], pageSize: number = 10) => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(data.length / pageSize);

	const paginatedData = useMemo(() => {
		const start = (currentPage - 1) * pageSize;
		return data.slice(start, start + pageSize);
	}, [data, currentPage, pageSize]);

	const goToPage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	const nextPage = () => goToPage(currentPage + 1);
	const prevPage = () => goToPage(currentPage - 1);

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
