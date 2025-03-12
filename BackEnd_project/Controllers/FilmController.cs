using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using System.Xml.Linq;

namespace BackEnd_project.Controllers
{
    [Route("film")]
    [ApiController]
    public class FilmController : ControllerBase
    {
        [HttpPost]

        public async Task<ActionResult> AddNewFilm(CreateFilmDTO createFilmDTO)
        {
            using (var context = new ProjectContext())
            {
                var director = await context.Directors.FirstOrDefaultAsync(x => x.Id == createFilmDTO.Director);

                if (director == null)
                {
                    return NotFound(new { result = "", message = "Nem található ilyen Director az adatbázisban!" });
                }

                var film = new Film
                {
                    Id = Guid.NewGuid(),
                    Name = createFilmDTO.Name,
                    Director = director.Id,
                    Genre = createFilmDTO.Genre,
                    ReleaseYear = createFilmDTO.ReleaseYear,
                    Length = createFilmDTO.Length,
                    Reviews = createFilmDTO.Reviews,
                    AgeCertificates = createFilmDTO.AgeCertificates,
                    Summary = createFilmDTO.Summary
                };

                await context.Films.AddAsync(film);
                await context.SaveChangesAsync();

                return StatusCode(201, new { result = "", message = "Sikeres felvétel!" });
            }
        }

        [HttpGet]

        public async Task<ActionResult> GetAllFilm()
        {
            using (var context = new ProjectContext())
            {
                var films = await context.Films.ToListAsync();

                if (films != null)
                {
                    return Ok(new { result = films, message = "Sikeres lekérés" });
                }
                Exception e = new();
                return BadRequest(new { result = "", message = e.Message });
            }
        }

        [HttpGet("filmsDirector")]

        public async Task<ActionResult> FilmsDirector(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var film = await context.Films.FirstOrDefaultAsync(x => x.Id == id);
                if (film != null) 
                { 
                    var director = await context.Directors.FirstOrDefaultAsync(x => x.Id == film.Director);

                    if (director != null)
                    {
                        return Ok(new { result = director.Id + " " + director.Name + " " + director.Birthday + " " + director.Nationality +  " " + director.OscarAward + " " + director.Sex, message = "Sikeres lekérés!" });
                    }
                    return NotFound(new { result = "", message = "Nincs ilyen director" });
                }
                return NotFound(new { result = "", message = "Nincs ilyen film" });


            }
        }

        [HttpGet("id")]

        public async Task<ActionResult> GetFilmId(Guid id)
        {
            using ( var context = new ProjectContext()) 
            {
                var film = await context.Films.FirstOrDefaultAsync(x => x.Id == id);

                if(film != null)
                {
                    return Ok(new { result = film, message = "Sikeres lekérés!" });
                }

                return NotFound(new { result = "", message = "Nincs ilyen film az adatbázisban!" });
            }
        }

        [HttpDelete]

        public async Task<ActionResult> DeleteFilm(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var film = await context.Films.FirstOrDefaultAsync(x => x.Id == id);

                if (film != null)
                {
                    context.Films.Remove(film);
                    await context.SaveChangesAsync();

                    return Ok(new { result = film, message = "Sikeres törlés!" });
                }

                return NotFound(new { result = "", message = "Nincs ilyen film az adatbázisban!" });
            }
        }

        [HttpPut]

        public async Task<ActionResult> FilmUpdate(Guid id, UpdateFilmDTO updateFilmDTO)
        {
            using (var context = new ProjectContext()) 
            {
                var existingFilm = await context.Films.FirstOrDefaultAsync(x => x.Id == id);

                if (existingFilm != null)
                {
                    existingFilm.Name = updateFilmDTO.Name;
                    existingFilm.Director = updateFilmDTO.Director;
                    existingFilm.Genre = updateFilmDTO.Genre;
                    existingFilm.ReleaseYear = updateFilmDTO.ReleaseYear;
                    existingFilm.Length = updateFilmDTO.Length;
                    existingFilm.Reviews = updateFilmDTO.Reviews;
                    existingFilm.AgeCertificates = updateFilmDTO.AgeCertificates;
                    existingFilm.Summary = updateFilmDTO.Summary;

                    context.Films.Update(existingFilm);
                    await context.SaveChangesAsync();

                    return Ok(new { result = existingFilm, message = "Módosítás sikeres!" });
                }

                return NotFound(new { result = "", message = "Nincs ilyen film az adatbázisban!" });
            }
        }
    }
}
