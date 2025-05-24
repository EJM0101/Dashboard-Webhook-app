import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

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
    const f = e.target.files[0];
    setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return alert("Veuillez sélectionner un fichier");

    const reader = new FileReader();
    reader.onload = async (e) => {
      let content = e.target.result;
      let jsonData = [];

      try {
        if (file.name.endsWith('.json')) {
          jsonData = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          jsonData = parseCSV(content);
        } else {
          return alert("Fichier non supporté (CSV ou JSON uniquement)");
        }

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData),
        });

        const result = await res.json();
        console.log("Réponse :", result);
        fetchData();
      } catch (err) {
        console.error("Erreur de lecture :", err);
        alert("Erreur de lecture du fichier");
      }
    };

    reader.readAsText(file);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>

      <input type="file" accept=".csv,.json" onChange={handleFileChange} />
      <button onClick={handleUpload} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
        Envoyer
      </button>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="mt-4 space-y-2">
          {data.length === 0 ? (
            <p>Aucune donnée disponible.</p>
          ) : (
            data.map((c, i) => (
              <div key={i} className="border p-2 rounded bg-gray-100">
                <strong>{c.name}</strong> — {c.email} (commande : {c.last_order})
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}