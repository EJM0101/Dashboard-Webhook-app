import fs from 'fs';
import path from 'path';

export function getClients() {
  const dir = path.join(process.cwd(), '@/upload');
  let clients = [];

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (file.endsWith('.json')) {
      const content = fs.readFileSync(filePath, 'utf8');
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          clients.push(...parsed);
        } else {
          clients.push(parsed);
        }
      } catch (e) {
        console.warn(`Fichier JSON invalide : ${file}`);
      }
    } else if (file.endsWith('.csv')) {
      const csv = fs.readFileSync(filePath, 'utf8');
      const rows = csv.split('\n').filter(Boolean);
      const headers = rows[0].split(',');
      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        const obj = {};
        headers.forEach((h, j) => obj[h.trim()] = values[j].trim());
        clients.push(obj);
      }
    }
  }

  return clients;
}
