using BackEnd_project.Models;
using BackEnd_project.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        [HttpGet]

        public async Task<ActionResult> GetRatingByID(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var rating = await context.Ratings.FirstOrDefaultAsync(x => x.Id == id);

                if (rating == null)
                {
                    return NotFound(new { result = "", message = "Nincs ilyen rating az adatbázisban!" });
                }

                return Ok(new { result = rating, message = "Sikeres lekérés!" });

            }
        }

        [HttpPost]

        public async Task<ActionResult> NewRating(RatingDTO ratingDTO)
        {
            using (var context = new ProjectContext())
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.Id == ratingDTO.UserId);

                if (user == null)
                {
                    return NotFound(new { result = "", message = "Nem található ilyen User az adatbázisban!" });
                }

                var film = await context.Films.FirstOrDefaultAsync(x => x.Id == ratingDTO.FilmId);

                if (film == null)
                {
                    return NotFound(new { result = "", message = "Nem található ilyen Film az adatbázisban!" });
                }

                var rating = new Rating
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id,
                    FilmId = film.Id
                };

                if (rating == null)
                {
                    return BadRequest(new { result = "", message = "Sikertelen mentés!" });
                }

                context.Ratings.Add(rating);
                await context.SaveChangesAsync();

                return Ok(new { result = rating, message = "Sikeres felvétel!" });
            }
        }

        [HttpDelete]

        public async Task<ActionResult> RatingDelete(Guid id)
        {
            using (var context = new ProjectContext())
            {
                var rating = await context.Ratings.FirstOrDefaultAsync(x => x.Id == id);

                if (rating == null)
                {
                    return NotFound(new { result = "", message = "Nem található ilyen Rating az adatbázisban!" });
                }

                context.Ratings.Remove(rating);
                await context.SaveChangesAsync();
                return Ok(new { result = rating, message = "Sikeres törlés!" });
            }
        }

        [HttpPut]

        public async Task<ActionResult> UpdateRating(Guid id, Rating rating)
        {
            using (var context = new ProjectContext())
            {
                var existingRating = await context.Ratings.FirstOrDefaultAsync(x => x.Id == id);

                if (existingRating == null)
                {
                    return NotFound(new { result = "", message = "Nem található ilyen Rating az adatbázisban!" });
                }

                existingRating.UserId = rating.UserId;
                existingRating.FilmId = rating.FilmId;
                existingRating.Review = rating.Review;

                context.Ratings.Update(existingRating);
                await context.SaveChangesAsync();
                return Ok(new { result = existingRating, message = "Sikeres modósítás!" });
            }
        }
    }
}
