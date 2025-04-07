using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using BackEnd_project.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ITokenGenerator _tokenGenerator;

        public LoginController(ITokenGenerator tokenGenerator)
        {
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost]

        public async Task<ActionResult> Login(LoginDTO loginDTO)
        {
            if (string.IsNullOrEmpty(loginDTO?.FelhasznaloNev) || string.IsNullOrEmpty(loginDTO?.Hash))
            {
                return BadRequest("Felhasználónév és jelszó megadása kötelező.");
            }

            using (var context = new ProjectContext())
            {
                try
                {
                    string Hash = Program.CreateSHA256(loginDTO.Hash);

                    var loggedUser = await context.Users
                        .FirstOrDefaultAsync(f => f.FelhasznaloNev == loginDTO.FelhasznaloNev && f.Hash == Hash);
                    if (loggedUser != null)
                    {
                        var jwtToken = _tokenGenerator.GenerateToken(loggedUser);

                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(jwtToken, loggedUser);
                        }

                        return Ok(new LoggedUser { Id = loggedUser.Id, Name = loggedUser.Name, Email = loggedUser.Email, Jog = loggedUser.Role, Token = jwtToken });
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

