using BackEnd_project.Models;

namespace BackEnd_project.Models.DTO
{
    //Actor DTO(s)
    public record CreateActorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex, IFormFile? Kep);
    public record UpdateActorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex, IFormFile? Kep);

    //Director DTO(s)
    public record CreateDirectorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex, IFormFile? Kep);
    public record UpdateDirectorDTO(string Name, string Nationality, DateTime Birthday, bool OscarAward, string Sex, IFormFile? Kep);

    //Film DTO(s)
    public record CreateFilmDTO(string Name, Guid Director,string Genre, int ReleaseYear, int Length, int Reviews, int AgeCertificates, string Summary, IFormFile? Kep);
    public record UpdateFilmDTO(string Name, Guid Director, string Genre, int ReleaseYear, int Length, int Reviews, int AgeCertificates, string Summary, IFormFile? Kep);

    //User DTO(s)
    public record CreateUserDTO(string Name,string FelhasznaloNev, string? Hash, string Email, string Sex, DateTime? Joined, int Role, IFormFile? Kep);
    public record UpdateUserDTO(string Name, string FelhasznaloNev, string Hash, string Email, string Sex, DateTime? Joined, int Role, IFormFile? Kep);

    //Rating DTO(s)
    public record RatingDTO(Guid FilmId, Guid UserId, int Review);

    //Login DTO(s)
    public record LoginDTO(string FelhasznaloNev, string Hash);

}
