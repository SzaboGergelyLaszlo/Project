using BackEnd_project.Models.DTO;
using BackEnd_project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DirectorController : ControllerBase
    {
        [HttpPost]

        public async Task<ActionResult> AddNewDirector([FromForm] CreateDirectorDTO createDirectorDTO)
        {

            string fileName = "users.png";
            string subFolder = "";

            var url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

            if (createDirectorDTO.Kep != null)
            {
                fileName = Path.GetFileName(createDirectorDTO.Kep.FileName);
                url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                request.Credentials = new NetworkCredential("backend_kalahora", "!SZGL09021992");
                request.Method = WebRequestMethods.Ftp.UploadFile;
                await using (Stream ftpStream = request.GetRequestStream())
                {
                    await createDirectorDTO.Kep.CopyToAsync(ftpStream);
                }

            }

            var director = new Director
            {
                Id = Guid.NewGuid(),
                Name = createDirectorDTO.Name,
                Nationality = createDirectorDTO.Nationality,
                Birthday = createDirectorDTO.Birthday,
                OscarAward = createDirectorDTO.OscarAward,
                Sex = createDirectorDTO.Sex,
                ProfilKép = $"http://kepek.noreplykalahora1992.nhely.hu/{fileName}"
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

        public async Task<ActionResult> UpdateActor(Guid id,[FromForm] UpdateDirectorDTO updateDirectorDTO)
        {
            using (var context = new ProjectContext())
            {

                string fileName = "users.png";

                if (updateDirectorDTO.Kep != null)
                {


                    string subFolder = "";
                    fileName = Path.GetFileName(updateDirectorDTO.Kep.FileName);
                    var url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                    FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                    request.Credentials = new NetworkCredential("backend_kalahora", "!SZGL09021992");
                    request.Method = WebRequestMethods.Ftp.UploadFile;
                    await using (Stream ftpStream = request.GetRequestStream())
                    {
                        await updateDirectorDTO.Kep.CopyToAsync(ftpStream);
                    }

                }

                var existingDirector = await context.Directors.FirstOrDefaultAsync(x => x.Id == id);

                if (existingDirector != null)
                {
                    existingDirector.Name = updateDirectorDTO.Name;
                    existingDirector.Nationality = updateDirectorDTO.Nationality;
                    existingDirector.OscarAward = updateDirectorDTO.OscarAward;
                    existingDirector.Birthday = updateDirectorDTO.Birthday;
                    existingDirector.Sex = updateDirectorDTO.Sex;
                    existingDirector.ProfilKép = $"http://kepek.noreplykalahora1992.nhely.hu/{fileName}";

                    context.Directors.Update(existingDirector);
                    await context.SaveChangesAsync();

                    return Ok(new { result = existingDirector, message = "Módosítás sikeres!" });
                };

                return NotFound(new { result = "", message = "Nincs ilyen Director az adatbázisban!" });
            }
        }
    }
}
