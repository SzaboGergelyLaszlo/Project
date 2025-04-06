import React, { useState, useEffect } from 'react';

function Directors() {
  const url = 'http://localhost:5297/Director';
  const token = localStorage.getItem('authToken');
  const jog = Number(localStorage.getItem('authJog'));

  const [directors, setDirectors] = useState([]);
  const [filteredDirectors, setFilteredDirectors] = useState([]); // Szűrt rendezők
  const [searchTerm, setSearchTerm] = useState(''); // Keresési szöveg
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    birthday: '',
    oscarAward: false,
    sex: '',
    profilePic: null // A képfeltöltéshez
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Szűrés a keresési szöveg alapján
    if (searchTerm) {
      setFilteredDirectors(directors.filter(director =>
        director.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredDirectors(directors); // Ha nincs keresési szöveg, az összes rendezőt megjelenítjük
    }
  }, [searchTerm, directors]);

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
    if (!formData.name || !formData.nationality || !formData.birthday || !formData.sex) {
      alert("Kérem, töltse ki az összes kötelező mezőt!");
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `${url}?id=${editingId}` : url;

    const form = new FormData();
    form.append("Name", formData.name);
    form.append("Nationality", formData.nationality);
    form.append("Birthday", formData.birthday);
    form.append("OscarAward", formData.oscarAward);
    form.append("Sex", formData.sex);

    // Ha van kép, azt is hozzáadjuk a FormData-hoz
    if (formData.profilePic) {
      form.append("Kep", formData.profilePic);
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form // FormData küldése, hogy a fájlokat is el tudjuk küldeni
      });

      if (!res.ok) {
        console.error('Hiba a mentés közben:', res.statusText);
        return;
      }

      await fetchData(); // Frissítjük a rendezők listáját
      setFormData({
        name: '',
        nationality: '',
        birthday: '',
        oscarAward: false,
        sex: '',
        profilePic: null // Kép nullázása
      });
      setEditingId(null);
    } catch (error) {
      console.error('Hálózati hiba:', error);
    }
  };

  const handleEdit = (director) => {
    setFormData({
      name: director.name,
      nationality: director.nationality,
      birthday: director.birthday.slice(0, 10), // Dátum formátum: YYYY-MM-DD
      oscarAward: director.oscarAward,
      sex: director.sex,
      profilePic: null // Reseteljük a képet szerkesztéskor
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

          {/* Kép feltöltése */}
          <input
            type="file"
            className="w-full mb-2 p-2 rounded"
            onChange={(e) => setFormData({ ...formData, profilePic: e.target.files[0] })}
          />

          <div className="mt-3">
            <button className="bg-green-600 px-4 py-2 rounded text-white" onClick={handleSubmit}>
              Mentés
            </button>
            <br />
            <br />
            {editingId && (
              <button
                className="bg-gray-500 px-4 py-2 rounded text-white"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', nationality: '', birthday: '', oscarAward: false, sex: '', profilePic: null });
                }}
              >
                Mégse
              </button>
            )}
          </div>
        </div>
      )}
      <br />
      {/* Kereső sáv */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 rounded"
          placeholder="Keresés név alapján"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredDirectors.map((director) => (
          <div key={director.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white p-4">
            <div className="relative">
              {/* Kép megjelenítése */}
              {director.profilKép && (
                <img
                  src={director.profilKép}
                  alt={director.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
              )}
            </div>
            <h2 className="text-xl font-bold">{director.name}</h2>
            <p className="text-gray-400 text-sm">Nemzetiség: {director.nationality}</p>
            <p className="text-gray-400 text-sm">Született: {new Date(director.birthday).toLocaleDateString()}</p>
            <p className="text-gray-400 text-sm">Oscar-díjas: {director.oscarAward ? '✅' : '❌'}</p>
            <p className="text-gray-400 text-sm">Nem: {director.sex}</p>

            {/* Ha van profilkép, megjelenítjük */}
            {director.profilePic && (
              <img src={director.profilePic} alt={`${director.name} profilja`} className="w-full h-auto rounded" />
            )}

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
