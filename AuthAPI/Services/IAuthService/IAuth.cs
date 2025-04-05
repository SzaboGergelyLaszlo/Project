using AuthAPI.Services.Dtos;
using Microsoft.AspNetCore.Identity.Data;

namespace AuthAPI.Services.IAuthService
{
    public interface IAuth
    {
        Task<object> Register(RegisterRequestDto registerRequestDto);

        Task<object> Login(LoginRequestDto loginRequestDto);

        Task<object> AssignRole(string UserName, string roleName);
    }
}
