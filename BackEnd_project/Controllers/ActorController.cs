using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
using System.Diagnostics.Metrics;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        [HttpPost]

        public async Task<ActionResult> AddNewActor(CreateActorDTO createActorDTO)
        {

            var actor = new Actor
            {
                Id = Guid.NewGuid(),
                Name = createActorDTO.Name,
                Nationality = createActorDTO.Nationality,
                Birthday = createActorDTO.Birthday,
                OscarAward = createActorDTO.OscarAward,
                Sex = createActorDTO.Sex
            };

            using (var context = new ProjectContext())
            {
                await context.Actors.AddAsync(actor);
                await context.SaveChangesAsync();

                return StatusCode(201, new { result = actor, message = "Sikeres felvétel!" });
            }
        }


        [HttpGet]

        public async Task<ActionResult> GetAllActor()
        {


            using (var context = new ProjectContext())
            {
                var actors = await context.Actors.ToListAsync();

                if (actors != null)
                {
                    return Ok(new { result = actors, message = "Sikeres lekérés!" });
                }

                Exception e = new();
                return BadRequest(new { result = "", message = e.Message });
            }

        }





        [HttpGet("id")]

        public async Task<ActionResult> GetActorId(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

                if (actor != null)
                {
                    return Ok(new { result = actor, message = "Sikeres lekérés!" });
                }
                return NotFound(new { result = "", message = "Nincs ilyen Actor az adatbázisban!" });
            }
        }

        [HttpDelete]

        public async Task<ActionResult> DeleteActor(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

                if (actor != null)
                {
                    context.Actors.Remove(actor);
                    await context.SaveChangesAsync();

                    return Ok(new { result = actor, message = "Sikeres törlés!" });
                }

                return NotFound(new { result = "", message = "Nincs ilyen Actor az adatbázisban!" });
            }
        }

        [HttpPut]

        public async Task<ActionResult> UpdateActor(Guid id, UpdateActorDTO updateActorDTO)
        {
            using (var context = new ProjectContext())
            {
                var existingActor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

                if (existingActor != null)
                {
                    existingActor.Name = updateActorDTO.Name;
                    existingActor.Nationality = updateActorDTO.Nationality;
                    existingActor.OscarAward = updateActorDTO.OscarAward;
                    existingActor.Birthday = updateActorDTO.Birthday;
                    existingActor.Sex = updateActorDTO.Sex;

                    context.Actors.Update(existingActor);
                    await context.SaveChangesAsync();

                    return Ok(new { result = existingActor, message = "Módosítás sikeres!" });
                };

                return NotFound(new { result = "", message = "Nincs ilyen Actor az adatbázisban!" });
            }
        }


    }
}
