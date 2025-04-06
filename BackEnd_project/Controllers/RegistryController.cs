using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Policy;
using static System.Net.WebRequestMethods;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Registry([FromForm] CreateUserDTO CreateUserDTO)
        {
            using (var context = new ProjectContext())
            {
                try
                {
                    if (context.Users.FirstOrDefault(f => f.FelhasznaloNev == CreateUserDTO.FelhasznaloNev) != null)
                    {
                        return Ok("Már létezik ilyen felhasználónév!");
                    }
                    if (context.Users.FirstOrDefault(f => f.Email == CreateUserDTO.Email) != null)
                    {
                        return Ok("Ezzel az e-mail címmel már regisztráltak!");
                    }

                    string fileName = "users.png";
                    string subFolder = "";

                    var url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                    if (CreateUserDTO.Kep != null) 
                    {
                        fileName = Path.GetFileName(CreateUserDTO.Kep.FileName);
                        url = "ftp://ftp.nethely.hu" + "/" + subFolder + "/" + fileName;

                        FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                        request.Credentials = new NetworkCredential("backend_kalahora", "!SZGL09021992");
                        request.Method = WebRequestMethods.Ftp.UploadFile;
                        await using (Stream ftpStream = request.GetRequestStream())
                        {
                            await CreateUserDTO.Kep.CopyToAsync(ftpStream);
                        }

                    }

                    var user = new User
                    {
                        Id = Guid.NewGuid(),
                        Name = CreateUserDTO.Name,
                        FelhasznaloNev = CreateUserDTO.FelhasznaloNev,
                        Hash = Program.CreateSHA256(CreateUserDTO.Hash),
                        Email = CreateUserDTO.Email,
                        Sex = CreateUserDTO.Sex,
                        Role = CreateUserDTO.Role,
                        ProfilKép = $"http://kepek.noreplykalahora1992.nhely.hu/{fileName}"
                    };


                    await context.Users.AddAsync(user);
                    await context.SaveChangesAsync();

                    Program.SendEmail(user.Email, "Regisztráció", "Sikeres Regisztráció!");

                    return Ok(new { result = user, message = "Sikeres regisztráció.", FileUrl = user.ProfilKép });
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}