export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch('https://api.chutes.ai/v1/hidream/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CHUTES_API_KEY}`,
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
