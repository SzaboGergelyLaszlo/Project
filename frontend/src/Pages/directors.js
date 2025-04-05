import React, { useState, useEffect } from 'react';

function Directors() {
  const url = 'http://localhost:5297/Director';
  const token = localStorage.getItem('authToken');
  const jog = Number(localStorage.getItem('authJog'));

  const [directors, setDirectors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    birthday: '',
    oscarAward: false,
    sex: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        console.error("Hiba a rendezők lekérésekor");
        return;
      }

      const data = await res.json();
      setDirectors(data.result);
    } catch (err) {
      console.error("Hálózati hiba:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a rendezőt?")) return;

    try {
      const res = await fetch(`${url}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error("Törlési hiba:", err);
    }
  };

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `${url}?id=${editingId}` : url;

    const payload = {
      name: formData.name,
      nationality: formData.nationality,
      birthday: new Date(formData.birthday).toISOString(),
      oscarAward: formData.oscarAward,
      sex: formData.sex
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error('Hiba a mentés közben:', res.statusText);
        return;
      }

      await fetchData();
      setFormData({ name: '', nationality: '', birthday: '', oscarAward: false, sex: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Hálózati hiba:', error);
    }
  };

  const handleEdit = (director) => {
    setFormData({
      name: director.name,
      nationality: director.nationality,
      birthday: director.birthday.slice(0, 10),
      oscarAward: director.oscarAward,
      sex: director.sex
    });
    setEditingId(director.id);
  };

  return (
    
   <div className="p-6">
    {jog === 1 && (
        <div className="mt-8 bg-gray-700 p-4 rounded-lg">
          <h2 className="text-white font-bold text-lg mb-2">{editingId ? 'Rendező szerkesztése' : 'Új rendező hozzáadása'}</h2>
          <input
            className="w-full mb-2 p-2 rounded"
            placeholder="Név"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="w-full mb-2 p-2 rounded"
            placeholder="Nemzetiség"
            value={formData.nationality}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
          />
          <input
            type="date"
            className="w-full mb-2 p-2 rounded"
            value={formData.birthday}
            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
          />
          <select
            className="w-full mb-2 p-2 rounded"
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          >
            <option value="">Nem kiválasztása</option>
            <option value="Male">Férfi</option>
            <option value="Female">Nő</option>
          </select>
          <label className="text-white">
            <input
              type="checkbox"
              className="mr-2"
              checked={formData.oscarAward}
              onChange={(e) => setFormData({ ...formData, oscarAward: e.target.checked })}
            />
            Oscar-díjas
          </label>
          <div className="mt-3">
            <button className="bg-green-600 px-4 py-2 rounded text-white" onClick={handleSubmit}>
              Mentés
            </button>
            <br></br>
            <br></br>
            {editingId && (
              <button
                className="bg-gray-500 px-4 py-2 rounded text-white"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', nationality: '', birthday: '', oscarAward: false, sex: '' });
                }}
              >
                Mégse
              </button>
            )}
          </div>
        </div>
      )}
      <br></br>
      <div className="flex flex-wrap gap-4">
        {directors.map((director) => (
          <div key={director.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold">{director.name}</h2>
            <p className="text-gray-400 text-sm">Nemzetiség: {director.nationality}</p>
            <p className="text-gray-400 text-sm">Született: {new Date(director.birthday).toLocaleDateString()}</p>
            <p className="text-gray-400 text-sm">Oscar-díjas: {director.oscarAward ? '✅' : '❌'}</p>
            <p className="text-gray-400 text-sm">Nem: {director.sex}</p>
            {jog === 1 && (
              <div className="mt-2 flex gap-2">
                 <button className="bg-blue-600 px-3 py-1 rounded" onClick={() => handleEdit(director)}>Szerkesztés</button>
                <button className="bg-red-600 px-3 py-1 rounded" onClick={() => handleDelete(director.id)}>Törlés</button>
              </div>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Directors;
