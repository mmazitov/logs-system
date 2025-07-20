import { useCallback, useEffect, useState } from 'react';

const useFetch = <T>(fetcher: () => Promise<T[]>) => {
	const [data, setData] = useState<T[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(() => {
		setLoading(true);
		setError(null);
		fetcher()
			.then(setData)
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, [fetcher]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const refetch = fetchData;

	return { data, loading, error, refetch };
};

export default useFetch;
