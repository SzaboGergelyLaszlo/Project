using System;
using System.Collections.Generic;

namespace BackEnd_project.Models;

public partial class Film
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public Guid Director { get; set; }

    public string Genre { get; set; } = null!;

    public DateTime ReleaseYear { get; set; }

    public int Length { get; set; }

    public int AgeCertificates { get; set; }

    public string Summary { get; set; } = null!;

    public virtual Director DirectorNavigation { get; set; } = null!;

    public virtual ICollection<Actor> Actors { get; set; } = new List<Actor>();
}
