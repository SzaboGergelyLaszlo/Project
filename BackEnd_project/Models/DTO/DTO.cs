using BackEnd_project.Models;

namespace BackEnd_project.Models.DTO
{
    //Actor DTO(s)
    public record CreateActorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex);
    public record UpdateActorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex);

    //Director DTO(s)
    public record CreateDirectorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex);
    public record UpdateDirectorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex);
}
