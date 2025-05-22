export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = () => {
    res.write(`data: ${JSON.stringify({ refresh: true })}\n\n`);
  };

  const intervalId = setInterval(sendEvent, 10000);
  req.on('close', () => clearInterval(intervalId));
}
