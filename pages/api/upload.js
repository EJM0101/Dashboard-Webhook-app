// pages/api/upload.js

import formidable from 'formidable';
import { setClients } from '@/lib/memoryStorage';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erreur upload :", err);
      return res.status(500).json({ error: 'Erreur lors de l’upload' });
    }

    const uploadedFiles = Array.isArray(files.files) ? files.files : [files.files];
    let data = [];

    for (const file of uploadedFiles) {
      if (file.originalFilename.endsWith('.json')) {
        const content = fs.readFileSync(file.filepath, 'utf-8');
        data = data.concat(JSON.parse(content));
      } else if (file.originalFilename.endsWith('.csv')) {
        const rows = await parseCSV(file.filepath);
        data = data.concat(rows);
      }
    }

    setClients(data);
    return res.status(200).json({ message: 'Données reçues', count: data.length });
  });
}

// Fonction pour parser un fichier CSV
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}