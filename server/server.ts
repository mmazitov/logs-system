import cors from 'cors';
import express, { type Request, type Response } from 'express';

import { logs } from '../shared/data/logs-long.ts';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/logs', (req: Request, res: Response) => {
	console.log('GET /logs called'); // Debug log

	res.json(logs);
});

// app.post('/logs', (req: Request, res: Response) => {
// 	const { owner, text } = req.body;
// 	const newLog: Log = {
// 		id: Date.now().toString(),
// 		owner,
// 		createdAt: new Date().toISOString(),
// 		updatedAt: new Date().toISOString(),
// 		text,
// 	};
// 	logs.push(newLog);
// 	res.status(201).json(newLog);
// });

app.put('/logs/:id', (req: Request, res: Response) => {
	const { id } = req.params;
	const { owner, text } = req.body;
	const log = logs.find((log) => log.id === id);
	if (log) {
		log.owner = owner;
		log.text = text;
		log.updatedAt = new Date().toISOString();
		res.json(log);
	} else {
		res.status(404).json({ error: 'Log not found' });
	}
});

app.delete('/logs/:id', (req: Request, res: Response) => {
	const { id } = req.params;
	const index = logs.findIndex((log) => log.id === id);
	if (index !== -1) {
		const deletedLog = logs.splice(index, 1);
		res.json(deletedLog[0]);
	} else {
		res.status(404).json({ error: 'Log not found' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
