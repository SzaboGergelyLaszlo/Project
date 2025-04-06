import React, { useState, useEffect } from 'react';

function Users() {
  const url = 'http://localhost:5297/User';
  const token = localStorage.getItem('authToken');
  const jog = Number(localStorage.getItem('authJog'));

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    felhasznaloNev: '',
    salt: '',
    hash: '',
    email: '',
    sex: '',
    role: 2,
    profilePic: null // Új mező a képfeltöltéshez
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
        console.error("Hiba a felhasználók lekérésekor");
        return;
      }

      const data = await res.json();
      setUsers(data.result);
    } catch (err) {
      console.error("Hálózati hiba:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a felhasználót?")) return;

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
    // Input validálás
    if (!formData.name || !formData.felhasznaloNev || !formData.email || !formData.sex) {
      alert("Kérem, töltse ki az összes kötelező mezőt!");
      return;
    }
  
    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId 
      ? `http://localhost:5297/User/updateUser?id=${editingId}` 
      : url; // Ha van id, akkor PUT és az update endpointot hívjuk meg, egyébként POST a szokásos URL.
  
    // FormData létrehozása
    const form = new FormData();
    form.append("Name", formData.name);
    form.append("FelhasznaloNev", formData.felhasznaloNev);
    form.append("Hash", formData.hash);
    form.append("Email", formData.email);
    form.append("Sex", formData.sex);
    form.append("Role", formData.role);
    form.append("Joined", new Date().toISOString());
  
    // Kép hozzáadása, ha van
    if (formData.profilePic) {
      form.append("Kep", formData.profilePic);
    }
  
    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form // FormData használata a fájlok küldéséhez
      });
  
      if (!res.ok) {
        console.error('Hiba a mentés közben:', res.statusText);
        return;
      }
  
      await fetchData(); // Adatok frissítése
      setFormData({
        name: '',
        felhasznaloNev: '',
        salt: '',
        hash: '',
        email: '',
        sex: '',
        role: 2,
        profilePic: null // Reseteljük a képet
      });
      setEditingId(null);
    } catch (error) {
      console.error('Hálózati hiba:', error);
    }
  };
  

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      felhasznaloNev: user.felhasznaloNev,
      salt: user.salt,
      hash: user.hash,
      email: user.email,
      sex: user.sex,
      role: user.role,
      profilePic: null // Reseteljük a képet szerkesztéskor
    });
    setEditingId(user.id);
  };

  return (
    
    <div className="p-6">
      {jog === 1 && (
        <div className="mt-8 bg-gray-700 p-4 rounded-lg">
          <h2 className="text-white font-bold text-lg mb-2">{editingId ? 'Felhasználó szerkesztése' : 'Új felhasználó hozzáadása'}</h2>
          <input
            className="w-full mb-2 p-2 rounded"
            placeholder="Név"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="w-full mb-2 p-2 rounded"
            placeholder="Felhasználónév"
            value={formData.felhasznaloNev}
            onChange={(e) => setFormData({ ...formData, felhasznaloNev: e.target.value })}
          />
          <input
            className="w-full mb-2 p-2 rounded"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            className="w-full mb-2 p-2 rounded"
            placeholder="Jelszó"
            value={formData.hash}
            onChange={(e) => setFormData({ ...formData, hash: e.target.value })}
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
          <select
            className="w-full mb-2 p-2 rounded"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: Number(e.target.value) })}
          >
            <option value={2}>Normál felhasználó</option>
            <option value={1}>Admin</option>
          </select>

          {/* Kép feltöltés */}
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
                  setFormData({
                    name: '',
                    felhasznaloNev: '',
                    salt: '',
                    hash: '',
                    email: '',
                    sex: '',
                    role: 2,
                    profilePic: null
                  });
                }}
              >
                Mégse
              </button>
            )}
          </div>
        </div>
      )}
      <br />
      <div className="flex flex-wrap gap-4">
        {users.map((user) => (
          <div key={user.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white p-4">
              <div className="relative">
        {/* Kép megjelenítése */}
        {user.profilKép && (
          <img
            src={user.profilKép}
            alt={user.name}
            className="w-full h-56 object-cover rounded-t-lg"
          />
            )}
          </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-400 text-sm">Felhasználónév: {user.felhasznaloNev}</p>
            <p className="text-gray-400 text-sm">Email: {user.email}</p>
            <p className="text-gray-400 text-sm">Nem: {user.sex}</p>
            <p className="text-gray-400 text-sm">Csatlakozott: {new Date(user.joined).toLocaleDateString()}</p>
            <p className="text-gray-400 text-sm">Szerep: {user.role === 1 ? 'Admin' : 'Normál felhasználó'}</p>
            {user.profilePic && (
              <img
                src={`http://localhost:5297/Images/${user.profilePic}`}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover mb-2"
              />
            )}
            {jog === 1 && (
              <div className="mt-2 flex gap-2">
                <button className="bg-blue-600 px-3 py-1 rounded" onClick={() => handleEdit(user)}>Szerkesztés</button>
                <button className="bg-red-600 px-3 py-1 rounded" onClick={() => handleDelete(user.id)}>Törlés</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
