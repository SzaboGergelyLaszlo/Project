import React, { useState, useEffect } from "react";

function Movies() {
  const url = `http://localhost:5297/Film`;
  const [movieData, setMovieData] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("authToken");
  const jog = Number(localStorage.getItem("authJog")); // Jogosultság átalakítása számmá
  const userId=localStorage.getItem('authUserId');
  const [ratedMovies, setRatedMovies] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [directors, setDirectors] = useState([]);
  const [newMovieData, setNewMovieData] = useState({
    name: "",
    director: "",
    genre: "",
    releaseYear: "",
    length: 0,
    reviews: 0,
    ageCertificates: 0,
    summary: ""
    });


  useEffect(() => {
    (async () => {
      try {
        const [moviesRes, reviewsRes] = await Promise.all([
          fetch(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`http://localhost:5297/User/id?id=${userId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
  
        if (!moviesRes.ok || !reviewsRes.ok) {
          console.error("Hiba a filmek vagy értékelések lekérésekor");
          return;
        }
  
        const moviesData = await moviesRes.json();
        const reviewsData = await reviewsRes.json();
  
        setMovieData(moviesData.result ?? moviesData);
        setUserReviews(reviewsData.result ?? reviewsData);

        
      } catch (error) {
        console.error("Hálózati hiba:", error);
      }
    })();
  }, []);



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

  useEffect(() => {
    (async () => {
      try {
        const [moviesRes, directorsRes] = await Promise.all([
          fetch(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch('http://localhost:5297/Director', {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
  
        if (!moviesRes.ok || !directorsRes.ok) {
          console.error("Hiba a filmek vagy rendezők lekérésekor");
          return;
        }
  
        const moviesData = await moviesRes.json();
        const directorsData = await directorsRes.json();
  
        setMovieData(moviesData.result ?? moviesData);
  
        // Rendezők neveinek lekérése
        const directors = directorsData.result ?? directorsData;
        setDirectors(directors);
        console.log(directors);
      } catch (error) {
        console.error("Hálózati hiba:", error);
      }
    })();
  }, []);

/*Film hozzáadása */
  const handleAddMovie = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMovieData),
      });
  
      if (!response.ok) {
        console.error("Hiba a film hozzáadásakor");
        console.log(newMovieData);
        return;
      }
  
      const addedMovie = await response.json();
      setMovieData((prev) => [...prev, addedMovie.result ?? addedMovie]);
  
      setIsAddingMovie(false);
      setNewMovieData({
        name: "",
        director: "",
        genre: "",
        releaseYear:"",
        length: 0,
        reviews: 0,
        ageCertificates: 0,
        summary: ""
      });
      window.location.reload();
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };

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
  
      if (reviewRequest.ok) {
        alert("Köszönjük az értékelést!");
        setRatedMovies((prev) => [...prev, movieId]);
        setUserReviews((prev) => [...prev, { filmId: movieId, review: numericRating }]);
      }
  
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };

  return (
    
    <div className="flex flex-wrap justify-center gap-3 mt-3">
      {token && jog === 1 && (
        <div className="w-full flex justify-center mb-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAddingMovie(true)}
          >
            ➕ Új film hozzáadása
          </button>
        </div>
         )}


      {movieData.map((movie) => {
  const userReview = userReviews.find((review) => review.filmId === movie.id);

  return (
    
    <div
    
      key={movie.id}
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white"
    >
      
      <div className="p-4">
        <h2 className="text-xl font-bold">{movie.name}</h2>
        <p className="text-gray-400 text-sm">🎭 {movie.genre}</p>
        <p className="text-gray-400 text-sm">
  🎬 Rendező: {directors.find(director => director.id === movie.director)?.name || 'Ismeretlen'}
</p>
        <p className="text-gray-400 text-sm">📅 Kiadási év: {movie.releaseYear}</p>
        <p className="text-gray-400 text-sm">⌛ Hossz: {movie.length} perc</p>
        <p className="text-gray-400 text-sm">⭐ Értékelések: {movie.reviews}</p>
        <p className="text-gray-400 text-sm">🔞 Korhatár: {movie.ageCertificates}</p>
        <p className="mt-2">{movie.summary}</p>

        {/* ✅ Saját értékelés csak egyszer */}
        <p className="text-gray-400 text-sm">
          ⭐ Saját értékelés: {userReview ? `${userReview.review}/10` : "Nincs értékelés"}
        </p>

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

        {ratedMovies.includes(movie.id) && (
          <p className="text-green-400 text-sm mt-2">✅ Már értékelted ezt a filmet</p>
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
  );
})}

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
            <select
  name="director"
  value={newMovieData.director}
  onChange={(e) => setNewMovieData({ ...newMovieData, director: e.target.value })}
  className="w-full p-2 border rounded mb-2"
>
  <option value="">Válassz rendezőt</option>
  {directors.map((director) => (
    <option key={director.id} value={director.id}>
      {director.name}
    </option>
  ))}
</select>
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
            {/* **Hozzáadás forma** */}
      {isAddingMovie && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-bold mb-4">🎥 Új film hozzáadása</h2>
      <input
        type="text"
        name="name"
        value={newMovieData.name}
        onChange={(e) => setNewMovieData({ ...newMovieData, name: e.target.value })}
        className="w-full p-2 border rounded mb-2"
        placeholder="Film címe"
      />
      <select
  name="director"
  value={newMovieData.director}
  onChange={(e) => setNewMovieData({ ...newMovieData, director: e.target.value })}
  className="w-full p-2 border rounded mb-2"
>
  <option value="">Válassz rendezőt</option>
  {directors.map((director) => (
    <option key={director.id} value={director.id}>
      {director.name}
    </option>
  ))}
</select>
      <input
        type="text"
        name="genre"
        value={newMovieData.genre}
        onChange={(e) => setNewMovieData({ ...newMovieData, genre: e.target.value })}
        className="w-full p-2 border rounded mb-2"
        placeholder="Műfaj"
      />
      <input
        type="text"
        name="releaseYear"
        value={newMovieData.releaseYear}
        onChange={(e) => setNewMovieData({ ...newMovieData, releaseYear: e.target.value })}
        className="w-full p-2 border rounded mb-2"
        placeholder="Kiadási év"
      />
      <input
        type="number"
        name="length"
        value={newMovieData.length}
        onChange={(e) => setNewMovieData({ ...newMovieData, length: parseInt(e.target.value) })}
        className="w-full p-2 border rounded mb-2"
        placeholder="Hossz (perc)"
      />
      <input
        type="number"
        name="ageCertificates"
        value={newMovieData.ageCertificates}
        onChange={(e) => setNewMovieData({ ...newMovieData, ageCertificates: parseInt(e.target.value) })}
        className="w-full p-2 border rounded mb-2"
        placeholder="Korhatár-besorolás"
      />
      <textarea
        name="summary"
        value={newMovieData.summary}
        onChange={(e) => setNewMovieData({ ...newMovieData, summary: e.target.value })}
        className="w-full p-2 border rounded mb-2"
        placeholder="Film leírása"
      />
      <div className="flex justify-end gap-2">
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsAddingMovie(false)}>Mégse</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAddMovie}>Hozzáadás</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
  
}


export default Movies;