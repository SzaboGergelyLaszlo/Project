using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("GetSailt /{Name}")]

        public async Task<ActionResult> GetSalt(string felhasznaloNev)
        {
            using (var context = new ProjectContext())
            {
                try
                {
                    User response = await context.Users.FirstOrDefaultAsync(x => x.FelhasznaloNev == felhasznaloNev);
                    return response == null ? BadRequest("hiba") : Ok(response.Salt);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpPost]

        public async Task<ActionResult> Login(LoginDTO loginDTO)
        {
            using (var context = new ProjectContext())
            {
                try
                {
                    string Hash = Program.CreateSHA256(loginDTO.Hash);
                    User loggedUser = await context.Users.FirstOrDefaultAsync(f => f.FelhasznaloNev == loginDTO.FelhasznaloNev && f.Hash == Hash);
                    if (loggedUser != null)
                    {
                        string token = Guid.NewGuid().ToString();
                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, loggedUser);
                        }

                        return Ok(new LoggedUser { Name = loggedUser.Name, Email = loggedUser.Email, Jog = loggedUser.Role, Token = token });
                    }
                    else
                    {
                        return BadRequest("Hibás név vagy jelszó!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

    }
}