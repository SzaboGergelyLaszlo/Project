using AuthAPI.Models;

namespace AuthAPI.Services.IAuthService
{
    public interface ITokenGenerator
    {
        string GenerateToken(ApplicationUser applicationUser, IEnumerable<string> role);
    }
}
