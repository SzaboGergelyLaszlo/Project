using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities.Encoders;
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

        [HttpPost]

        public async Task<ActionResult> NewUser(CreateUserDTO createUserDTO)
        {

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = createUserDTO.Name,
                FelhasznaloNev = createUserDTO.FelhasznaloNev,
                Hash = createUserDTO.Hash,
                Salt = createUserDTO.Salt,
                Email = createUserDTO.Email,
                Sex = createUserDTO.Sex,
                Role = createUserDTO.Role
            };

            using (var context = new ProjectContext())
            {
                context.Users.Add(user);
                await context.SaveChangesAsync();

                return StatusCode(201, new { result = user, message = "Sikeres felvétel!" });
            }
        }

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

        [HttpPut]

        public async Task<ActionResult> UpdateUser(Guid id, UpdateUserDTO updateUserDTO)
        {
            using (var context = new ProjectContext())
            {
                var existingUser = await context.Users.SingleOrDefaultAsync(x => x.Id == id);

                if (existingUser == null)
                {
                    return NotFound(new { result = "", message = "Nincs ilyen user az adatbázisban!" });
                }

                existingUser.Name = updateUserDTO.Name;
                existingUser.FelhasznaloNev = updateUserDTO.FelhasznaloNev;
                existingUser.Email = updateUserDTO.Email;
                existingUser.Salt = updateUserDTO.Salt;
                existingUser.Hash = updateUserDTO.Hash;
                existingUser.Sex = updateUserDTO.Sex;
                existingUser.Role = updateUserDTO.Role;

                context.Users.Update(existingUser);
                await context.SaveChangesAsync();

                return Ok(new { result = existingUser, message = "Sikeres modosítás!" });

            }
        }
    }
}
