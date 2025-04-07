using BackEnd_project.Models;
using BackEnd_project.Models.DTO;

namespace BackEnd_project.Services
{
    public interface ITokenGenerator
    {
        string GenerateToken(User User);
    }
}
