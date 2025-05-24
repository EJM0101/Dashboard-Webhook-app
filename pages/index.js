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
    <div className="min-h-screen bg-gray-50 px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-6">Datawarehouse Client Dashboard</h1>

      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">À quoi sert cette application ?</h2>
        <p className="text-gray-600">
          Cette plateforme vous permet de charger des fichiers de données structurées (CSV ou JSON), qui seront traitées et visualisées en temps réel. 
          Elle simule un système d'entrepôt de données moderne, où les utilisateurs peuvent explorer les enregistrements collectés depuis différents systèmes.
          Elle convient aux cas d'usage comme :
        </p>
        <ul className="list-disc pl-6 mt-3 text-gray-600">
          <li>La centralisation des données clients</li>
          <li>Le reporting dynamique pour les analystes</li>
          <li>Le prototypage de dashboards décisionnels</li>
        </ul>
      </section>

      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Téléversement de fichiers</h2>
        <p className="text-gray-500 mb-4">Importez un ou plusieurs fichiers CSV ou JSON contenant des données structurées (par exemple : clients, ventes, etc.).</p>
        <input type="file" multiple accept=".csv,.json" onChange={handleFileChange} className="block w-full text-sm text-gray-600 mb-3" />
        <button onClick={handleUpload} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">Charger les fichiers</button>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Visualisation des données</h2>
        {loading ? (
          <p>Chargement des données...</p>
        ) : (
          <div className="grid gap-4">
            {data.length === 0 ? (
              <p className="text-gray-500">Aucune donnée disponible. Veuillez charger un fichier.</p>
            ) : (
              data.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded border border-gray-200">
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
      </section>
    </div>
  );
}