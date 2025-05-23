import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

    const evtSource = new EventSource("/api/stream");
    evtSource.onmessage = () => {
      fetchData(); // refresh on webhook event
    };

    return () => evtSource.close();
  }, []);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    fetchData();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <h1 className="text-2xl font-bold col-span-full">Tableau de bord client</h1>

      <div className="col-span-full bg-blue-50 border border-blue-300 p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Comment utiliser cette plateforme ?</h2>
        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>Préparez un fichier <strong>.csv</strong> ou <strong>.json</strong> contenant des données clients.</li>
          <li>Chaque client doit avoir au moins : <code>name</code>, <code>email</code>, <code>last_order</code>.</li>
          <li>Utilisez le champ ci-dessous pour téléverser un ou plusieurs fichiers.</li>
          <li>Les données s'affichent automatiquement après quelques secondes.</li>
        </ul>
      </div>

      <div className="col-span-full bg-gray-100 p-4 rounded-xl shadow">
        <label className="block mb-2 font-medium">Sélectionnez vos fichiers :</label>
        <input type="file" multiple onChange={handleFileChange} className="mb-2" />
        <Button onClick={handleUpload}>Uploader les données</Button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        data.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">Aucune donnée disponible. Veuillez uploader un fichier.</p>
        ) : (
          data.map((client, i) => (
            <Card key={i}>
              <CardContent>
                <h2 className="text-lg font-semibold">{client.name}</h2>
                <p>Email : {client.email}</p>
                <p>Dernière commande : {client.last_order}</p>
              </CardContent>
            </Card>
          ))
        )
      )}
    </div>
  );
}
