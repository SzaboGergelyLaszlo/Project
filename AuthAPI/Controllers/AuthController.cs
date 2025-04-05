using AuthAPI.Services.Dtos;
using AuthAPI.Services.IAuthService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace AuthAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth auth;

        public AuthController(IAuth auth)
        {
            this.auth = auth;
        }

        [HttpPost("Register")]

        public async Task<ActionResult> AddNewUser(RegisterRequestDto registerRequestDto)
        {
            var user = await auth.Register(registerRequestDto);

            if (user != null) 
            {
                return StatusCode(201, user);
            }

            return BadRequest(new { result = "", message = "Sikertelen regisztráció!" });
        }

        [HttpPost("Login")]

        public async Task<ActionResult> LoginUser(LoginRequestDto loginRequestDto)
        {
            var result = await auth.Login(loginRequestDto);

            if (result != null) 
            {
                return StatusCode(200,result);
            }

            return NotFound(new { result = "", message = "Sikertelen belépés!" });
        }

        [HttpPost("assignrole")]

        public async Task<ActionResult> AddRole(string UserName, string RoleName)
        {
            var result = await auth.AssignRole(UserName, RoleName);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
