// pages/api/data.js

import { getClients } from '@/lib/memoryStorage';

export default function handler(req, res) {
  const clients = getClients();
  res.status(200).json(clients);
}