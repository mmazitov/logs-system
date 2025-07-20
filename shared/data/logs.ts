import type { Log } from '../types/index';

export const logs: Log[] = [
	{
		id: '1',
		owner: 'Aliceasdasdasd',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		text: 'Initial log entry',
	},
	{
		id: '2',
		owner: 'Bob',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		text: 'Second log entry',
	},
];
