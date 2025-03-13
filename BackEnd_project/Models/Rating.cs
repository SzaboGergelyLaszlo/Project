using System;
using System.Collections.Generic;

namespace BackEnd_project.Models;

public partial class Rating
{
    public Guid Id { get; set; }

    public Guid FilmId { get; set; }

    public Guid UserId { get; set; }

    public int Review { get; set; }

    public virtual Film Film { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
