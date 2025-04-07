using BackEnd_project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LogOutController : ControllerBase
    {
        [HttpPost("{uId}")]
        public IActionResult Logout(string uId)
        {


            if (Program.LoggedInUsers.ContainsKey(uId))
            {
                Program.LoggedInUsers.Remove(uId);
                return Ok("Sikeres kijelentkezés");
            }
            else
            {
                return BadRequest("Sikertelen kijelentkezés!");
            }
        }
    }
}
