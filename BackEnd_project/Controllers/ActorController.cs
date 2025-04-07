using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
using System.Diagnostics.Metrics;
using System.Net;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        [Authorize(Roles = "1")]
        [HttpPost]

        public async Task<ActionResult> AddNewActor([FromForm] CreateActorDTO createActorDTO)
        {

            string fileName = "users.png";
            string subFolder = "";

            var url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

            if (createActorDTO.Kep != null)
            {
                fileName = Path.GetFileName(createActorDTO.Kep.FileName);
                url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                request.Credentials = new NetworkCredential("backend_kalahora", "!SZGL09021992");
                request.Method = WebRequestMethods.Ftp.UploadFile;
                await using (Stream ftpStream = request.GetRequestStream())
                {
                    await createActorDTO.Kep.CopyToAsync(ftpStream);
                }

            }


            var actor = new Actor
            {
                Id = Guid.NewGuid(),
                Name = createActorDTO.Name,
                Nationality = createActorDTO.Nationality,
                Birthday = createActorDTO.Birthday,
                OscarAward = createActorDTO.OscarAward,
                Sex = createActorDTO.Sex,
                ProfilKép = $"http://kepek.noreplykalahora1992.nhely.hu/{fileName}"
            };

            using (var context = new ProjectContext())
            {
                await context.Actors.AddAsync(actor);
                await context.SaveChangesAsync();

                return StatusCode(201, new { result = actor, message = "Sikeres felvétel!" });
            }
        }
        [Authorize(Roles = "1")]
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
        [Authorize(Roles = "1")]
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
        [Authorize(Roles = "1")]
        [HttpPut]

        public async Task<ActionResult> UpdateActor(Guid id,[FromForm] UpdateActorDTO updateActorDTO)
        {
            using (var context = new ProjectContext())
            {

                string fileName = "users.png";

                if (updateActorDTO.Kep != null)
                {


                    string subFolder = "";
                    fileName = Path.GetFileName(updateActorDTO.Kep.FileName);
                    var url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                    FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                    request.Credentials = new NetworkCredential("backend_kalahora", "!SZGL09021992");
                    request.Method = WebRequestMethods.Ftp.UploadFile;
                    await using (Stream ftpStream = request.GetRequestStream())
                    {
                        await updateActorDTO.Kep.CopyToAsync(ftpStream);
                    }

                }


                var existingActor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

                if (existingActor != null)
                {
                    existingActor.Name = updateActorDTO.Name;
                    existingActor.Nationality = updateActorDTO.Nationality;
                    existingActor.OscarAward = updateActorDTO.OscarAward;
                    existingActor.Birthday = updateActorDTO.Birthday;
                    existingActor.Sex = updateActorDTO.Sex;
                    existingActor.ProfilKép = $"http://kepek.noreplykalahora1992.nhely.hu/{fileName}";

                    context.Actors.Update(existingActor);
                    await context.SaveChangesAsync();

                    return Ok(new { result = existingActor, message = "Módosítás sikeres!" });
                };

                return NotFound(new { result = "", message = "Nincs ilyen Actor az adatbázisban!" });
            }
        }


    }
}
