export interface Log {
	id: string;
	owner: string;
	createdAt: string;
	updatedAt: string;
	text: string;
}

export interface LogsHeading {
	text: string;
	key?: string;
}
