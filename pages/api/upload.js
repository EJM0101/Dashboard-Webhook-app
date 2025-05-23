// pages/api/upload.js
import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable'; // Import correct pour Formidable v3+

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const uploadDir = path.join(process.cwd(), '../upload');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = new IncomingForm({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erreur upload:', err);
      return res.status(500).json({ error: 'Erreur de parsing' });
    }

    console.log('Fichier reçu :', files);
    return res.status(200).json({ message: 'Fichier uploadé', files });
  });
}