import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable'; // Import correct

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const uploadDir = path.join(process.cwd(), '/upload');

  // Crée le dossier s'il n'existe pas
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Crée le formulaire
  const form = new IncomingForm({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  // Parse la requête
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erreur de parsing :', err);
      return res.status(500).json({ error: 'Erreur lors du parsing du fichier' });
    }

    console.log('Fichiers reçus :', files);
    return res.status(200).json({ message: 'Fichier(s) uploadé(s) avec succès', files });
  });
}