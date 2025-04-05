namespace BackEnd_project.Models.DTO
{
    public class LoggedUser
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Jog {  get; set; }
        public string Token {  get; set; }
    }
}
