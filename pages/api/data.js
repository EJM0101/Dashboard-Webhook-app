import { getClients } from '@/lib/data';

export default function handler(req, res) {
  const clients = getClients();
  res.status(200).json(clients);
}
