using BackEnd_project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]

        public async Task<IActionResult> Registry(User user)
        {
            using (var context = new ProjectContext())
            {
                try
                {
                    if (context.Users.FirstOrDefault(f => f.FelhasznaloNev == user.FelhasznaloNev) != null)
                    {
                        return Ok("Már létezik ilyen felhasználónév!");
                    }
                    if (context.Users.FirstOrDefault(f => f.Email == user.Email) != null)
                    {
                        return Ok("Ezzel az e-mail címmel már regisztráltak!");
                    }
                    user.Role = user.Role;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    await context.Users.AddAsync(user);
                    await context.SaveChangesAsync();

                    Program.SendEmail(user.Email, "Regisztráció", "Sikeres Regisztráció!");

                    return Ok("Sikeres regisztráció.");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
