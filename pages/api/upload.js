import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const uploadDir = path.join(process.cwd(), '/upload');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erreur de parsing :', err);
      return res.status(500).json({ error: 'Erreur de parsing' });
    }

    return res.status(200).json({ message: 'Fichiers uploadés', files });
  });
}
