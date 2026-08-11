export default function handler(req, res) {
  // Handle Meta Verification Handshake (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === 'MY_SECRET_TOKEN') {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('Verification failed');
    }
  }

  // Handle Incoming Messages (POST)
  if (req.method === 'POST') {
    console.log('Incoming message:', JSON.stringify(req.body));
    return res.status(200).send('EVENT_RECEIVED');
  }

  return res.status(405).send('Method Not Allowed');
}
