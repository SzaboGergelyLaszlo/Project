import React, { useState, useEffect } from "react";

function Actors() {
  const url = "http://localhost:5297/Actor";
  const [actorData, setActorData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
    birthday: "",
    oscarAward: false,
    sex: ""
  });
  const [editingActor, setEditingActor] = useState(null);
  const token = localStorage.getItem("authToken");
  const jog = Number(localStorage.getItem("authJog"));

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await fetch(`${url}?token=${token}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
    setFormData({ ...actor });
  };

  const handleSave = async () => {
    try {
      const method = editingActor ? "PUT" : "POST";
      const endpoint = editingActor ? `${url}?id=${editingActor.id}` : url;

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Hiba mentés közben");

      setEditingActor(null);
      setFormData({
        name: "",
        nationality: "",
        birthday: "",
        oscarAward: false,
        sex: ""
      });
      fetchActors();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-4">
      {jog <= 2 && (
        <div className="mb-6 bg-white rounded shadow p-4">
          <h2 className="text-lg font-bold mb-2">
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
          <input
            className="w-full p-2 border mb-2"
            type="text"
            name="sex"
            placeholder="Nem"
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          />
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={formData.oscarAward}
              onChange={(e) => setFormData({ ...formData, oscarAward: e.target.checked })}
              className="mr-2"
            />
            Oscar díjas?
          </label>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Mentés
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {actorData.map((actor) => (
          <div
            key={actor.id}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white"
          >
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