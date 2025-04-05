using AuthAPI.Datas;
using AuthAPI.Models;
using AuthAPI.Services.Dtos;
using AuthAPI.Services.IAuthService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI.Services
{
    public class Auth : IAuth
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        private readonly ITokenGenerator _tokenGenerator;

        public Auth(AppDbContext dbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ITokenGenerator tokenGenerator)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            this.roleManager = roleManager;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<object> AssignRole(string UserName, string roleName)
        {
            var user = await _dbContext.applicationUsers.FirstOrDefaultAsync(user => user.NormalizedUserName == UserName.ToUpper());

            if (user != null)
            {
                if (!roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
                {
                    roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
                }

                await _userManager.AddToRoleAsync(user, roleName);

                return new { result = user, message = "Sikeres hozzárendelés." };
            }
            return new { result = "", message = "SIkeretelen hozzárendelés!" };
        }

        public async Task<object> Login(LoginRequestDto loginRequestDto)
        {
            var user = await _dbContext.applicationUsers.FirstOrDefaultAsync(user => user.NormalizedUserName == loginRequestDto.UserName.ToUpper());

            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (isValid)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var jwtToken = _tokenGenerator.GenerateToken(user, roles);

                return new { result = new { user.UserName, user.Email }, message = "Sikeres beléptetés.", token = jwtToken };
            }

            return new { result = "", message = "Nem regisztrált.", token = "" };
        }

        public async Task<object> Register(RegisterRequestDto registerRequestDto)
        {
            var user = new ApplicationUser
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email,
                Birthdate = registerRequestDto.Birthdate
            };

            var result = await _userManager.CreateAsync(user, registerRequestDto.PassWord);

            if (result.Succeeded)
            {
                var userReturn = await _dbContext.applicationUsers.FirstOrDefaultAsync(user => user.UserName == registerRequestDto.UserName);

                return new { result = userReturn, message = "Sikeres regisztráció!" };
            }

            return new { result = "", message = result.Errors.FirstOrDefault().Description};
        }


    }
}
