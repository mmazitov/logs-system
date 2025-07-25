export function formatDate(isoString: string): string {
	const date = new Date(isoString);
	return date.toLocaleString('uk-UA', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}
