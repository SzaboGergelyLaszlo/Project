using System;
using System.Collections.Generic;

namespace BackEnd_project.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string FelhasznaloNev { get; set; } = null!;

    public string Hash { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Sex { get; set; } = null!;

    public DateTime Joined { get; set; }

    public int Role { get; set; }

    public string ProfilKép { get; set; } = null!;

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual Role RoleNavigation { get; set; } = null!;
}
