import React from "react";

function Home() {
  const name = localStorage.getItem("authName");
  const token = localStorage.getItem("authToken");

  const featuredMovies = [
    {
      title: "A keresztapa",
      image: "./img/Godfather_ver1.jpg",
      description: "A maffia világa, családi hűség és hatalom – egy filmtörténeti klasszikus.",
    },
    {
      title: "A sötét lovag",
      image: "./img/The_Dark_knight.jpg",
      description: "Batman szembenéz Jokerral Gotham sorsáért – sötét, intenzív, zseniális.",
    },
    {
      title: "Forrest Gump",
      image: "./img/Forrest_Gump_poster.jpg",
      description: "Az élet egy doboz bonbon – Forrest Gump története megindító és inspiráló.",
    },
  ];

  return (
    <div className="home-container p-6 text-center">
      <header className="hero-section mb-6">
        {token && <h1 className="text-3xl font-bold mb-2">Szia {name} 👋</h1>}
        <h2 className="text-2xl font-semibold mb-2">Fedezd fel a legújabb filmeket</h2>
        <p className="mb-1">Legyen szó akcióról, drámáról vagy vígjátékról, nálunk mindent megtalálsz!</p>
        <p>Értékeld a filmeket!</p>
      </header>

      <section className="featured-movies mt-8">
        <h3 className="text-xl font-bold mb-4">Kiemelt filmek 🎬</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {featuredMovies.map((movie, index) => (
            <div
              key={index}
              className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden text-black"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{movie.title}</h4>
                <p className="text-sm mt-2">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
