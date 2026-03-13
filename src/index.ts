import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'agentshub-api' });
});

app.listen(PORT, () => {
  console.log(`AgentsHub API running on port ${PORT}`);
});
