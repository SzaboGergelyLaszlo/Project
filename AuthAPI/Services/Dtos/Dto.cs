namespace AuthAPI.Services.Dtos
{
    public record RegisterRequestDto(string UserName, string PassWord, string Email, DateTime Birthdate);

    public record LoginRequestDto(string UserName, string Password);
}
