using System;
using System.Collections.Generic;

namespace BackEnd_project.Models;

public partial class Director
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Nationality { get; set; } = null!;

    public DateTime Birthday { get; set; }

    public bool OscarAward { get; set; }

    public string Sex { get; set; } = null!;

    public virtual ICollection<Film> Films { get; set; } = new List<Film>();
}
