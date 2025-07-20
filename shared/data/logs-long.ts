import type { Log } from '../types/index';

function generateLogs(count: number): Log[] {
	const owners = [
		'Alice',
		'Bob',
		'Charlie',
		'Diana',
		'Eve',
		'Frank',
		'Grace',
		'Hank',
	];
	const texts = [
		'Initial log entry',
		'Second log entry',
		'System updated',
		'Error resolved',
		'User logged in',
		'Database backup completed',
		'Scheduled maintenance',
		'New feature deployed',
	];

	const logs: Log[] = [];

	for (let i = 1; i <= count; i++) {
		const now = new Date();
		logs.push({
			id: i.toString(),
			owner: owners[Math.floor(Math.random() * owners.length)],
			createdAt: new Date(
				now.getTime() - Math.random() * 1_000_000_000,
			).toISOString(),
			updatedAt: now.toISOString(),
			text: texts[Math.floor(Math.random() * texts.length)],
		});
	}

	return logs;
}

export const logs: Log[] = generateLogs(50);
