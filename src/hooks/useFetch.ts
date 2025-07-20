import { useCallback, useEffect, useState } from 'react';

// Custom hook for fetching data asynchronously
const useFetch = <T>(fetcher: () => Promise<T[]>) => {
	// State to store fetched data
	const [data, setData] = useState<T[]>([]);
	// State to indicate loading status
	const [loading, setLoading] = useState(true);
	// State to store any error message
	const [error, setError] = useState<string | null>(null);

	// Function to fetch data and handle loading/error states
	const fetchData = useCallback(() => {
		setLoading(true);
		setError(null);
		fetcher()
			.then(setData)
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, [fetcher]);

	// Fetch data on mount and when fetcher changes
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	// Expose a refetch function to manually trigger fetching
	const refetch = fetchData;

	// Return data, loading, error, and refetch function
	return { data, loading, error, refetch };
};

export default useFetch;
