import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/data');
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!files.length) return alert("Veuillez sélectionner des fichiers");

    let allData = [];

    for (let file of files) {
      const content = await file.text();
      if (file.name.endsWith('.json')) {
        try {
          const json = JSON.parse(content);
          allData = allData.concat(json);
        } catch {
          alert("Erreur dans le fichier JSON : " + file.name);
          return;
        }
      } else if (file.name.endsWith('.csv')) {
        const rows = parseCSV(content);
        allData = allData.concat(rows);
      }
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allData),
    });

    const result = await res.json();
    console.log("Résultat :", result);
    fetchData();
  };

  const parseCSV = (text) => {
    const rows = text.trim().split('\n');
    const headers = rows[0].split(',');
    return rows.slice(1).map(row => {
      const values = row.split(',');
      let obj = {};
      headers.forEach((h, i) => obj[h.trim()] = values[i].trim());
      return obj;
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Tableau de bord</h1>

      <div className="mb-4">
        <input type="file" multiple accept=".csv,.json" onChange={handleFileChange} className="block w-full text-sm" />
        <button onClick={handleUpload} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Envoyer les fichiers</button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid gap-4">
          {data.length === 0 ? (
            <p>Aucune donnée disponible.</p>
          ) : (
            data.map((item, index) => (
              <div key={index} className="bg-white shadow rounded p-4 border">
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key} :</strong> {value}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}