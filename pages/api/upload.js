import { setClients } from '@/lib/memoryStorage';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const data = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Format attendu: tableau JSON de clients' });
    }

    setClients(data);
    return res.status(200).json({ message: 'Données enregistrées', count: data.length });
  } catch (err) {
    console.error("Erreur lors du traitement :", err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}