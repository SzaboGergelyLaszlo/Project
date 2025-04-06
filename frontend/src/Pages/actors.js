import React, { useState, useEffect } from "react";

function Actors() {
  const url = "http://localhost:5297/Actor";
  const [actorData, setActorData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
    birthday: "",
    oscarAward: false,
    sex: "",
    kep: null, // Új mező a fájl kezelésére
  });
  const [editingActor, setEditingActor] = useState(null);
  const token = localStorage.getItem("authToken");
  const jog = Number(localStorage.getItem("authJog"));

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await fetch(`${url}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Hiba a színészek lekérésekor");
      const result = await response.json();
      setActorData(result.result ?? result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törlöd ezt a színészt?")) return;
    try {
      const response = await fetch(`${url}?id=${id}`, {
        method: "DELETE",
        headers: {
        },
      });
      if (!response.ok) throw new Error("Hiba törlés közben");
      setActorData((prev) => prev.filter((actor) => actor.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (actor) => {
    setEditingActor(actor);
    setFormData({
      ...actor,
      kep: null, // Reseteljük a képfeltöltést szerkesztésnél
    });
  };

  const handleSave = async () => {
    try {
      const method = editingActor ? "PUT" : "POST";
      const endpoint = editingActor ? `${url}?id=${editingActor.id}` : url;

      const form = new FormData();
      form.append("Name", formData.name);
      form.append("Nationality", formData.nationality);
      form.append("Birthday", new Date(formData.birthday).toISOString().split("T")[0]); // "2025.04.06" formátum
      form.append("OscarAward", formData.oscarAward);
      form.append("Sex", formData.sex);

      if (formData.kep) {
        form.append("Kep", formData.kep); // Fájl hozzáadása
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
        },
        body: form,
      });

      if (!response.ok) throw new Error("Hiba mentés közben");

      setEditingActor(null);
      setFormData({
        name: "",
        nationality: "",
        birthday: "",
        oscarAward: false,
        sex: "",
        kep: null, // Reseteljük a képfeltöltést
      });
      fetchActors();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-4">
      {jog <= 2 && (
        <div className="mb-6 bg-gray-700 rounded shadow p-4">
          <h2 className="text-white font-bold text-lg font-bold mb-2">
            {editingActor ? "Színész szerkesztése" : "Új színész hozzáadása"}
          </h2>
          <input
            className="w-full p-2 border mb-2"
            type="text"
            name="name"
            placeholder="Név"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="w-full p-2 border mb-2"
            type="text"
            name="nationality"
            placeholder="Nemzetiség"
            value={formData.nationality}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
          />
          <input
            className="w-full p-2 border mb-2"
            type="date"
            name="birthday"
            value={formData.birthday.split("T")[0]}
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
              checked={formData.oscarAward}
              onChange={(e) => setFormData({ ...formData, oscarAward: e.target.checked })}
              className="mr-2"
            />
            Oscar díjas?
          </label>
          {/* Kép feltöltés */}
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, kep: e.target.files[0] })}
            className="w-full p-2 border mb-2"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Mentés
          </button>
          <br />
          {editingActor && (
            <button
              className="bg-gray-500 px-4 py-2 rounded text-white"
              onClick={() => {
                setEditingActor(null);
                setFormData({ name: "", nationality: "", birthday: "", oscarAward: false, sex: "", kep: null });
              }}
            >
              Mégse
            </button>
          )}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {actorData.map((actor) => (
          <div
            key={actor.id}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white"
          >
            <div className="relative">
        {/* Kép megjelenítése */}
        {actor.profilKép && (
          <img
            src={actor.profilKép}
            alt={actor.name}
            className="w-full h-56 object-cover rounded-t-lg"
          />
            )}
          </div>
            <div className="p-4">
              <h2 className="text-xl font-bold">{actor.name}</h2>
              <p className="text-gray-400 text-sm">{actor.birthday.split("T")[0]}</p>
              <p className="text-gray-400 text-sm">{actor.nationality}</p>
              <p className="text-gray-400 text-sm">
                Oscar díjas: {actor.oscarAward ? "✅" : "❌"}
              </p>
              <p className="text-gray-400 text-sm">Nem: {actor.sex}</p>

              {jog <= 2 && (
                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(actor)}
                  >
                    Szerkesztés
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(actor.id)}
                  >
                    Törlés
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Actors;
