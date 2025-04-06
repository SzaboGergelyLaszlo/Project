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
  const [ratings, setRatings] = useState({}); // Az összes film értékeléseinek tárolása
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
/*
    const fetchMovieRatings = async (movieId) => {
      try {
        const response = await fetch(`http://localhost:5297/Film/Rating?id=${movieId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          console.error("Hiba a film értékeléseinek lekérésekor");
          return;
        }
  
        const ratingsData = await response.json();
        return ratingsData.result ?? [];
      } catch (error) {
        console.error("Hálózati hiba:", error);
      }
    };
*/
const fetchMovieRating = async (movieId) => {
  try {
    const response = await fetch(`http://localhost:5297/Film/Rating?id=${movieId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // A válasz tartalmazza az átlagolt értékelést (pl. averageRating)
      return data.result; // Az átlagolt értékelést visszaadjuk
    } else {
      console.error("Hiba az értékelés lekérésekor");
      return null;
    }
  } catch (error) {
    console.error("Hálózati hiba:", error);
    return null;
  }
};

useEffect(() => {
  (async () => {
    try {
      const [moviesRes, reviewsRes, directorsRes] = await Promise.all([
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
        fetch('http://localhost:5297/Director', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!moviesRes.ok || !reviewsRes.ok || !directorsRes.ok) {
        console.error("Hiba az adatok lekérésekor");
        return;
      }

      const moviesData = await moviesRes.json();
      const reviewsData = await reviewsRes.json();
      const directorsData = await directorsRes.json();

      setMovieData(moviesData.result ?? moviesData);
      setDirectors(directorsData.result ?? directorsData); // Rendezők betöltése

      // Lekérjük minden film értékelését és beállítjuk őket
      const allRatings = {};
      for (let movie of moviesData.result) {
        const rating = await fetchMovieRating(movie.id); // Minden filmhez külön-külön lekérjük az értékelést
        if (rating !== null) {
          allRatings[movie.id] = rating; // A film ID-ja alapján tároljuk el az értékelést
        }
      }

      setRatings(allRatings); // Az összes film értékelését tároljuk

    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  })();
}, [userId, token]);




  
/*Film hozzáadása */
const handleAddMovie = async () => {
  const formData = new FormData();
  formData.append("Name", newMovieData.name);
  formData.append("Director", newMovieData.director);
  formData.append("Genre", newMovieData.genre);
  formData.append("ReleaseYear", newMovieData.releaseYear);
  formData.append("Length", newMovieData.length.toString());
  formData.append("Summary", newMovieData.summary);
  formData.append("AgeCertificates", newMovieData.ageCertificates.toString());
  formData.append("Reviews", newMovieData.reviews.toString());

  // Ha van kép (pl. fájl feltöltő inputból)
  if (newMovieData.kep) {
    formData.append("Kep", newMovieData.kep);
  } else {
    formData.append("Kep", new Blob([])); // Üres fájl, ha kötelező
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error("Hiba a film hozzáadásakor");
      return;
    }

    const addedMovie = await response.json();
    setMovieData((prev) => [...prev, addedMovie.result ?? addedMovie]);
    setIsAddingMovie(false);

    setNewMovieData({
      name: "",
      director: "",
      genre: "",
      releaseYear: "",
      length: 0,
      reviews: 0,
      ageCertificates: 0,
      summary: "",
      kep: null,
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
    setFormData({
      Name: movie.name,
      Summary: movie.summary,
      Genre: movie.genre,
      ReleaseYear: movie.releaseYear,
      Length: movie.length,
      Director: movie.director,
      AgeCertificates: movie.ageCertificates,
      Reviews: movie.reviews,
      Kep: null,
    });
  };
  
  

  // ** Input változások kezelése **
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  

  // ** Szerkesztett film mentése **
  const handleSaveEdit = async () => {
    try {
      const payload = new FormData();
      payload.append("Name", formData.Name);
      payload.append("Summary", formData.Summary);
      payload.append("Genre", formData.Genre);
      payload.append("ReleaseYear", formData.ReleaseYear);
      payload.append("Length", formData.Length);
      payload.append("Director", formData.Director); // UUID!
      payload.append("AgeCertificates", formData.AgeCertificates);
      payload.append("Reviews", formData.Reviews);
  
      // Csak akkor adjuk hozzá a képet, ha van új választva
      if (formData.Kep) {
        payload.append("Kep", formData.Kep);
      } else {
        payload.append("Kep", ""); // Swagger szerint üresen is lehet küldeni
      }
  
      const response = await fetch(`${url}?id=${editingMovie.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // NE adjunk meg content-type-ot!
        },
        body: payload,
      });
  
      if (!response.ok) {
        console.error("Sikertelen szerkesztés:", await response.text());
        return;
      }
  
      const updatedMovie = await response.json();
  
      setMovieData((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === editingMovie.id ? updatedMovie : movie
        )
      );
  
      setEditingMovie(null);
      window.location.reload();
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
  
    const reviewData = {
      filmId: movieId,
      userId: userId,
      review: numericRating,
    };
    console.log("Az API-nak küldött adat:", reviewData);
  
    try {
      const reviewRequest = await fetch(`http://localhost:5297/Rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });
  
      if (!reviewRequest.ok) {
        console.error("Hiba történt az értékelés küldésekor.");
        return;
      }
  
      // Frissítés localStorage-ban
      const currentReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
      const updatedReviews = [...currentReviews, { filmId: movieId, review: numericRating }];
      localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
  
      // Frissítés a helyi állapotban
      setRatedMovies((prev) => [...prev, movieId]);
      setUserReviews((prev) => [...prev, { filmId: movieId, review: numericRating }]);
  
      alert("Köszönjük az értékelést!");
  
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };
  const getUserReview = (movieId) => {
    const reviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    return reviews.find((review) => review.filmId === movieId);
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
    <div key={movie.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white">
      <div className="relative">
        {/* Kép megjelenítése */}
        {movie.kép && (
          <img
            src={movie.kép}
            alt={movie.name}
            className="w-full h-56 object-cover rounded-t-lg"
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{movie.name}</h2>
        <p className="text-gray-400 text-sm">🎭 {movie.genre}</p>
        <p className="text-gray-400 text-sm">
          🎬 Rendező: {directors.find(director => director.id === movie.director)?.name || 'Ismeretlen'}
        </p>
        <p className="text-gray-400 text-sm">📅 Kiadási év: {movie.releaseYear}</p>
        <p className="text-gray-400 text-sm">⌛ Hossz: {movie.length} perc</p>
        {/* Értékelés megjelenítése */}
        <p className="text-gray-400 text-sm">
          ⭐ Értékelés: {ratings[movie.id] !== undefined ? ratings[movie.id] : "Nincs értékelés"}
        </p>
  
        <p className="text-gray-400 text-sm">🔞 Korhatár: {movie.ageCertificates}</p>
        <p className="mt-2">{movie.summary}</p>
  
        {/* ✅ Saját értékelés */}
        {token && (
          <p className="text-gray-400 text-sm">
            ⭐ Saját értékelés: {getUserReview(movie.id) ? `${getUserReview(movie.id).review}/10` : "Nincs értékelés"}
          </p>
        )}
  
        {token && jog < 3 && (
          <div className="mt-3 flex gap-2">
            <button
              className={`text-white font-bold py-1 px-3 rounded ${
                (ratedMovies.includes(movie.id) || getUserReview(movie.id)) 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
              onClick={() => handleReviewSubmit(movie.id)}
              disabled={ratedMovies.includes(movie.id) || getUserReview(movie.id)}
            >
              Értékelés
            </button>
          </div>
        )}
  
        {token && jog === 1 && (
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
{editingMovie && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-bold mb-4">🎬 Film szerkesztése</h2>

      <input
        type="text"
        name="Name"
        value={formData.Name}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Film címe"
      />

      <select
        name="Director"
        value={formData.Director}
        onChange={handleInputChange}
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
        name="Genre"
        value={formData.Genre}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Műfaj"
      />

      <input
        type="number"
        name="ReleaseYear"
        value={formData.ReleaseYear}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Megjelenés éve"
      />

      <input
        type="number"
        name="Length"
        value={formData.Length}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Hossz (perc)"
      />

      <input
        type="number"
        name="Reviews"
        value={formData.Reviews}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Értékelések száma"
      />

      <input
        type="number"
        name="AgeCertificates"
        value={formData.AgeCertificates}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Korhatár-besorolás"
      />

      <input
        type="file"
        name="Kep"
        accept="image/*"
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
      />

      <textarea
        name="Summary"
        value={formData.Summary}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Film leírása"
      />

      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setEditingMovie(null)}
        >
          Mégse
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSaveEdit}
        >
          Mentés
        </button>
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
              <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewMovieData({ ...newMovieData, kep: e.target.files[0] })}
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