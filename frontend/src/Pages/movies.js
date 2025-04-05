import React, { useState, useEffect } from "react";

function Movies() {
  const url = `http://localhost:5297/Film`;
  const [movieData, setMovieData] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("authToken");
  const jog = Number(localStorage.getItem("authJog")); // Jogosultság átalakítása számmá
  const userId=localStorage.getItem('authUserId');

  useEffect(() => {
    (async () => {
      try {
        const request = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!request.ok) {
          console.error("Hiba az adatok lekérésekor");
          return;
        }

        const response = await request.json();
        console.log("API válasz:", response);

        setMovieData(response.result ?? response);
      } catch (error) {
        console.error("Hálózati hiba:", error);
      }
    })();
  }, []);

  // ** Törlés kezelése **
  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a filmet?")) return;

    try {
      const deleteRequest = await fetch(`${url}?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!deleteRequest.ok) {
        console.error("Hiba történt a törlés során:");
        return;
      }

      setMovieData((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };

  // ** Szerkesztés megnyitása **
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({ ...movie });
  };

  // ** Input változások kezelése **
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ** Szerkesztett film mentése **
  const handleSaveEdit = async () => {
    try {
      const editRequest = await fetch(`${url}?id=${editingMovie.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!editRequest.ok) {
        console.error("Hiba történt a szerkesztés során:");
        return;
      }

      setMovieData((prevMovies) =>
        prevMovies.map((movie) => (movie.id === editingMovie.id ? formData : movie))
      );

      setEditingMovie(null);
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
    
  };
  const handleReviewSubmit = async (movieId) => {
    const rating = prompt("Adj meg egy értékelést 1 és 10 között:");
    const numericRating = parseInt(rating, 10);

    if (isNaN(numericRating) || numericRating < 1 || numericRating > 10) {
      alert("Érvénytelen érték. Kérlek, számot adj meg 1 és 10 között!");
      return;
    }
    try {
      const reviewRequest = await fetch(`http://localhost:5297/Rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filmId: movieId,
          userId: userId,
          review: numericRating,
        }),
      });
      

      if (!reviewRequest.ok) {
        console.error("Hiba történt az értékelés küldésekor.");
        return;
      }

      alert("Köszönjük az értékelést!");
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-3">
      {movieData.map((movie) => (
        <div
          key={movie.id}
          className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white"
        >
          <div className="p-4">
            <h2 className="text-xl font-bold">{movie.name}</h2>
            <p className="text-gray-400 text-sm">🎭 {movie.genre}</p>
            <p className="text-gray-400 text-sm">🎬 Rendező: {movie.director}</p>
            <p className="text-gray-400 text-sm">📅 Kiadási év: {movie.releaseYear}</p>
            <p className="text-gray-400 text-sm">⌛ Hossz: {movie.length} perc</p>
            <p className="text-gray-400 text-sm">⭐ Értékelések: {movie.reviews}</p>
            <p className="text-gray-400 text-sm">🔞 Korhatár: {movie.ageCertificates}</p>
            <p className="mt-2">{movie.summary}</p>

            {token && jog < 3 && (
              <div className="mt-3 flex gap-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleReviewSubmit(movie.id)}
                >
                  Értékelés
                </button>
              </div>
            )}
            {token && jog == 1 && (
              <div className="mt-3 flex gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleEdit(movie)}
                >
                  Szerkesztés
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleDelete(movie.id)}
                >
                  Törlés
                </button>
              </div>
            )}
            
          </div>
        </div>
      ))}

      {/* **Szerkesztési modal** */}
      {editingMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">🎬 Film szerkesztése</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Film címe"
            />
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Rendező"
            />
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Műfaj"
            />
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Hossz (perc)"
            />
            <input
              type="number"
              name="reviews"
              value={formData.reviews}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Értékelések száma"
            />
            <input
              type="number"
              name="ageCertificates"
              value={formData.ageCertificates}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Korhatár-besorolás"
            />
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Film leírása"
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingMovie(null)}>Mégse</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSaveEdit}>Mentés</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;