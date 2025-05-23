// pages/api/upload.js
import fs from 'fs';
import path from 'path';
import formidable from 'formidable'; // Importer le module complet, pas IncomingForm

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const uploadDir = path.join(process.cwd(), '/upload');

  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Créer un objet Formidable avec options
  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  // Analyser la requête
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erreur upload:', err);
      return res.status(500).json({ error: 'Erreur de parsing' });
    }

    console.log('Fichier reçu :', files);
    return res.status(200).json({ message: 'Fichier uploadé avec succès', files });
  });
}