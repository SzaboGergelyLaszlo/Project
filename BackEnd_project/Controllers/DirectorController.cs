using BackEnd_project.Models.DTO;
using BackEnd_project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DirectorController : ControllerBase
    {
        [HttpPost]

        public async Task<ActionResult> AddNewDirector(CreateDirectorDTO createDirectorDTO)
        {
            var director = new Director
            {
                Id = Guid.NewGuid(),
                Name = createDirectorDTO.Name,
                Nationality = createDirectorDTO.Nationality,
                Birthday = createDirectorDTO.Birthday,
                OscarAward = createDirectorDTO.OscarAward,
                Sex = createDirectorDTO.Sex
            };

            using (var context = new ProjectContext())
            {
                await context.Directors.AddAsync(director);
                await context.SaveChangesAsync();

                return StatusCode(201, new { result = director, message = "Sikeres felvétel!" });
            }
        }

        [HttpGet]

        public async Task<ActionResult> GetAllDirector()
        {
            using (var context = new ProjectContext())
            {
                var directors = await context.Directors.ToListAsync();

                if (directors != null)
                {
                    return Ok(new { result = directors, message = "Sikeres lekérés!" });
                }

                Exception e = new();
                return BadRequest(new { result = "", message = e.Message });
            }

        }

        [HttpGet("id")]

        public async Task<ActionResult> GetDirectorId(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var director = await context.Directors.FirstOrDefaultAsync(x => x.Id == id);

                if (director != null)
                {
                    return Ok(new { result = director, message = "Sikeres lekérés!" });
                }
                return NotFound(new { result = "", message = "Nincs ilyen Director az adatbázisban!" });
            }
        }

        [HttpDelete]

        public async Task<ActionResult> DeleteDirector(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var director = await context.Directors.FirstOrDefaultAsync(x => x.Id == id);

                if (director != null)
                {
                    context.Directors.Remove(director);
                    await context.SaveChangesAsync();

                    return Ok(new { result = director, message = "Sikeres törlés!" });
                }

                return NotFound(new { result = "", message = "Nincs ilyen Actor az adatbázisban!" });
            }
        }

        [HttpPut]

        public async Task<ActionResult> UpdateActor(Guid id, UpdateDirectorDTO updateDirectorDTO)
        {
            using (var context = new ProjectContext())
            {
                var existingDirector = await context.Directors.FirstOrDefaultAsync(x => x.Id == id);

                if (existingDirector != null)
                {
                    existingDirector.Name = updateDirectorDTO.Name;
                    existingDirector.Nationality = updateDirectorDTO.Nationality;
                    existingDirector.OscarAward = updateDirectorDTO.OscarAward;
                    existingDirector.Birthday = updateDirectorDTO.Birthday;
                    existingDirector.Sex = updateDirectorDTO.Sex;

                    context.Directors.Update(existingDirector);
                    await context.SaveChangesAsync();

                    return Ok(new { result = existingDirector, message = "Módosítás sikeres!" });
                };

                return NotFound(new { result = "", message = "Nincs ilyen Director az adatbázisban!" });
            }
        }
    }
}
