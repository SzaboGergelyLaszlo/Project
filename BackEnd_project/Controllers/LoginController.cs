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
                        var token = Guid.NewGuid().ToString();
                        
                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, loggedUser);
                        }

                        return Ok(new LoggedUser {Id = loggedUser.Id , Name = loggedUser.Name, Email = loggedUser.Email, Jog = loggedUser.Role, Token = token });
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