using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities.Encoders;
using System.Net;
using System.Xml.Linq;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]

        public async Task<ActionResult> GetAllUser()
        {
            using (var context = new ProjectContext())
            {
                var users = await context.Users.ToListAsync();

                if (users == null)
                {
                    return BadRequest(new { result = "", message = "Hibás lekérés" });
                }

                return Ok(new { result = users, message = "Sikeres lekérés!" });
            }
        }

        [HttpGet("id")]

        public async Task<ActionResult> GetUserId(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var user = await context.Users.SingleOrDefaultAsync(x => x.Id == id);

                if (user == null)
                {
                    return NotFound(new { result = "", message = "Nincs ilyen user az adatbázisban" });
                }

                return Ok(new { result = user, message = "Sikeres lekérés!" });
            }
        }
        [Authorize(Roles = "1")]
        [HttpPost]

        public async Task<ActionResult> NewUser([FromForm] CreateUserDTO createUserDTO)
        {


            using (var context = new ProjectContext())
            {
                if (context.Users.FirstOrDefault(f => f.FelhasznaloNev == createUserDTO.FelhasznaloNev) != null)
                {
                    return Ok("Már létezik ilyen felhasználónév!");
                }
                if (context.Users.FirstOrDefault(f => f.Email == createUserDTO.Email) != null)
                {
                    return Ok("Ezzel az e-mail címmel már regisztráltak!");
                }

                string fileName = "users.png";
                string subFolder = "";

                var url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                if (createUserDTO.Kep != null)
                {
                    fileName = Path.GetFileName(createUserDTO.Kep.FileName);
                    url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                    FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                    request.Credentials = new NetworkCredential("backend_kalahora", "!SZGL09021992");
                    request.Method = WebRequestMethods.Ftp.UploadFile;
                    await using (Stream ftpStream = request.GetRequestStream())
                    {
                        await createUserDTO.Kep.CopyToAsync(ftpStream);
                    }

                }

                var user = new User
                {
                    Id = Guid.NewGuid(),
                    Name = createUserDTO.Name,
                    FelhasznaloNev = createUserDTO.FelhasznaloNev,
                    Hash = Program.CreateSHA256(createUserDTO.Hash),
                    Email = createUserDTO.Email,
                    Sex = createUserDTO.Sex,
                    Role = createUserDTO.Role,
                    ProfilKép = $"http://kepek.noreplykalahora1992.nhely.hu/{fileName}"
                };


                context.Users.Add(user);
                await context.SaveChangesAsync();

                return StatusCode(201, new { result = user, message = "Sikeres felvétel!" });
            }
        }


        [Authorize(Roles = "1")]
        [HttpDelete]

        public async Task<ActionResult> DeleteUser(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var user = await context.Users.SingleOrDefaultAsync(x => x.Id == id);

                if (user == null)
                {
                    return NotFound(new { result = "", message = "Nincs ilyen user az adatbázisban!" });
                }

                context.Users.Remove(user);
                await context.SaveChangesAsync();

                return Ok(new { result = user, message = "Sikeres törlés!" });
            }
        }
        [Authorize(Roles = "1")]
        [HttpPut("updateUser")]

        public async Task<ActionResult> UpdateUser( Guid id, [FromForm] UpdateUserDTO updateUserDTO)
        {
            using (var context = new ProjectContext())
            {
                var existingUser = await context.Users.SingleOrDefaultAsync(x => x.Id == id);

                if (existingUser == null)
                {
                    return NotFound(new { result = "", message = "Nincs ilyen user az adatbázisban!" });
                }

                string fileName = "users.png";

                if (updateUserDTO.Kep != null)
                {

                   
                    string subFolder = "";
                    fileName = Path.GetFileName(updateUserDTO.Kep.FileName);
                    var url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                    FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                    request.Credentials = new NetworkCredential("backend_kalahora", "!SZGL09021992");
                    request.Method = WebRequestMethods.Ftp.UploadFile;
                    await using (Stream ftpStream = request.GetRequestStream())
                    {
                        await updateUserDTO.Kep.CopyToAsync(ftpStream);
                    }

                }

                existingUser.Name = updateUserDTO.Name;
                existingUser.FelhasznaloNev = updateUserDTO.FelhasznaloNev;
                existingUser.Email = updateUserDTO.Email;
                existingUser.Hash = Program.CreateSHA256(updateUserDTO.Hash);
                existingUser.Sex = updateUserDTO.Sex;
                existingUser.Role = updateUserDTO.Role;
                existingUser.ProfilKép = $"http://kepek.noreplykalahora1992.nhely.hu/{fileName}";


                context.Users.Update(existingUser);
                await context.SaveChangesAsync();

                return Ok(new { result = existingUser, message = "Sikeres modosítás!" });

            }
        }
    }
}
