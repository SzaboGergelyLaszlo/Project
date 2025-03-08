using BackEnd_project.Models;

namespace BackEnd_project.Models.DTO
{
    public record CreateActorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex);
    public record UpdateActorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex);

}
