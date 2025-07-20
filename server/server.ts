import cors from 'cors';
import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { logs } from '../shared/data/logs-long';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// GET endpoint to return all logs
app.get('/logs', (_req: Request, res: Response) => {
	console.log('GET /logs called'); // Debug log
	res.json(logs);
});

// Example POST endpoint for adding a new log (commented out)
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

// PUT endpoint to edit a log by id
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

// DELETE endpoint to remove a log by id
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

// ESM compatibility for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory
app.use(express.static(path.resolve(__dirname, '../dist')));

// Fallback for React Router: serve index.html for all other routes
app.get('*', (_req, res) => {
	res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
